"use client"

import { useState } from "react"
import { Plus, Calendar, ArrowRight } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"

const faqs = [
    {
        question: "¿Por qué un Entrenador Personal me pide exámenes médicos?",
        answer: "Como Entrenador Personal con enfoque integral, mi prioridad es tu seguridad. Los exámenes de colesterol, glucosa y triglicéridos me permiten conocer tu estado metabólico real. No entreno a ciegas; diseño tu plan para que el ejercicio sea una herramienta de mejora interna y no un riesgo para tu salud."
    },
    {
        question: "¿Qué compromiso espero por tu parte?",
        answer: "Espero 12 semanas mínimas de asesoría, que rellenes diariamente unas tablas de progreso (solo requiere 2 minutos), que realices una revisión cada 15 días (siempre en domingo) y, sobre todo, que seas honesto y digas la verdad siempre. Sin eso, no puedo ayudarte."
    },
    {
        question: "¿Los resultados están garantizados?",
        answer: "La asesoría es un trabajo de dos, por eso no puedo asegurarte resultados por mi cuenta. Yo haré mi parte y estaré ahí para ayudarte a cumplir tus objetivos. Si te comprometes tanto como yo y sigues la planificación, estoy seguro de que mejorarás y los resultados llegarán."
    },
    {
        question: "¿Puedo entrenar Online si soy principiante?",
        answer: "Para garantizar tu seguridad y una técnica impecable, recomiendo que los principiantes inicien de forma presencial en Loja. El servicio Online está reservado para personas con experiencia previa mínima de 1 año que ya dominan los movimientos básicos."
    },
    {
        question: "¿Tengo que dejar de comer lo que me gusta?",
        answer: "En la mayoría de los casos no es necesario restringir alimentos. Sin embargo, si tu alimentación se basa principalmente en productos ultra procesados, lo más inteligente será reducir y distanciar su consumo para potenciar tu salud y rendimiento."
    }
]

export function FaqSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="py-24 bg-zinc-950" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        Preguntas Frecuentes (FAQ)
                    </span>
                    <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Todo lo que Necesitas Saber sobre <br className="hidden md:block" />
                        mi <span className="text-primary">Método de Entrenamiento</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Resuelvo tus dudas sobre cómo integramos la ciencia, la nutrición y el ejercicio para tu transformación.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="mb-16">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-zinc-800 rounded-lg bg-zinc-900/50 px-2 md:px-6 transition-all data-[state=open]:bg-zinc-900 data-[state=open]:border-zinc-700"
                            >
                                <AccordionTrigger
                                    className="hover:no-underline py-6 [&>svg]:hidden"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-left font-bold text-lg md:text-xl text-primary md:pr-8">
                                            {faq.question}
                                        </span>
                                        <div className="shrink-0 ml-4 group-data-[state=open]:rotate-45 transition-transform duration-300">
                                            <Plus className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-300 text-base leading-relaxed pb-6 md:pr-12">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* CTA */}
                <div className="flex justify-center w-full">
                    <Button
                        size="lg"
                        className="bg-primary text-black hover:bg-primary/90 font-bold text-xs md:text-base w-full sm:w-auto h-auto px-4 py-4 md:px-8 md:py-6 whitespace-normal tracking-wide shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Calendar className="w-5 h-5 mr-2 shrink-0" />
                        <span className="leading-snug">¿Tienes más dudas? Reserva una sesión para resolverlas</span>
                    </Button>
                </div>
            </div>

            <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
