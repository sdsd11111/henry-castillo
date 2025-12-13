"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Dumbbell, Activity, Apple, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CONTACT } from "@/lib/constants"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isBioExpanded, setIsBioExpanded] = useState(false)

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
                src="/images/513249579-4119168998354039-2382360676927873571-n.jpg"
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
                "Mi principio inquebrantable: El verdadero éxito físico solo es sostenible si tienes salud interna. No solo verte fuerte, estar sano por dentro."
              </p>
            </div>

            <p className="text-neutral-400 leading-relaxed text-lg text-justify">
              Soy Henry Castillo, tu Entrenador Personal certificado en Loja, Ecuador, especializado en la transformación de profesionales y adultos de 40+ años. Mi
              {!isBioExpanded && (
                <button
                  onClick={() => setIsBioExpanded(true)}
                  className="ml-2 text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                >
                  Seguir leyendo
                </button>
              )}
              {isBioExpanded && (
                <span> metodología trasciende el gimnasio; es un compromiso de longevidad basado en el enfoque integral: <span className="text-white font-semibold">Fitness + Nutrición + Data Científica</span>.
                  <button
                    onClick={() => setIsBioExpanded(false)}
                    className="ml-2 text-primary hover:underline font-bold text-sm uppercase tracking-wide focus:outline-none"
                  >
                    Ocultar
                  </button>
                </span>
              )}
            </p>

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
                    <strong className="text-white">Descripción:</strong> Dejo de lado las rutinas genéricas para diseñar un programa que se ajusta a tu historial médico, tus objetivos reales y tu vida ocupada.
                  </p>
                  <p>
                    <strong className="text-white">Enfoque de Experiencia:</strong> Trabajamos contigo para crear una disciplina que puedas mantener a los 60 años. Mi enfoque está en la prevención, garantizando que cada repetición y cada ejercicio contribuyan a tu bienestar futuro.
                  </p>
                  <div className="bg-primary/5 p-3 rounded-md border border-primary/10 text-sm">
                    <strong className="text-primary block mb-1">Nota Importante:</strong>
                    El servicio presencial es ideal si buscas comenzar desde cero y establecer bases sólidas. El servicio online está optimizado para atletas experimentados que ya conocen la técnica y buscan llevar su rendimiento al siguiente nivel.
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Pillar 2 */}
              <AccordionItem value="item-2" className="border border-zinc-800 rounded-lg bg-zinc-900/30 px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Activity className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-semibold text-primary uppercase tracking-wide">
                      Pilar: La Ventaja de la Data Médica
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-300 space-y-4 pb-4 pl-16">
                  <p>
                    <strong className="text-white">Descripción:</strong> Soy tu entrenador, pero diseño tu plan con la precisión de un científico. Utilizo tus datos de salud como el mapa para tu éxito.
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-white">Enfoque de Ciencia:</strong> Mi protocolo requiere una evaluación inicial completa que incluye analizar tus exámenes de sangre (colesterol, triglicéridos, glucosa, hematocrito).</p>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-neutral-400">
                      <li>Ajustar la intensidad de tu entrenamiento de forma segura.</li>
                      <li>Detectar riesgos como la resistencia a la insulina o el colesterol elevado y adaptar la estrategia nutricional.</li>
                    </ul>
                  </div>
                  <p>
                    <strong className="text-white">Coordinación:</strong> Si es necesario, trabajo en coordinación contigo y tu médico de cabecera para que tu plan de ejercicio sea complementario y seguro.
                  </p>
                </AccordionContent>
              </AccordionItem>

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
                    <strong className="text-white">Descripción:</strong> La nutrición no es una adivinanza, es una ciencia exacta. Tu dieta será el pilar que respalde tu salud cardiovascular.
                  </p>
                  <p>
                    <strong className="text-white">Enfoque de Precisión:</strong> Calculamos con exactitud tus calorías y macronutrientes con tecnología (MyFitnessPal u otras apps), y luego lo personalizamos según los resultados de tus exámenes médicos.
                  </p>
                  <p>
                    <strong className="text-white">Salud Digestiva:</strong> Monitoreamos la absorción de nutrientes y la salud intestinal usando la Escala de Bristol. Porque la forma en que tu cuerpo procesa los alimentos es tan importante como lo que comes.
                  </p>
                  <p className="text-sm italic text-neutral-400 border-t border-zinc-800 pt-2 mt-2">
                    <strong className="text-white not-italic">Seguimiento:</strong> Evaluaciones detalladas de progreso cada 15 días y nuevos exámenes de control cada 3 meses.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 group"
                asChild
              >
                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <span>Contactar Ahora</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="mt-4 text-sm text-neutral-500 font-medium">
                ¿Cansado de planes superficiales? Entrena con la ciencia de tu lado.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
