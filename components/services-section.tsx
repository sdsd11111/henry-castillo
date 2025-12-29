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
    title: "ENTRENAMIENTO PRESENCIAL EN LOJA",
    icon: MapPin,
    badge: "Recomendado 40+",
    description: "La seguridad de que lo estás haciendo bien.",
    sections: [
      {
        title: "📍 Disponible en Loja",
        items: []
      },
      {
        title: "¿Para quién es?",
        items: [
          { label: "•", text: "Principiantes." },
          { label: "•", text: "Personas que aún no tienen dominada la técnica de los ejercicios." },
          { label: "•", text: "Personas con experiencia que prefieren atención directa y supervisión constante." },
        ]
      },
      {
        title: "¿Qué incluye?",
        items: [
          { label: "✅", text: "Planificación personalizada de la rutina de entrenamiento." },
          { label: "✅", text: "Evaluación física completa." },
          { label: "✅", text: "Corrección postural y técnica en tiempo real." },
          { label: "✅", text: "Seguimiento continuo mediante una app." },
        ]
      }
    ]
  },
  {
    title: "ENTRENAMIENTO ONLINE",
    icon: Globe,
    description: "Entrena sin importar dónde estés.",
    sections: [
      {
        title: "Requisito",
        items: [
          { label: "•", text: "Exclusivo para personas con experiencia previa en entrenamiento que ya dominan la técnica básica de los ejercicios." },
        ]
      },
      {
        title: "¿Qué incluye?",
        items: [
          { label: "✅", text: "Planificación personalizada de la rutina de entrenamiento." },
          { label: "✅", text: "Recursos videográficos explicativos de cada ejercicio de tu rutina." },
          { label: "✅", text: "Seguimiento continuo mediante una app." },
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
        title: "Sesión 1",
        items: [
          { label: "🔹 Primera sesión (30 min):", text: "Nos reunimos para analizar tu rutina actual. Durante esta sesión tomaré nota de tu contexto, objetivos, experiencia y circunstancias, con el fin de diseñar un plan de entrenamiento realmente acorde a ti." },
        ]
      },
      {
        title: "Elaboración",
        items: [
          { label: "🔹 Planificación:", text: "Tardaré como máximo 3 días hábiles en elaborar tu rutina personalizada." },
        ]
      },
      {
        title: "Sesión 2",
        items: [
          { label: "🔹 Segunda sesión (30 min):", text: "Nos volvemos a reunir para revisar, detalle a detalle, toda la estructura del plan de entrenamiento. Te explicaré el porqué de cada decisión, resolveré todas tus dudas y dejaré todo claro para que puedas empezar con seguridad." },
        ]
      }
    ],
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {


  return (
    <Card
      className="bg-zinc-900/50 border-zinc-800 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group flex flex-col h-full"
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

      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className="space-y-6 border-t border-zinc-800/50 pt-4">
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
            Sin compromiso. <br />
            Con total claridad desde el inicio.
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
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-16">
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
