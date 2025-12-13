"use client"

import { Plus, MessageCircle } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
    {
        question: "¿Por qué un Entrenador Personal me pide exámenes médicos?",
        answer: "Como Entrenador Personal con enfoque integral, mi prioridad es tu seguridad. Los exámenes de colesterol, glucosa y triglicéridos me permiten conocer tu estado metabólico real. No entreno a ciegas; diseño tu plan para que el ejercicio sea una herramienta de mejora interna y no un riesgo para tu salud."
    },
    {
        question: "¿Qué es la Escala de Bristol y por qué la usamos?",
        answer: "Es una herramienta visual para evaluar tu salud digestiva e intestinal. Un entrenamiento y una nutrición de élite no sirven de nada si tu cuerpo no absorbe los nutrientes correctamente. Monitorear esto nos ayuda a ajustar tu dieta para que tengas más energía y mejores resultados físicos."
    },
    {
        question: "¿Puedo entrenar Online si soy principiante?",
        answer: "Para garantizar tu seguridad y una técnica impecable, recomiendo que los principiantes inicien de forma presencial en Loja. El servicio Online está reservado para atletas o personas con experiencia previa que ya dominan los movimientos básicos y buscan una programación científica a distancia."
    },
    {
        question: "¿Cada cuánto tiempo se realizan las evaluaciones?",
        answer: "Realizamos un seguimiento de progreso cada 15 días (medidas, peso y sensaciones) para ajustar tu plan. Además, solicitamos nuevos exámenes médicos cada 3 meses para validar científicamente la mejora de tu funcionamiento interno."
    },
    {
        question: "¿El programa incluye asesoría médica?",
        answer: "Soy Entrenador Personal certificado, no médico. Sin embargo, mi protocolo de entrenamiento es integral y analítico. Esto significa que no solo diseñamos rutinas, sino que interpretamos tus marcadores de salud para personalizar tu nutrición y cargas de trabajo. Actúo como un consultor técnico que utiliza la ciencia del ejercicio para que alcances tus metas de forma segura, profesional y eficiente."
    },
    {
        question: "¿Qué incluye exactamente el plan de nutrición?",
        answer: "Incluye un cálculo preciso de tus necesidades calóricas y macronutrientes basado en tus objetivos y tus análisis de sangre. Utilizamos tecnología (MyFitnessPal) para que aprendas a comer de forma inteligente, flexible y sin restricciones innecesarias."
    }
]

export function FaqSection() {
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
                        asChild
                        variant="default"
                        size="lg"
                        className="bg-primary text-black hover:bg-primary/90 font-bold text-xs md:text-base w-full sm:w-auto h-auto px-4 py-4 md:px-8 md:py-6 whitespace-normal tracking-wide shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300"
                    >
                        <a
                            href="https://wa.me/593988626504"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 uppercase text-center"
                        >
                            <MessageCircle className="w-5 h-5 shrink-0" />
                            <span className="leading-snug">¿Tienes otra pregunta? Escríbeme directamente por WhatsApp</span>
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
