"use client"

import { Activity, Utensils, ShieldCheck, Microscope, Check, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const pillars = [
  {
    title: "Monitoreo de Salud Cardiovascular y Metabólica",
    description: "No adivinamos qué intensidad necesitas. Solicitamos y analizamos tus exámenes de Colesterol, Triglicéridos, Glucosa y Hematocrito. Esto nos permite prevenir riesgos como la resistencia a la insulina o la hipertensión, ajustando el ejercicio a lo que tu corazón realmente puede manejar.",
    icon: Activity,
  },
  {
    title: "Nutrición Basada en Evidencia (No en Modas)",
    description: "Tu plan nutricional se sincroniza con tus análisis de sangre. Si tus niveles muestran alguna alerta, ajustamos tus macronutrientes mediante tecnología (MyFitnessPal) para corregir tu química interna mientras alcanzas tu peso ideal.",
    icon: Utensils,
  },
  {
    title: "Enfoque en Longevidad (Proyecto 60+)",
    description: "No buscamos resultados de \"un mes para la playa\". Diseñamos tu cuerpo para que a los 60 años seas una persona funcional, fuerte y libre de enfermedades no transmisibles. Es una inversión en tu yo del futuro.",
    icon: ShieldCheck,
  },
  {
    title: "Control Digestivo (Escala de Bristol)",
    description: "La base de tu energía es tu digestión. Realizamos un seguimiento de tu salud intestinal para garantizar que realmente estás absorbiendo los nutrientes que consumes. Si tu sistema digestivo no funciona, tus músculos tampoco.",
    icon: Microscope,
  },
]

function PillarCard({ pillar }: { pillar: typeof pillars[0] }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 md:hover:-translate-y-1 h-full">
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
        <pillar.icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">
        {pillar.title}
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        {pillar.description}
      </p>
    </div>
  )
}

function TraditionalContent() {
  return (
    <div className="p-8 md:border-r border-neutral-800 bg-neutral-900/50 h-full">
      <h4 className="text-neutral-500 font-bold uppercase tracking-wider mb-8 text-sm md:text-base text-center">Entrenamiento Tradicional</h4>
      <ul className="space-y-6">
        <li className="flex items-center justify-center gap-3 text-neutral-400">
          <X className="w-5 h-5 text-red-500/70" />
          <span>Solo Pesas y Cardio</span>
        </li>
        <li className="flex items-center justify-center gap-3 text-neutral-400">
          <X className="w-5 h-5 text-red-500/70" />
          <span>Dieta Genérica</span>
        </li>
        <li className="flex items-center justify-center gap-3 text-neutral-400">
          <X className="w-5 h-5 text-red-500/70" />
          <span>Sin Análisis de Sangre</span>
        </li>
      </ul>
    </div>
  )
}

function HenryContent() {
  return (
    <div className="p-8 bg-primary/5 relative h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <h4 className="text-primary font-bold uppercase tracking-wider mb-8 text-sm md:text-base text-center">Metodología H.C.</h4>
      <ul className="space-y-6">
        <li className="flex items-center justify-center gap-3 text-white font-medium">
          <Check className="w-5 h-5 text-primary" />
          <span>Pesas + Biología</span>
        </li>
        <li className="flex items-center justify-center gap-3 text-white font-medium">
          <Check className="w-5 h-5 text-primary" />
          <span>Nutrición Clínica</span>
        </li>
        <li className="flex items-center justify-center gap-3 text-white font-medium">
          <Check className="w-5 h-5 text-primary" />
          <span>Control Médico Total</span>
        </li>
      </ul>
    </div>
  )
}

export function VitalitySection() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            Propuesta de Valor / ¿Por qué Henry?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            La Diferencia entre "Entrenar" y <br className="hidden md:block" />
            <span className="text-primary">Potenciar tu Vitalidad</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Mientras otros se enfocan solo en el espejo, nosotros nos enfocamos en tu <strong>Funcionamiento Interno</strong>. Un cuerpo fuerte es el resultado de un interior equilibrado.
          </p>
        </div>

        {/* Protocolo de Salud y Metabolismo Content */}
        <div className="max-w-4xl mx-auto mb-20 bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-neutral-800">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            PROTOCOLO DE SALUD Y METABOLISMO
          </h3>
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            Como parte de mi protocolo como <strong>Entrenador Personal en Loja</strong>, la salud es prioritaria. Para diseñar un plan de entrenamiento personalizado y alimentación que respete y potencie tu metabolismo y tu salud cardiovascular, te solicitaré:
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 h-fit rounded-lg">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Exámenes de Sangre Básicos</h4>
                <p className="text-neutral-400">Requerimos exámenes recientes de colesterol, glucosa y triglicéridos.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 h-fit rounded-lg">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Colaboración Médica</h4>
                <p className="text-neutral-400">Si es necesario, trabajaré directamente con tu médico de cabecera.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800">
            <p className="text-white font-medium italic">
              "De esta forma, garantizamos que cada decisión en tu plan se base en datos reales, monitoreando la evolución de tu salud interna."
            </p>
          </div>
        </div>

        {/* Comparison Chart - Desktop */}
        <div className="hidden md:block max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden mb-16">
          <div className="grid grid-cols-2 text-center">
            <TraditionalContent />
            <HenryContent />
          </div>
        </div>

        {/* Comparison Chart - Mobile Tabs */}
        <div className="md:hidden max-w-4xl mx-auto mb-16 px-4">
          <Tabs defaultValue="traditional" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
              <TabsTrigger value="traditional">Tradicional</TabsTrigger>
              <TabsTrigger value="henry">Metodología H.C.</TabsTrigger>
            </TabsList>
            <TabsContent value="traditional" className="mt-4 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <TraditionalContent />
            </TabsContent>
            <TabsContent value="henry" className="mt-4 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
              <HenryContent />
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 text-base md:text-lg shadow-lg shadow-primary/25"
            asChild
          >
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer">
              AGENDA TU EVALUACIÓN AQUÍ
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-neutral-500 text-sm">
            ¿Quieres un plan basado en tus datos reales?
          </p>
        </div>

      </div>
    </section>
  )
}
