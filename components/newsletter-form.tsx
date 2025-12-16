"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function NewsletterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setFeedback(null)

        const formData = new FormData(event.target as HTMLFormElement)
        const name = formData.get("name")
        const email = formData.get("email")

        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Error al suscribirse")
            }

            setFeedback({ type: 'success', message: "¡Gracias por suscribirte!" })
            toast.success("¡Gracias por suscribirte!")
                ; (event.target as HTMLFormElement).reset()
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Inténtalo de nuevo más tarde"
            setFeedback({ type: 'error', message: msg })
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-xl">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        required
                        className="bg-white/80 border-white/20 focus:bg-white text-black placeholder:text-gray-500 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Tu mejor correo electrónico"
                        required
                        className="bg-white/80 border-white/20 focus:bg-white text-black placeholder:text-gray-500 h-12"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required className="border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <Label htmlFor="terms" className="text-sm text-white/90 font-light cursor-pointer">
                        Acepto la política de privacidad*
                    </Label>
                </div>

                {feedback && (
                    <div className={`p-3 rounded-md text-sm text-center font-medium animate-in fade-in slide-in-from-top-2 ${feedback.type === 'success'
                            ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                            : 'bg-red-500/20 text-red-100 border border-red-500/30'
                        }`}>
                        {feedback.message}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-wider"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        "ME APUNTO"
                    )}
                </Button>
            </form>
        </div>
    )
}
