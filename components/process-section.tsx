"use client"

import { useState } from "react"
import { MessageSquareText, TestTube2, FileText, Dumbbell, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CONTACT } from "@/lib/constants"
import { MotionConfig, motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

const steps = [
    {
        number: "01",
        title: "Evaluación Inicial y Diagnóstico",
        description: "Comenzamos con una entrevista profunda (presencial o virtual) para conocer tu historial, tus objetivos y tu estilo de vida. No lanzamos rutinas al azar; primero entendemos tu punto de partida.",
        icon: MessageSquareText,
        image: "/images/513249579-4119168998354039-2382360676927873571-n.jpg"
    },
    {
        number: "02",
        title: "Análisis de Marcadores Internos",
        description: "Como parte de mi protocolo de Entrenador Personal, te solicitaré exámenes básicos (colesterol, glucosa, triglicéridos). Estos datos me permiten diseñar un plan que respete y potencie tu metabolismo y salud cardiovascular.",
        icon: TestTube2,
        image: "/images/503891860-4098892280381711-848031671112462455-n.jpg"
    },
    {
        number: "03",
        title: "Diseño del Plan Integral",
        description: "Construyo tu hoja de ruta personalizada. Entrenamiento ajustado a tu nivel (principiante presencial o experto online) y un plan de alimentación inteligente vinculado a tus resultados médicos.",
        icon: FileText,
        image: "/images/502903707-4097245297213076-1836789078342719368-n.jpg"
    },
    {
        number: "04",
        title: "Ejecución y Ajuste Quincenal",
        description: "Iniciamos el entrenamiento. Cada 15 días realizamos una evaluación de progreso para ajustar cargas, calorías y técnica. El seguimiento es constante para garantizar la adherencia.",
        icon: Dumbbell,
        image: "/images/503984705-4097457117191894-5670764605460021442-n.jpg"
    },
    {
        number: "05",
        title: "Validación de Resultados",
        description: "Realizamos nuevos controles médicos (cada 3 meses) para verificar cómo ha mejorado tu funcionamiento interno. Aquí es donde celebramos no solo los kilos perdidos, sino tu nueva vitalidad.",
        icon: Trophy,
        // Reusing the first high-quality image or another if available. 
        // Ideally we would have a 'Success/Trophy' image. reusing 50389... for now as it looks professional.
        image: "/images/513249579-4119168998354039-2382360676927873571-n.jpg"
    },
]

export function ProcessSection() {
    const [activeStep, setActiveStep] = useState(0)

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden" aria-labelledby="process-heading">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4">

                {/* Header - Centered & Full Width */}
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        Proceso / Cómo funciona
                    </span>
                    <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Tu Camino hacia un Rendimiento Superior: <br className="hidden md:block" />
                        <span className="text-primary">Paso a Paso</span>
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Un método claro y basado en datos para asegurar que alcances tus metas con total seguridad.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">

                    {/* Left Column: Sticky Image with Transition */}
                    <div className="lg:w-1/2 relative lg:sticky lg:top-32 h-fit min-h-[500px] hidden lg:block">
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-zinc-800 bg-zinc-900">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={steps[activeStep].image}
                                        alt={steps[activeStep].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-primary/20 p-2 rounded-full backdrop-blur-sm">
                                                {/* Render the icon dynamically */}
                                                {(() => {
                                                    const Icon = steps[activeStep].icon;
                                                    return <Icon className="w-5 h-5 text-primary" />;
                                                })()}
                                            </div>
                                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Paso {steps[activeStep].number}</span>
                                        </div>
                                        <p className="text-white font-bold text-2xl leading-tight">
                                            {steps[activeStep].title}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Interactive Timeline */}
                    <div className="lg:w-1/2">
                        <div className="relative space-y-4 pl-8 lg:pl-10 before:absolute before:left-[15px] lg:before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-800">
                            {steps.map((step, index) => (
                                <div key={index} className="relative group">
                                    {/* Timeline Dot */}
                                    <div
                                        className={`absolute -left-[45px] lg:-left-[53px] w-8 h-8 lg:w-10 lg:h-10 rounded-full border-4 flex items-center justify-center z-10 transition-colors duration-300 ${activeStep === index
                                            ? "bg-zinc-950 border-primary shadow-[0_0_15px_rgba(0,255,255,0.5)] cursor-default"
                                            : "bg-zinc-950 border-zinc-700 cursor-pointer group-hover:border-neutral-500"
                                            }`}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-colors duration-300 ${activeStep === index ? "bg-primary" : "bg-zinc-600 group-hover:bg-neutral-400"}`} />
                                    </div>

                                    {/* Desktop Interaction: Updates Sticky Image */}
                                    <div
                                        onClick={() => setActiveStep(index)}
                                        className={`hidden lg:block p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeStep === index
                                            ? "bg-zinc-900 border-primary/30 shadow-lg shadow-primary/5 scale-[1.02]"
                                            : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className={`p-2 rounded-lg transition-colors duration-300 ${activeStep === index ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-500"}`}>
                                                <step.icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-2xl font-black transition-colors duration-300 ${activeStep === index ? "text-primary opacity-100" : "text-white opacity-20"}`}>
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${activeStep === index ? "text-white" : "text-neutral-400"}`}>
                                            {step.title}
                                        </h3>

                                        <p className={`leading-relaxed text-sm transition-colors duration-300 ${activeStep === index ? "text-neutral-300" : "text-neutral-600"}`}>
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Mobile Interaction: Opens Lightbox */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div
                                                className={`lg:hidden p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeStep === index
                                                    ? "bg-zinc-900 border-primary/30 shadow-lg shadow-primary/5"
                                                    : "bg-zinc-900/30 border-zinc-800/50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className={`p-2 rounded-lg ${activeStep === index ? "bg-primary/20 text-primary" : "bg-zinc-800 text-zinc-500"}`}>
                                                        <step.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-2xl font-black ${activeStep === index ? "text-primary opacity-100" : "text-white opacity-20"}`}>
                                                        {step.number}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-2 text-white">
                                                    {step.title}
                                                </h3>
                                                <p className="leading-relaxed text-sm text-neutral-400">
                                                    {step.description}
                                                </p>
                                                <p className="text-primary text-xs font-bold uppercase tracking-wider mt-4">
                                                    Ver detalle +
                                                </p>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="bg-zinc-900 border-zinc-800 p-0 overflow-hidden max-w-sm sm:max-w-md">
                                            <DialogTitle className="sr-only">{step.title}</DialogTitle>
                                            <div className="relative aspect-[4/5] w-full">
                                                <Image
                                                    src={step.image}
                                                    alt={step.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                </div>
                            ))}
                        </div>

                        <div className="mt-12 lg:ml-10">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 text-base shadow-lg shadow-primary/25"
                                asChild
                            >
                                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                                    DA EL PRIMER PASO AHORA
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
