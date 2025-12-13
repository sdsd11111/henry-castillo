"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { CalendarBooking } from "@/components/calendar-booking"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const totalSections = 4 // Calendario + 3 secciones de formulario

interface EvaluationModalProps {
    isOpen: boolean
    onClose: () => void
}

export function EvaluationModal({ isOpen, onClose }: EvaluationModalProps) {
    const [currentSection, setCurrentSection] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isBooking, setIsBooking] = useState(false)
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        nombreCompleto: "",
        edad: "",
        ocupacion: "",
        cambioPrincipal: "",
        porQueImportante: "",
        queTeHaImpedido: "",
        queHasIntentado: "",
        experienciaEntrenador: "",
        inversion: "",
    })

    const updateFormData = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const nextSection = () => {
        if (currentSection < totalSections - 1) {
            setCurrentSection((prev) => prev + 1)
        }
    }

    const prevSection = () => {
        if (currentSection > 0) {
            setCurrentSection((prev) => prev - 1)
        }
    }

    const formatMessage = () => {
        const lines = [
            "🗓️ SOLICITUD DE EVALUACIÓN GRATUITA",
            "═".repeat(50),
            "",
            "📅 FECHA Y HORA AGENDADA:",
            selectedDateTime
                ? `${format(selectedDateTime, "EEEE, d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}`
                : "No seleccionada",
            "",
            "═".repeat(50),
            "",
            "📧 Email:",
            formData.email,
            "",
            "👤 Nombre:",
            `${formData.nombreCompleto} - ${formData.edad} años`,
            "",
            "💼 Ocupación:",
            formData.ocupacion,
            "",
            "🎯 OBJETIVO - Cambio principal que busca:",
            formData.cambioPrincipal,
            "",
            "💪 MOTIVACIÓN - Por qué es importante:",
            formData.porQueImportante,
            "",
            "🚧 OBSTÁCULOS - Qué le ha impedido conseguirlo:",
            formData.queTeHaImpedido,
            "",
            "📝 INTENTOS PREVIOS - Qué ha probado antes:",
            formData.queHasIntentado,
            "",
            "👨‍🏫 EXPERIENCIA CON ENTRENADOR:",
            formData.experienciaEntrenador,
            "",
            "💰 INVERSIÓN MENSUAL CÓMODA:",
            formData.inversion,
            "",
            "═".repeat(50),
        ]

        return lines.join("\n")
    }

    const handleSubmit = async () => {
        if (!selectedDateTime) {
            alert("Por favor selecciona una fecha y hora para tu evaluación")
            return
        }

        setIsBooking(true)

        try {
            // Crear cita en base de datos y enviar emails
            const bookingResponse = await fetch("/api/calendar/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: formData.nombreCompleto,
                    email: formData.email,
                    telefono: "", // Puedes agregar campo telefono si quieres
                    edad: parseInt(formData.edad) || undefined,
                    ocupacion: formData.ocupacion,
                    cambioPrincipal: formData.cambioPrincipal,
                    porQueImportante: formData.porQueImportante,
                    queTeHaImpedido: formData.queTeHaImpedido,
                    queHasIntentado: formData.queHasIntentado,
                    experienciaEntrenador: formData.experienciaEntrenador,
                    inversion: formData.inversion,
                    dateTime: selectedDateTime.toISOString(),
                }),
            })

            if (!bookingResponse.ok) {
                const error = await bookingResponse.json()
                throw new Error(error.error || "Error al agendar evaluación")
            }

            // Enviar mensaje a WhatsApp
            const message = formatMessage()
            const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, "_blank")

            // Mostrar estado de éxito
            setIsSubmitted(true)
        } catch (error) {
            console.error("Error:", error)
            alert(
                error instanceof Error
                    ? error.message
                    : "Hubo un error. Por favor intenta nuevamente o contáctanos directamente por WhatsApp."
            )
        } finally {
            setIsBooking(false)
        }
    }

    const handleClose = () => {
        setCurrentSection(0)
        setSelectedDateTime(null)
        setFormData({
            email: "",
            nombreCompleto: "",
            edad: "",
            ocupacion: "",
            cambioPrincipal: "",
            porQueImportante: "",
            queTeHaImpedido: "",
            queHasIntentado: "",
            experienciaEntrenador: "",
            inversion: "",
        })
        setIsSubmitted(false)
        onClose()
    }

    const progress = ((currentSection + 1) / totalSections) * 100

    if (isSubmitted) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center py-8 space-y-6">
                        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">¡Evaluación Agendada!</h3>
                            <p className="text-lg text-gray-600">
                                Tu evaluación gratuita ha sido agendada exitosamente.
                            </p>
                        </div>

                        {selectedDateTime && (
                            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                                <p className="text-sm font-medium">📅 Fecha y hora:</p>
                                <p className="font-bold text-lg">
                                    {format(selectedDateTime, "EEEE, d 'de' MMMM", { locale: es })}
                                </p>
                                <p className="font-bold text-xl text-primary">
                                    {format(selectedDateTime, "HH:mm", { locale: es })}
                                </p>
                            </div>
                        )}

                        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-2 border border-gray-100">
                            <p className="font-semibold text-gray-700">Siguientes pasos:</p>
                            <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                <li>Recibirás un email de confirmación en {formData.email}</li>
                                <li>El evento fue agregado al calendario</li>
                                <li>Se abrió WhatsApp con tu información</li>
                                <li>Revisa y envía el mensaje para confirmar</li>
                            </ol>
                        </div>

                        <Button
                            onClick={handleClose}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
                        >
                            Entendido, cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    const sections = [
        // Sección 0: Calendario
        <div key="calendario" className="space-y-4">
            <div className="text-center space-y-2 mb-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Agenda tu Evaluación Gratuita</h3>
                <p className="text-sm text-muted-foreground">
                    Selecciona la fecha y hora que mejor te convenga
                </p>
            </div>

            <CalendarBooking
                selectedDateTime={selectedDateTime}
                onDateTimeSelected={(dateTime) => setSelectedDateTime(dateTime)}
            />
        </div>,

        // Sección 1: Información Personal
        <div key="personal" className="space-y-4">
            <div className="space-y-1">
                <h3 className="font-semibold">Información Personal</h3>
                <p className="text-xs text-muted-foreground">Cuéntanos sobre ti</p>
            </div>

            <div className="space-y-3">
                <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">
                        Correo electrónico *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="tu@email.com"
                        className="h-9"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="nombreCompleto" className="text-sm">
                            Nombre completo *
                        </Label>
                        <Input
                            id="nombreCompleto"
                            value={formData.nombreCompleto}
                            onChange={(e) => updateFormData("nombreCompleto", e.target.value)}
                            placeholder="Tu nombre"
                            className="h-9"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="edad" className="text-sm">
                            Edad *
                        </Label>
                        <Input
                            id="edad"
                            type="number"
                            value={formData.edad}
                            onChange={(e) => updateFormData("edad", e.target.value)}
                            placeholder="25"
                            className="h-9"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="ocupacion" className="text-sm">
                        ¿A qué te dedicas actualmente? *
                    </Label>
                    <Input
                        id="ocupacion"
                        value={formData.ocupacion}
                        onChange={(e) => updateFormData("ocupacion", e.target.value)}
                        placeholder="Tu ocupación"
                        className="h-9"
                    />
                </div>
            </div>
        </div>,

        // Sección 2: Objetivos y Motivación
        <div key="objetivos" className="space-y-4">
            <div className="space-y-1">
                <h3 className="font-semibold">Tu Situación Actual y Objetivos</h3>
                <p className="text-xs text-muted-foreground">Ayúdanos a entender tus metas</p>
            </div>

            <div className="space-y-3">
                <div className="space-y-1.5">
                    <Label htmlFor="cambioPrincipal" className="text-sm">
                        ¿Cuál es el cambio principal que estás buscando conseguir ahora mismo? *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Sé específico: perder grasa, mejorar fuerza, ganar masa muscular, etc.
                    </p>
                    <Textarea
                        id="cambioPrincipal"
                        value={formData.cambioPrincipal}
                        onChange={(e) => updateFormData("cambioPrincipal", e.target.value)}
                        placeholder="Ej: Quiero perder 10kg de grasa y ganar masa muscular..."
                        rows={3}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="porQueImportante" className="text-sm">
                        ¿Por qué es importante para ti lograr este cambio ahora? *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Piensa en tus motivos personales, salud, autoestima, familia, etc.
                    </p>
                    <Textarea
                        id="porQueImportante"
                        value={formData.porQueImportante}
                        onChange={(e) => updateFormData("porQueImportante", e.target.value)}
                        placeholder="Ej: Quiero sentirme mejor conmigo mismo, tener más energía..."
                        rows={2}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="queTeHaImpedido" className="text-sm">
                        ¿Qué crees que te ha impedido conseguirlo hasta ahora? *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Hábitos, falta de tiempo, motivación, resultados lentos, etc.
                    </p>
                    <Textarea
                        id="queTeHaImpedido"
                        value={formData.queTeHaImpedido}
                        onChange={(e) => updateFormData("queTeHaImpedido", e.target.value)}
                        placeholder="Ej: No tengo tiempo, no sé qué rutina seguir..."
                        rows={2}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="queHasIntentado" className="text-sm">
                        ¿Qué has intentado antes que no ha funcionado? *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        Dieta por tu cuenta, apps, rutinas genéricas, etc.
                    </p>
                    <Textarea
                        id="queHasIntentado"
                        value={formData.queHasIntentado}
                        onChange={(e) => updateFormData("queHasIntentado", e.target.value)}
                        placeholder="Ej: He probado varias dietas, apps de gimnasio..."
                        rows={2}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="experienciaEntrenador" className="text-sm">
                        ¿Has trabajado antes con un entrenador? ¿Cómo fue la experiencia? *
                    </Label>
                    <p className="text-xs text-muted-foreground">Lo que te gustó o no te gustó</p>
                    <Textarea
                        id="experienciaEntrenador"
                        value={formData.experienciaEntrenador}
                        onChange={(e) => updateFormData("experienciaEntrenador", e.target.value)}
                        placeholder="Ej: Nunca he trabajado con entrenador / Sí, pero no vi resultados..."
                        rows={2}
                    />
                </div>
            </div>
        </div>,

        // Sección 3: Inversión
        <div key="inversion" className="space-y-4">
            <div className="space-y-1">
                <h3 className="font-semibold">Inversión</h3>
                <p className="text-xs text-muted-foreground">Última pregunta</p>
            </div>

            <div className="space-y-1.5">
                <Label className="text-sm">En cuanto a inversión mensual, ¿en qué rango te sentirías cómodo? *</Label>
                <RadioGroup value={formData.inversion} onValueChange={(value) => updateFormData("inversion", value)} className="space-y-2">
                    {[
                        { value: "menos-100", label: "Menos de $100" },
                        { value: "100-150", label: "Entre $100 y $150" },
                        { value: "mas-150", label: "Más de $150" },
                    ].map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                        >
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="flex-1 cursor-pointer text-sm">
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>,
    ]

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-2">
                    <DialogTitle className="sr-only">Evaluación Gratuita</DialogTitle>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                                Paso {currentSection + 1} de {totalSections}
                            </span>
                            <span>{Math.round(progress)}% completado</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                    </div>
                </DialogHeader>

                <div className="py-2">{sections[currentSection]}</div>

                <div className="flex justify-between pt-4 border-t">
                    <Button
                        variant="ghost"
                        onClick={prevSection}
                        disabled={currentSection === 0}
                        className="gap-1"
                        size="sm"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    {currentSection === totalSections - 1 ? (
                        <Button onClick={handleSubmit} className="gap-1" size="sm" disabled={isBooking}>
                            {isBooking ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Agendando...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Agendar y Enviar
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={nextSection}
                            className="gap-1"
                            size="sm"
                            disabled={currentSection === 0 && !selectedDateTime}
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
