"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { Calendar, ClipboardCheck, ChevronDown } from "lucide-react"
import Image from "next/image"
import { CONTACT } from "@/lib/constants"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden pt-16 md:pt-20"
        aria-labelledby="hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/503891860-4098892280381711-848031671112462455-n.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-10 flex flex-col items-center text-center w-full">
            <h1
              id="hero-heading"
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-white uppercase tracking-tight transition-all duration-700 delay-100 drop-shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              ENTRENADOR <span className="text-primary drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">PERSONAL</span> <br className="hidden sm:block" /> LOJA
            </h1>

            <div
              className={`max-w-2xl px-2 transition-all duration-700 delay-200 drop-shadow-md ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <p className="text-base sm:text-xl text-white/90 leading-relaxed text-center font-light">
                ¿Quieres resultados que te mantengan activo y productivo a largo plazo? Soy Henry Castillo, y mi rol como Entrenador Personal es garantizar que tu esfuerzo dé frutos.
                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="ml-2 text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                  >
                    Seguir leyendo
                  </button>
                )}
                {isExpanded && (
                  <span> Mi metodología es integral: optimizo tu rendimiento y tu nutrición basándome en tus datos de salud. No solo te verás fuerte; estarás sano por dentro. Invierte hoy en el bienestar que agradecerás a los 60 años.
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="ml-2 text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                    >
                      Ocultar
                    </button>
                  </span>
                )}
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`w-full max-w-sm sm:max-w-none flex flex-col sm:flex-row gap-4 pt-4 justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <Button
                size="lg"
                className="text-base md:text-lg px-6 py-6 md:px-8 md:py-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto shadow-lg shadow-primary/25"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
              >
                <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                Evaluación Gratuita
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-6 py-6 md:px-8 md:py-6 gap-2 border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
                asChild
              >
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contáctame por WhatsApp (abre en nueva ventana)"
                >
                  <span className="relative flex h-3 w-3 mr-1 shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Contáctame por WhatsApp
                </a>
              </Button>
            </div>

            <div
              className={`flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-6 text-sm md:text-base text-white/80 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-primary font-bold text-2xl sm:text-3xl drop-shadow-md">100%</span>
                <span className="drop-shadow-sm">Personalizado</span>
              </div>
              <div className="hidden sm:block h-8 w-px bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="text-primary font-bold text-2xl sm:text-3xl drop-shadow-md">Online</span>
                <span className="drop-shadow-sm">y Presencial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToServices}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/60 hover:text-primary transition-colors cursor-pointer p-2"
          aria-label="Desplazarse hacia abajo"
        >
          <ChevronDown className="h-10 w-10" aria-hidden="true" />
        </button>
      </section>

      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
