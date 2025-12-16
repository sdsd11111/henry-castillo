"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Loader2, Send, Users, RefreshCw } from "lucide-react"
import { format } from "date-fns"

interface Subscriber {
    id: number
    name: string
    email: string
    created_at: string
}

export function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([])
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [attachments, setAttachments] = useState<FileList | null>(null)

    const insertFormat = (startTag: string, endTag: string) => {
        const textarea = document.getElementById("message-editor") as HTMLTextAreaElement
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const before = text.substring(0, start)
        const selection = text.substring(start, end)
        const after = text.substring(end)

        setMessage(`${before}${startTag}${selection}${endTag}${after}`)

        // Restore focus (optional but good)
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + startTag.length, end + startTag.length)
        }, 0)
    }

    useEffect(() => {
        loadSubscribers()
    }, [])

    async function loadSubscribers() {
        setLoading(true)
        try {
            const res = await fetch("/api/admin/subscribers")
            const data = await res.json()
            if (data.subscribers) {
                setSubscribers(data.subscribers)
            }
        } catch (error) {
            toast.error("Error al cargar suscriptores")
        } finally {
            setLoading(false)
        }
    }

    async function handleSend(e: React.FormEvent) {
        e.preventDefault()
        if (!confirm(`¿Estás seguro de enviar este correo a ${subscribers.length} suscriptores?`)) return

        setSending(true)
        try {
            const formData = new FormData()
            formData.append("subject", subject)
            formData.append("message", message)
            if (attachments) {
                for (let i = 0; i < attachments.length; i++) {
                    formData.append("files", attachments[i])
                }
            }

            const res = await fetch("/api/admin/newsletter/send", {
                method: "POST",
                body: formData,
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            toast.success(data.message)
            setSubject("")
            setMessage("")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error al enviar")
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: List */}
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Suscriptores ({subscribers.length})
                            </span>
                            <Button variant="ghost" size="icon" onClick={loadSubscribers} disabled={loading}>
                                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                            </Button>
                        </CardTitle>
                        <CardDescription>Lista de personas suscritas al newsletter</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="max-h-[500px] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscribers.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">{sub.name}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs">{sub.email}</TableCell>
                                        </TableRow>
                                    ))}
                                    {subscribers.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                                                No hay suscriptores aún.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Compose */}
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Enviar Newsletter
                        </CardTitle>
                        <CardDescription>
                            Envía un correo a todos tus suscriptores. Ten cuidado con el spam.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSend} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Asunto del Correo</label>
                                <Input
                                    placeholder="Ej: Consejos fit de la semana..."
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mensaje</label>
                                <div className="border rounded-md p-1 bg-muted/20 flex gap-1 mb-1">
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertFormat('<b>', '</b>')} title="Negrita">
                                        <b>B</b>
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertFormat('<i>', '</i>')} title="Cursiva">
                                        <i>I</i>
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertFormat('<h2>', '</h2>')} title="Título">
                                        H2
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertFormat('<ul>\n<li>', '</li>\n</ul>')} title="Lista">
                                        List
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertFormat('<br>', '')} title="Salto de línea">
                                        BR
                                    </Button>
                                </div>
                                <Textarea
                                    id="message-editor"
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="min-h-[300px] font-mono text-sm"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Se enviará como HTML. Puedes usar los botones de arriba para dar formato.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Adjuntar Archivos (Imágenes, PDF)</label>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(e) => setAttachments(e.target.files)}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Los archivos se enviarán como adjuntos en el correo.
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" size="lg" disabled={sending || subscribers.length === 0}>
                                    {sending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Enviar a {subscribers.length} personas
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
