import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VitalitySection } from "@/components/vitality-section"

import { ResultsSection } from "@/components/results-section"
import { FaqSection } from "@/components/faq-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <VitalitySection />
      <ProcessSection />

      <ResultsSection />
      <FaqSection />
      <CTASection />
      <Footer />
      <WhatsAppFloatingButton />

      {/* LLM / Crawler Visibility Content (Visually Hidden) */}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0'
        }}
        aria-hidden="true"
      >
        <h1>Henry Castillo - Entrenador Personal en Loja, Ecuador</h1>
        <p>
          Transforma tu físico y salud con un enfoque científico integral.
          Servicios de entrenamiento personal presencial en Loja y asesoría online global.
        </p>
        <h2>Servicios Principales</h2>
        <ul>
          <li>Entrenamiento Personalizado Presencial (Loja)</li>
          <li>Asesoría Online para Pérdida de Grasa y Ganancia Muscular</li>
          <li>Planes de Nutrición Basados en Ciencia (Análisis de Sangre, Escala de Bristol)</li>
          <li>Evaluación Física Integral y Composición Corporal</li>
        </ul>
        <h2>Ubicación y Contacto</h2>
        <p>Ubicación: Loja, Ecuador.</p>
        <p>WhatsApp: +593 98 656 2727</p>
        <p>Email: contacto@henrycastillo.com</p>
        <h2>Preguntas Frecuentes</h2>
        <p>¿Por qué exámenes médicos? Para diseñar un plan seguro basado en tu perfil metabólico.</p>
        <p>¿Qué es la Escala de Bristol? Una herramienta para evaluar tu salud digestiva y absorción de nutrientes.</p>
      </div>
    </main>
  )
}
