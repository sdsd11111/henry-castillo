"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Cliente Verificado",
    image: "/latino-man-fitness-transformation.jpg",
    rating: 5,
    text: "Después de años probando diferentes rutinas sin resultados, aprendí que entrenar de forma inteligente es más importante que entrenar duro. En 12 semanas logré lo que no pude en 3 años.",
    highlight: "12 semanas de transformación",
  },
  {
    id: 2,
    name: "Cliente Verificado",
    image: "/latina-woman-fitness-healthy.jpg",
    rating: 5,
    text: "Lo que más valoro es que no me vendieron falsas promesas. Me explicaron la ciencia detrás de cada ejercicio y me enseñaron a escuchar mi cuerpo.",
    highlight: "Enfoque científico",
  },
  {
    id: 3,
    name: "Cliente Verificado",
    image: "/young-latino-man-gym-strong.jpg",
    rating: 5,
    text: "Tenía miedo de lesionarme con peso muerto y sentadillas. Me corrigieron la técnica y ahora son mis ejercicios favoritos. El seguimiento semanal hace toda la diferencia.",
    highlight: "Técnica perfeccionada",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      id="testimonios"
      className="py-16 md:py-20 bg-zinc-950"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-3xl mx-auto text-center mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-semibold uppercase tracking-wide mb-2 text-sm">Resultados reales</p>
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Lo que dicen quienes han entrenado conmigo
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Historias de transformación basadas en ciencia y constancia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 hover:border-primary/50 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Image section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

                {/* Highlight badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-primary/30" aria-hidden="true" />

                <blockquote className="text-white/80 text-sm leading-relaxed">"{testimonial.text}"</blockquote>

                <footer className="pt-2 border-t border-zinc-800">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                </footer>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-8">
          * Testimonios de ejemplo. Los resultados pueden variar según cada persona.
        </p>
      </div>
    </section>
  )
}
