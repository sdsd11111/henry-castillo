"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { CONTACT } from "@/lib/constants"

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="py-20 md:py-32 bg-black overflow-hidden border-t border-zinc-800 relative" aria-labelledby="cta-heading">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                  Cierre de Inscripciones
                </span>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 bg-zinc-900 border border-primary/30 px-4 py-2 rounded-full shadow-xl">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-tight">
                    Estado Actual: <span className="text-white">Aceptando Nuevos Retos</span>
                  </p>
                </div>
              </div>

              <h2 id="cta-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                ¿Cómo será tu vida dentro de <span className="text-primary italic">15 años?</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">El mejor momento es hoy.</span>
              </h2>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="w-full sm:w-auto px-10 py-8 bg-primary text-black hover:bg-primary/90 font-black text-lg md:text-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all duration-300 uppercase tracking-tighter h-auto rounded-2xl group"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="flex items-center gap-3">
                  Agenda tu Evaluación aquí
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-10 py-8 border-2 border-zinc-800 text-white hover:bg-white hover:text-black font-black text-lg md:text-xl transition-all duration-300 uppercase tracking-tighter h-auto rounded-2xl"
                asChild
              >
                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm md:text-base text-neutral-400 font-bold uppercase tracking-[0.2em]">
                * Plazas limitadas. Reserva con anticipación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
