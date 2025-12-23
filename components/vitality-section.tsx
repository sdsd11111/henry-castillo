"use client"

import { Microscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { EvaluationModal } from "@/components/evaluation-modal"
import { CONTACT } from "@/lib/constants"

export function VitalitySection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
              Protocolo de Salud
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight uppercase tracking-tighter">
              Tu salud es la <span className="text-primary">prioridad</span>
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="bg-neutral-900/40 p-8 md:p-16 rounded-[2.5rem] border border-neutral-800 shadow-2xl backdrop-blur-sm">
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-primary/10 p-5 rounded-2xl">
                  <Microscope className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-grow space-y-4">
                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                    Como parte de mi protocolo como Entrenador Personal, te solicitaré <span className="text-primary italic">exámenes básicos</span> (colesterol, glucosa y triglicéridos).
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-primary font-black uppercase tracking-widest text-sm italic">Colaboración Médica</h3>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    Si es necesario, también puedo trabajar de la mano con tu médico de cabecera. De esta forma garantizamos tu salud y podemos ir monitoreando su evolución.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-primary font-black uppercase tracking-widest text-sm italic">Diseño Inteligente</h3>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    Estos datos me permiten diseñar un plan de entrenamiento y alimentación que respete y potencie tu metabolismo y tu salud cardiovascular.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-4 sm:px-10 sm:py-8 text-base sm:text-xl shadow-2xl shadow-primary/20 uppercase tracking-tighter rounded-xl group h-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="flex items-center justify-center gap-2">
                AGENDA TU EVALUACIÓN AQUÍ
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <p className="mt-6 text-neutral-500 font-medium italic text-sm sm:text-base">
              Empieza hoy mismo con un plan basado en ciencia y datos reales.
            </p>
          </div>
        </div>
      </div>
      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
