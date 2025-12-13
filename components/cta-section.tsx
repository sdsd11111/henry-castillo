"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { CheckCircle2, ArrowRight } from "lucide-react"

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-12 md:py-20 bg-black overflow-hidden border-t border-zinc-800" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content Side */}
            <div className="flex-1 w-full space-y-8 text-left">
              <div className="space-y-4">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                  Cierre de Inscripciones
                </span>
                <h2 id="cta-heading" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  No Dejes tu Salud al Azar. <br />
                  <span className="text-primary">Empieza a Entrenar con Inteligencia.</span>
                </h2>
                <p className="text-lg md:text-xl text-neutral-300 font-medium">
                  Solo acepto un número limitado de clientes para garantizar la máxima personalización y seguimiento.
                </p>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                  Tu transformación física y tu vitalidad a los 60 años dependen de las decisiones que tomes hoy. Únete al grupo exclusivo de profesionales en Loja que ya están entrenando bajo un método científico, seguro y orientado a resultados reales.
                </p>
              </div>

              {/* List */}
              <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 space-y-4">
                <h3 className="text-white font-bold text-base md:text-lg mb-2">¿Qué incluye tu primera sesión de evaluación?</h3>
                <ul className="space-y-3">
                  {[
                    "Entrevista de historial deportivo y objetivos.",
                    "Análisis de composición física inicial.",
                    "Solicitud y revisión de marcadores de salud (Protocolo de exámenes).",
                    "Diseño de la hoja de ruta personalizada."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
                      <span className="text-sm md:text-base text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm md:text-lg px-6 py-6 md:px-8 md:py-8 bg-primary text-black hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300 uppercase tracking-wide h-auto whitespace-normal"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center gap-2">
                    Agenda tu Evaluación Integral Aquí
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                </Button>
                <p className="mt-4 text-xs md:text-sm text-neutral-500 font-medium italic text-center sm:text-left">
                  * Plazas limitadas. Reserva con anticipación.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 w-full max-w-md lg:max-w-full relative">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto lg:mr-0">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full opacity-50"></div>

                <Image
                  src="/images/513249579-4119168998354039-2382360676927873571-n.jpg"
                  alt="Henry Castillo - Entrenador Personal"
                  fill
                  className="object-cover rounded-2xl shadow-2xl border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-2 md:-left-6 bg-zinc-950 border border-primary/30 p-3 md:p-4 rounded-xl shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div>
                      <p className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase">Estado Actual</p>
                      <p className="text-xs md:text-sm text-white font-bold">Aceptando Nuevos Retos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
