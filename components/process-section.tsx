"use client"

import { useState } from "react"
import { MessageSquareText, TestTube2, FileText, Dumbbell, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CONTACT } from "@/lib/constants"
import { MotionConfig, motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { EvaluationModal } from "@/components/evaluation-modal"

const steps = [
    {
        number: "01",
        title: "Nos conocemos",
        description: "Antes de empezar haremos una pequeña reunión de 40 minutos para asegurarnos que te puedo ayudar y que los objetivos planteados son realistas.",
        icon: MessageSquareText,
        image: "/images/Linea de tiempo/1.webp"
    },
    {
        number: "02",
        title: "Cuestionario inicial",
        description: "Si decidimos trabajar juntos y una vez el pago está confirmado, rellenarás un cuestionario detallado que me servirá para realizar toda la planificación.",
        icon: FileText,
        image: "/images/Linea de tiempo/2.webp"
    },
    {
        number: "03",
        title: "Empezamos",
        description: "Te prepararé toda la planificación durante las 24-48 horas siguientes. Todo estará adaptado a tus necesidades, horarios y preferencias que me hayas indicado. Nos reuniremos para explicar a detalle la planificación y solucionar todas las dudas antes de empezar.",
        icon: Dumbbell,
        image: "/images/Linea de tiempo/3.webp"
    },
    {
        number: "04",
        title: "Chequeos quincenales",
        description: "Cada dos semanas tu trabajo será rellenar unas tablas de seguimiento y responder unas preguntas breves en tu carpeta de cliente. Mi trabajo consistirá en evaluar el progreso, hacer modificaciones siempre que sean necesarias y seguir avanzando hacia tus objetivos.",
        icon: Trophy,
        image: "/images/Linea de tiempo/4.webp"
    },
]

export function ProcessSection() {
    const [activeStep, setActiveStep] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden" aria-labelledby="process-heading">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        Proceso / Cómo funciona
                    </span>
                    <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Así será tu <span className="text-primary">proceso de entrenamiento conmigo</span>
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Un método claro y basado en datos para asegurar que alcances tus metas con total seguridad.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto w-full">
                    {/* Timeline */}
                    <div className="relative space-y-6 pl-8 sm:pl-10 before:absolute before:left-[15px] sm:before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-800">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute -left-[45px] sm:-left-[53px] w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 flex items-center justify-center z-10 transition-colors duration-300 ${activeStep === index
                                        ? "bg-zinc-950 border-primary shadow-[0_0_15px_rgba(0,255,255,0.5)] cursor-default"
                                        : "bg-zinc-950 border-zinc-700 cursor-pointer group-hover:border-neutral-500"
                                        }`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${activeStep === index ? "bg-primary" : "bg-zinc-600 group-hover:bg-neutral-400"}`} />
                                </div>

                                <div
                                    onClick={() => setActiveStep(index)}
                                    className={`p-5 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${activeStep === index
                                        ? "bg-zinc-900 border-primary/30 shadow-lg shadow-primary/5 scale-[1.01]"
                                        : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700"
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                        <div className={`w-fit p-2 sm:p-3 rounded-xl transition-colors duration-300 ${activeStep === index ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-500"}`}>
                                            <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${activeStep === index ? "text-primary" : "text-neutral-500"}`}>
                                                Paso {step.number}
                                            </span>
                                            <h3 className={`text-base sm:text-xl font-bold transition-colors duration-300 leading-tight break-words ${activeStep === index ? "text-white" : "text-neutral-400"}`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className={`leading-relaxed text-sm sm:text-base transition-colors duration-300 ${activeStep === index ? "text-neutral-300" : "text-neutral-600"}`}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center px-4">
                        <Button
                            size="lg"
                            className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-black px-6 sm:px-10 py-5 sm:py-8 text-base sm:text-lg shadow-2xl shadow-primary/20 h-auto rounded-xl group uppercase tracking-tight"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                DA EL PRIMER PASO AHORA
                                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
