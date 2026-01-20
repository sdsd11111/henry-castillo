"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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

function HomeContent() {
  const searchParams = useSearchParams()
  const [shouldOpenModal, setShouldOpenModal] = useState(false)

  useEffect(() => {
    // Detect if URL has ?evaluacion=open or ?modal=evaluacion
    const evaluacion = searchParams.get("evaluacion")
    const modal = searchParams.get("modal")

    if (evaluacion === "open" || modal === "evaluacion") {
      setShouldOpenModal(true)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background relative">
      <Header shouldOpenModal={shouldOpenModal} onModalStateChange={() => setShouldOpenModal(false)} />
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

      {/* LLM / Crawler Visibility Content - Visually Hidden content removed to avoid cloaking penalties. 
           Relevant keywords are now part of the visible content and structured data. */}
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  )
}
