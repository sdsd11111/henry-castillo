"use client"

import { useState } from "react"
import { MapPin, Globe, Apple, Activity, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EvaluationModal } from "@/components/evaluation-modal"
import { CONTACT } from "@/lib/constants"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const services = [
  {
    title: "ENTRENAMIENTO PRESENCIAL: La seguridad de que lo estás haciendo bien",
    icon: MapPin,
    badge: "Recomendado 40+",
    description: "📍 Disponible en Loja, Ecuador",
    sections: [
      {
        title: "¿Para quién es?",
        items: [
          { label: "Principiantes:", text: "Ideal para quienes desean comenzar desde cero de forma segura." },
          { label: "Técnica en desarrollo:", text: "Para personas que aún no dominan la ejecución de los ejercicios." },
          { label: "Atención Directa:", text: "Profesionales y personas con experiencia que prefieren supervisión constante de un Entrenador Personal en Loja." },
        ]
      },
      {
        title: "¿Qué incluye?",
        items: [
          { label: "✅ Planificación personalizada:", text: "Tu rutina diseñada a medida según tus objetivos." },
          { label: "✅ Evaluación física completa:", text: "Análisis inicial detallado de tu condición actual." },
          { label: "✅ Corrección en tiempo real:", text: "Supervisión postural y técnica constante para evitar lesiones." },
          { label: "✅ Seguimiento por App:", text: "Control de tu progreso y evolución mediante una aplicación exclusiva." },
        ]
      }
    ]
  },
  {
    title: "ENTRENAMIENTO ONLINE: Entrena sin importar dónde estés",
    icon: Globe,
    description: "Entrenamiento a distancia con calidad profesional.",
    sections: [
      {
        title: "¿Para quién es?",
        items: [
          { label: "Requisito exclusivo:", text: "Diseñado para personas con experiencia previa que ya dominan la técnica básica de los ejercicios y buscan la guía de un Coach fitness a distancia." },
        ]
      },
      {
        title: "¿Qué incluye?",
        items: [
          { label: "✅ Planificación personalizada:", text: "Tu rutina de entrenamiento adaptada a tus objetivos y contexto específico." },
          { label: "✅ Recursos videográficos:", text: "Guía visual detallada con videos explicativos de cada ejercicio para asegurar tu progreso." },
          { label: "✅ Seguimiento por App:", text: "Control total de tus entrenamientos y evolución constante mediante una aplicación especializada." },
        ]
      }
    ]
  },
  {
    title: "Plan de Nutrición y Salud Integral",
    icon: Apple,
    description: "El motor que acelera tu transformación.",
    sections: [
      {
        title: "Detalles",
        items: [
          { label: "Cálculo Científico:", text: "Macronutrientes ajustados mediante MyFitnessPal y tus exámenes de sangre." },
          { label: "Bio-Individualidad:", text: "Dieta diseñada para mejorar marcadores de colesterol, glucosa y salud digestiva (Escala de Bristol)." },
          { label: "Control:", text: "Seguimiento semanal de progreso con gráficas de evolución real." },
        ]
      }
    ]
  },
  {
    title: "¿No sabes si tu rutina está bien estructurada?",
    icon: Activity,
    description: "📅 2 sesiones de 30 minutos",
    sections: [
      {
        title: "Proceso",
        items: [
          { label: "Primera sesión (30 min):", text: "Nos reunimos para analizar tu rutina actual. Durante esta sesión, tomaré nota de tu contexto, objetivos, experiencia y circunstancias para diseñar un plan de entrenamiento personalizado realmente acorde a ti." },
          { label: "Planificación:", text: "Tardaré como máximo 3 días hábiles en elaborar tu rutina estratégica como Coach fitness." },
          { label: "Segunda sesión (30 min):", text: "Revisaremos detalle a detalle toda la estructura de tu nuevo plan. Te explicaré el porqué de cada decisión y resolveré tus dudas para que empieces a entrenar con total seguridad en Loja o desde cualquier lugar." },
        ]
      }
    ],
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card
      className={`bg-zinc-900/50 border-zinc-800 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group flex flex-col ${isOpen ? "h-auto" : "h-full"}`}
    >
      {service.badge && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            {service.badge}
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <service.icon className="h-6 w-6 text-white group-hover:text-primary transition-colors" />
        </div>
        <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors">
          {service.title}
        </CardTitle>
        <p className="text-sm text-neutral-400 italic pt-2">
          "{service.description}"
        </p>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
        <div className={`space-y-6 border-t border-zinc-800/50 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
          {service.sections.map((section, i) => (
            <div key={i} className="space-y-3">
              {section.title && section.title !== "Detalles" && section.title !== "Proceso" && (
                <h4 className="font-semibold text-primary text-xs uppercase tracking-wider border-b border-primary/20 pb-1 inline-block">
                  {section.title}
                </h4>
              )}
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-neutral-300">
                    <span className="block mb-0.5">
                      {item.label && <strong className="text-white mr-1">{item.label}</strong>}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full mt-auto hover:bg-zinc-800 text-primary hover:text-primary min-h-[40px]"
        >
          {isOpen ? (
            <span className="flex items-center gap-2">Ver menos <ChevronUp className="h-4 w-4" /></span>
          ) : (
            <span className="flex items-center gap-2">Ver detalles <ChevronDown className="h-4 w-4" /></span>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="servicios" className="py-24 bg-zinc-950" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            Servicios / Programas
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Programas de Entrenamiento <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
              Diseñados para tu Estilo de Vida
            </span>
          </h2>
          <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Selecciona la modalidad que mejor se adapte a tus objetivos. Todos mis planes incluyen el Protocolo de Salud Integral (seguimiento médico y nutrición científica).
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 basis-[85%] sm:basis-[60%]">
                  <div className="h-full">
                    <ServiceCard service={service} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ¿NO SABES CUÁL ELEGIR?
            </h3>
            <p className="text-neutral-400 text-lg">
              Agenda una consulta gratuita para evaluar tu caso y recomendarte el plan ideal.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8"
              onClick={() => setIsModalOpen(true)}
            >
              <span>
                AGENDA TU CONSULTA
              </span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

      </div>
      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
