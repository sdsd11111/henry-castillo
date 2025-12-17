"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollPosition = window.scrollY
        const sectionTop = sectionRef.current.offsetTop

        // Only calculate parallax when section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setOffsetY((scrollPosition - sectionTop) * 0.3)
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <section
      ref={sectionRef}
      className="relative h-[550px] overflow-hidden flex items-center justify-center"
      aria-labelledby="parallax-heading"
    >
      {/* Parallax Image */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${offsetY}px)` }} aria-hidden="true">
        <Image
          src="/images/503984705-4097457117191894-5670764605460021442-n.jpg"
          alt="Entrenamiento grupal al aire libre en Loja - Henry Castillo Team"
          fill
          className="object-cover scale-125 grayscale"
          loading="lazy"
        />
        {/* Overlay removed as requested */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p
          className={`text-lg md:text-xl text-primary font-semibold mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          El entrenamiento es mejor en equipo
        </p>
        <h2
          id="parallax-heading"
          className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Resultados reales con personas reales
        </h2>
        <p
          className={`text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          Entreno tanto de forma presencial como online, adaptando cada plan a las necesidades y objetivos de cada
          persona.
        </p>
      </div>
    </section>
  )
}
