"use client"

import { MapPin, Globe, Apple, Activity, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    title: "Entrenamiento Presencial (1-a-1)",
    icon: MapPin,
    badge: "Recomendado 40+",
    description: "El estándar de oro para resultados garantizados.",
    details: [
      { label: "Ideal para", text: "Principiantes, personas que buscan técnica perfecta y profesionales que prefieren atención directa en Loja." },
      { label: "Incluye", text: "Evaluación física completa, corrección postural en tiempo real y motivación constante." },
      { label: "Diferenciador", text: "Sesiones adaptadas a tu energía diaria y estado de salud actual." },
    ],
  },
  {
    title: "Entrenamiento Online Premium",
    icon: Globe,
    description: "Rendimiento de élite, sin importar dónde estés.",
    details: [
      { label: "Requisito", text: "Exclusivo para personas con experiencia previa en entrenamiento que dominan la técnica básica." },
      { label: "Incluye", text: "Programación avanzada mediante App, seguimiento de cargas y soporte continuo." },
      { label: "Enfoque", text: "Optimización de resultados para quienes ya tienen una base pero buscan el siguiente nivel científico." },
    ],
  },
  {
    title: "Plan de Nutrición y Salud Integral",
    icon: Apple,
    description: "El motor que acelera tu transformación.",
    details: [
      { label: "Cálculo Científico", text: "Macronutrientes ajustados mediante MyFitnessPal y tus exámenes de sangre." },
      { label: "Bio-Individualidad", text: "Dieta diseñada para mejorar marcadores de colesterol, glucosa y salud digestiva (Escala de Bristol)." },
      { label: "Control", text: "Seguimiento semanal de progreso con gráficas de evolución real." },
    ],
  },
  {
    title: "Seguimiento Médico y Evaluaciones",
    icon: Activity,
    description: "La seguridad de que lo estás haciendo bien.",
    details: [
      { label: "Frecuencia", text: "Evaluaciones físicas cada 15 días y revisión de exámenes médicos cada 3 meses." },
      { label: "Colaboración", text: "Coordinación directa con tu médico para asegurar que el entrenamiento potencie tu salud general." },
    ],
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Card
      className="bg-zinc-900/50 border-zinc-800 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden group h-full flex flex-col"
    >
      {service.badge && (
        <div className="absolute top-0 right-0">
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

      <CardContent className="space-y-4 flex-grow">
        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
          {service.details.map((detail, i) => (
            <div key={i} className="text-sm">
              <span className="block text-primary font-semibold mb-1 uppercase text-xs tracking-wide">
                {detail.label}
              </span>
              <span className="text-neutral-300 block leading-relaxed">
                {detail.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
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
              asChild
            >
              <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
                AGENDA TU CONSULTA
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
