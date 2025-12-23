"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Dumbbell, Apple, ClipboardCheck, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { CONTACT } from "@/lib/constants"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="sobre-mi" className="py-12 sm:py-20 bg-black overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        {/* Header spanning 2 columns */}
        <div
          className={`text-center max-w-4xl mx-auto mb-8 sm:mb-12 space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-primary/20">
            Sobre Henry / Acerca de
          </span>
          <h2 id="about-heading" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            ¿En qué consisten las <span className="text-primary italic">asesorías?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 sm:translate-x-0" : "opacity-0 sm:-translate-x-8"
              }`}
          >
            <div className="relative aspect-[3/4] max-w-full sm:max-w-md mx-auto mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/images/seccion 1.webp"
                alt="Henry Castillo - Entrenador Personal Certificado"
                fill
                className="object-cover rounded-2xl shadow-2xl shadow-primary/10"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl backdrop-blur-sm hidden sm:block">
                <p className="text-4xl font-bold text-primary">+5</p>
                <p className="text-sm text-zinc-400 font-medium uppercase tracking-wider">Años de<br />Experiencia</p>
              </div>
            </div>

            {/* Pillar 1 - Desktop Only (Under Image) */}
            <div className="hidden lg:block mt-10">
              <div className="border border-zinc-800 rounded-2xl bg-zinc-900/40 p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group shadow-xl max-w-md mx-auto">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Dumbbell className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">
                      Respecto al <span className="text-primary">entrenamiento</span>
                    </h3>
                  </div>
                  <div className="text-neutral-300 space-y-4 text-justify">
                    <p className="leading-relaxed text-sm sm:text-base">
                      Respecto al entrenamiento, no trabajo con “rutinas milagro”, no cambio los ejercicios constantemente y no creo en listas interminables de ejercicios.
                    </p>
                    <p className="leading-relaxed text-sm sm:text-base">
                      Creo en aplicar el volumen y la intensidad adecuados para cada persona, y en mantener el entrenamiento el tiempo suficiente como para evaluar la evolución y progresar de forma real.
                    </p>
                    <div className="py-2 border-y border-white/5 space-y-1">
                      <p className="text-primary font-bold text-sm">Menos ruido.</p>
                      <p className="text-primary font-bold text-sm">Más criterio.</p>
                      <p className="text-primary font-bold text-sm">Mejores resultados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 w-full max-w-full overflow-hidden ${isVisible ? "opacity-100 sm:translate-x-0" : "opacity-0 sm:translate-x-8"
              }`}
          >
            <div className="bg-zinc-900/50 border-l-4 border-primary p-4 sm:p-6 rounded-r-lg w-full overflow-hidden">
              <p className="text-sm sm:text-lg text-white font-medium italic leading-relaxed break-words">
                "Mis servicios son tanto presenciales si te encuentras en la ciudad de Loja Ecuador como online si te encuentras en otra ciudad o país."
              </p>
            </div>

            <div className="text-neutral-400 leading-relaxed text-lg text-justify space-y-4 px-2 sm:px-0">
              <div className="break-words">
                <strong className="block text-white mb-2 text-xl">Entrenador Personal en Loja: Hábitos Reales, Resultados Naturales</strong>
                Soy Henry Castillo, Entrenador Personal en Loja. Mi trabajo es apoyarte en la creación de hábitos saludables sostenibles; es la única forma de conseguir resultados duraderos.
              </div>

              <div className="space-y-4 pt-2">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-semibold text-primary mb-2 text-sm sm:text-base">Bajo mi rol de Coach fitness, mantengo una ética innegociable:</p>
                  <ul className="space-y-3 text-xs sm:text-base">
                    <li className="break-words">
                      <strong className="text-white">Sin falsas promesas:</strong> No te diré que lograrás cambios drásticos de "redes sociales" en poco tiempo. Un proceso serio requiere constancia.
                    </li>
                    <li className="break-words">
                      <strong className="text-white">100% Natural:</strong> Si buscas utilizar fármacos para ganar masa o definirte, no soy el profesional para ti. Mi enfoque de entrenamiento personalizado se aleja del dopaje y prioriza tu salud.
                    </li>
                  </ul>

                  <div className="pt-4 mt-4 border-t border-white/10">
                    <p className="font-semibold text-primary mb-2 text-xs sm:text-sm uppercase tracking-wider">Aquí trabajamos con:</p>
                    <ul className="flex flex-wrap gap-3 text-[10px] sm:text-sm font-medium text-white">
                      <li className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Ciencia
                      </li>
                      <li className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Experiencia
                      </li>
                      <li className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Sentido Común
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars Section: Mobile Carousel / Desktop Pillar 2 */}
            <div className="space-y-6 w-full overflow-hidden">
              {/* Desktop Pillar 2 Only */}
              <div className="hidden lg:block border border-zinc-800 rounded-2xl bg-zinc-900/40 p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform duration-300">
                      <Apple className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                      Respecto a la <span className="text-primary">Alimentación</span>
                    </h3>
                  </div>
                  <div className="text-neutral-300 space-y-4 text-justify">
                    <p className="leading-relaxed text-sm sm:text-base">
                      Respecto a la alimentación, no trabajo con dietas cerradas, ya que es imposible imponer un plan sin saber si la persona puede cumplirlo.
                    </p>
                    <p className="leading-relaxed italic text-white/90 text-sm sm:text-base">
                      Proporciono una estimación de calorías junto con la distribución de macronutrientes, siempre en función de tus objetivos.
                    </p>
                    <p className="leading-relaxed font-medium text-primary text-sm sm:text-base">
                      La idea no es que sigas una dieta perfecta por unos días, sino que puedas sostenerla en el tiempo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Carousel View */}
              <div className="lg:hidden w-full overflow-hidden">
                <Carousel className="w-full">
                  <CarouselContent className="ml-0">
                    <CarouselItem className="basis-full pl-0">
                      <div className="border border-zinc-800 rounded-2xl bg-zinc-900/40 p-4 sm:p-5 shadow-xl h-full mx-1">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                              <Dumbbell className="h-5 w-5" />
                            </div>
                            <h3 className="text-[12px] sm:text-base font-black text-white uppercase tracking-tighter flex flex-wrap gap-x-1 leading-none">
                              <span>Respecto al</span> <span className="text-primary text-[13px] sm:text-base">entrenamiento</span>
                            </h3>
                          </div>
                          <div className="text-neutral-300 space-y-3 text-[11px] text-left leading-relaxed">
                            <p>
                              Respecto al entrenamiento, no trabajo con “rutinas milagro”, no cambio los ejercicios constantemente y no creo en listas interminables de ejercicios.
                            </p>
                            <p>
                              Creo en aplicar el volumen y la intensidad adecuados para cada persona, y en mantener el entrenamiento el tiempo suficiente como para evaluar la evolución y progresar de forma real.
                            </p>
                            <div className="py-2 border-y border-white/5 space-y-1">
                              <p className="text-primary font-bold">Menos ruido.</p>
                              <p className="text-primary font-bold">Más criterio.</p>
                              <p className="text-primary font-bold">Mejores resultados.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="basis-full pl-0">
                      <div className="border border-zinc-800 rounded-2xl bg-zinc-900/40 p-4 sm:p-5 shadow-xl h-full mx-1">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-400 shrink-0 mt-0.5">
                              <Apple className="h-5 w-5" />
                            </div>
                            <h3 className="text-[12px] sm:text-base font-black text-white uppercase tracking-tighter flex flex-wrap gap-x-1 leading-none">
                              <span>Respecto a la</span> <span className="text-primary text-[13px] sm:text-base">Alimentación</span>
                            </h3>
                          </div>
                          <div className="text-neutral-300 space-y-3 text-[11px] text-left leading-relaxed">
                            <p>
                              Respecto a la alimentación, no trabajo con dietas cerradas, ya que es imposible imponer un plan sin saber si la persona puede cumplirlo.
                            </p>
                            <p className="italic text-white/90">
                              Proporciono una estimación de calorías junto con la distribución de macronutrientes, siempre en función de tus objetivos.
                            </p>
                            <p className="font-medium text-primary">
                              La idea no es que sigas una dieta perfecta por unos días, sino que puedas sostenerla en el tiempo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3 animate-pulse" />
                      Desliza a la derecha
                      <ArrowRight className="w-3 h-3 animate-pulse" />
                    </p>
                  </div>
                </Carousel>
              </div>
            </div>

            <div className="pt-4 px-2 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 group gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <ClipboardCheck className="h-5 w-5" />
                <span>Evaluación Gratuita</span>
              </Button>
              <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-medium max-w-lg">
                Si aún tienes dudas, agenda una cita gratuita de 40 minutos para evaluarte y aclarar tus inquietudes. Así podrás decidir, sin compromiso, si quieres iniciar mis asesorías.
              </p>
            </div>
          </div>
        </div>
      </div>
      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
