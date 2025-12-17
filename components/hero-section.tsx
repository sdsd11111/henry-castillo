"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { Calendar, ClipboardCheck, ChevronDown } from "lucide-react"
import Image from "next/image"
import { CONTACT } from "@/lib/constants"
import { NewsletterForm } from "@/components/newsletter-form"

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
            src="/images/hero.webp"
            alt="Henry Castillo Entrenador Personal en Loja entrenando a cliente"
            fill
            className="object-cover object-top"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-32 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">

            {/* Left Column - Main Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1 md:space-y-8">
              <h1
                id="hero-heading"
                className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white uppercase tracking-tighter transition-all duration-700 delay-100 drop-shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                ENTRENADOR <span className="text-primary drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">PERSONAL</span> <br /> LOJA
              </h1>

              <div
                className={`max-w-xl transition-all duration-700 delay-200 drop-shadow-md ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                <div className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light space-y-2">
                  {/* Mobile View: Only Location */}
                  <div className="block md:hidden pb-1">
                    <p className="font-medium text-white/90 text-sm">
                      📍 Presencial en Loja | 🌎 Online para todo el mundo.
                    </p>
                  </div>

                  {/* Desktop View: Full Bio */}
                  <div className="hidden md:block">
                    <p>
                      <strong className="block text-white mb-2">¿Buscas resultados duraderos?</strong>
                      Soy Henry Castillo. Como Entrenador Personal, garantizo que tu esfuerzo dé frutos reales.
                    </p>

                    {!isExpanded && (
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                      >
                        Seguir leyendo
                      </button>
                    )}

                    {isExpanded && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-justify">
                          <p className="text-white/90">
                            Metodología integral: Nutrición y entrenamiento basados en tu salud. No solo fuerza, sino bienestar a largo plazo.
                          </p>
                          <p className="text-white/90 mt-4 border-t border-white/10 pt-4 font-medium">
                            📍 Presencial en Loja | 🌎 Online para todo el mundo.
                          </p>
                        </div>

                        <button
                          onClick={() => setIsExpanded(false)}
                          className="text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                        >
                          Ocultar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-1 transition-all duration-700 delay-300 w-full sm:w-auto ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                <Button
                  size="lg"
                  className="text-base md:text-lg px-8 py-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                  onClick={() => setIsModalOpen(true)}
                  aria-haspopup="dialog"
                >
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                  Evaluación Gratuita
                </Button>
              </div>

              <div
                className={`hidden lg:flex items-center gap-8 pt-4 text-white/80 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-3xl drop-shadow-md">100%</span>
                  <span className="drop-shadow-sm text-sm uppercase tracking-widest">Personalizado</span>
                </div>
                <div className="h-8 w-px bg-white/30" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-3xl drop-shadow-md">Online</span>
                  <span className="drop-shadow-sm text-sm uppercase tracking-widest">y Presencial</span>
                </div>
              </div>
            </div>

            {/* Right Column - Newsletter */}
            <div className={`flex flex-col items-center lg:items-center text-center space-y-4 md:space-y-6 transition-all duration-700 delay-500 scale-75 md:scale-100 origin-top md:origin-center ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}>
              <div className="space-y-2 max-w-md">
                <h2 className="text-xl md:text-3xl font-bold text-white leading-tight">
                  Henry Castillo
                  <span className="block text-primary text-lg md:text-2xl font-normal mt-1">Entrenador personal y online</span>
                </h2>
                <p className="text-white/80 font-light text-sm md:text-base">
                  Suscríbete a mi newsletter comparto consejos fitness todos los jueves.
                </p>
              </div>

              <div className="w-full max-w-sm md:max-w-md">
                <NewsletterForm />
              </div>

              <div className="lg:hidden w-full pt-8 flex justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-6 py-6 gap-2 border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold w-full max-w-sm"
                  asChild
                >
                  <a
                    href={CONTACT.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative flex h-3 w-3 mr-1 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Contáctame por WhatsApp
                  </a>
                </Button>
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
