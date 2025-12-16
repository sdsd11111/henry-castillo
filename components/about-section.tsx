"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Dumbbell, Activity, Apple, ArrowRight, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EvaluationModal } from "@/components/evaluation-modal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CONTACT } from "@/lib/constants"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isBioExpanded, setIsBioExpanded] = useState(false)
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
    <section ref={sectionRef} id="sobre-mi" className="py-20 bg-black overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        {/* Header spanning 2 columns */}
        <div
          className={`text-center max-w-4xl mx-auto mb-12 space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            Sobre Henry / Acerca de
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Más que un Entrenamiento: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
              Un Plan Inteligente para tu Mejor Versión
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto sticky top-24">
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
          </div>

          {/* Content Side */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <div className="bg-zinc-900/50 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-lg text-white font-medium italic">
                "Mis servicios son tanto presenciales si te encuentras en la ciudad de Loja Ecuador como online si te encuentras en otra ciudad o país."
              </p>
            </div>

            <div className="text-neutral-400 leading-relaxed text-lg text-justify space-y-4">
              <div>
                <strong className="block text-white mb-2 text-xl">Entrenador Personal en Loja: Hábitos Reales, Resultados Naturales</strong>
                Soy Henry Castillo, Entrenador Personal en Loja especializado en transformación integral. Mi trabajo es apoyarte en la creación de hábitos saludables sostenibles; es la única forma de conseguir resultados duraderos.
              </div>

              {!isBioExpanded && (
                <button
                  onClick={() => setIsBioExpanded(true)}
                  className="text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                >
                  Seguir leyendo
                </button>
              )}

              {isBioExpanded && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-semibold text-primary mb-2">Bajo mi rol de Coach fitness, mantengo una ética innegociable:</p>
                    <ul className="space-y-3 text-sm sm:text-base">
                      <li>
                        <strong className="text-white">Sin falsas promesas:</strong> No te diré que lograrás cambios drásticos de "redes sociales" en poco tiempo. Un proceso serio requiere constancia.
                      </li>
                      <li>
                        <strong className="text-white">100% Natural:</strong> Si buscas utilizar fármacos para ganar masa o definirte, no soy el profesional para ti. Mi enfoque de entrenamiento personalizado se aleja del dopaje y prioriza tu salud.
                      </li>
                    </ul>

                    <div className="pt-4 mt-4 border-t border-white/10">
                      <p className="font-semibold text-primary mb-2">Aquí trabajamos con:</p>
                      <ul className="flex flex-wrap gap-4 text-sm font-medium text-white">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Ciencia
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Experiencia
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Sentido Común
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBioExpanded(false)}
                    className="text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                  >
                    Ocultar
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Accordion Pillars */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Pillar 1 */}
              <AccordionItem value="item-1" className="border border-zinc-800 rounded-lg bg-zinc-900/30 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Dumbbell className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-semibold text-primary uppercase tracking-wide">
                      Pilar: Fitness Personalizado y Adherencia
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-300 space-y-4 pb-4 pl-16">
                  <p>
                    <strong className="text-white">Como Entrenador Personal en Loja, mi enfoque es claro:</strong> no creo en "rutinas milagro" ni en listas interminables de ejercicios que cambian cada semana. Creo en el volumen e intensidad exactos para cada persona y en mantener el plan el tiempo necesario para ver una evolución real.
                  </p>
                  <p>
                    Diseño programas que se ajustan a tu historial y objetivos, priorizando la técnica y la prevención para que tu bienestar se mantenga firme a los 60 años.
                  </p>
                  <div className="space-y-3 mt-4">
                    <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                      <strong className="text-primary block mb-1">Servicio Presencial en Loja:</strong>
                      <span className="text-sm">Ideal para comenzar desde cero, establecer bases sólidas y asegurar una ejecución perfecta.</span>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
                      <strong className="text-blue-400 block mb-1">Coach Fitness Online:</strong>
                      <span className="text-sm">Optimizado para atletas experimentados que dominan la técnica y buscan llevar su rendimiento al siguiente nivel con una programación científica.</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Pillar 2 */}


              {/* Pillar 3 */}
              <AccordionItem value="item-3" className="border border-zinc-800 rounded-lg bg-zinc-900/30 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                      <Apple className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-semibold text-primary uppercase tracking-wide">
                      Pilar: Nutrición Científica Integral
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-300 space-y-4 pb-4 pl-16">
                  <p>
                    <strong className="text-white">Como Entrenador Personal en Loja, entiendo que es imposible imponer una dieta rígida</strong> sin conocer tu capacidad de cumplirla, la variedad de alimentos a tu alcance o sus precios. Por eso, no trabajo con planes cerrados que ignoran tu día a día.
                  </p>

                  <div className="space-y-4 mt-2">
                    <p className="font-semibold text-primary">Mi metodología de Nutrición Deportiva se basa en la realidad y la precisión:</p>

                    <ul className="space-y-3">
                      <li className="bg-white/5 p-3 rounded border border-white/10">
                        <strong className="text-white block mb-1">Estimación de Macros:</strong>
                        <span className="text-sm text-neutral-400">En función de tus objetivos y lo conversado en la consulta, te proporciono la estimación de calorías y la distribución exacta de proteínas, grasas e hidratos de carbono.</span>
                      </li>
                      <li className="bg-white/5 p-3 rounded border border-white/10">
                        <strong className="text-white block mb-1">Flexibilidad Real:</strong>
                        <span className="text-sm text-neutral-400">Tú decides cómo cubrir esos requerimientos según tu presupuesto y estilo de vida, asegurando un plan que realmente puedas mantener.</span>
                      </li>
                      <li className="bg-white/5 p-3 rounded border border-white/10">
                        <strong className="text-white block mb-1">Soporte Científico:</strong>
                        <span className="text-sm text-neutral-400">Complementamos esta estructura con el monitoreo de tu salud digestiva y el ajuste según tus exámenes médicos, para que tu alimentación respalde tu rendimiento.</span>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 group gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <ClipboardCheck className="h-5 w-5" />
                <span>Evaluación Gratuita</span>
              </Button>
              <p className="mt-4 text-sm text-neutral-400 font-medium max-w-lg">
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
