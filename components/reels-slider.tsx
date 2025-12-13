"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

const reels = [
  {
    id: "1",
    url: "https://www.instagram.com/reel/DRK06EikVsw/?igsh=MXJpNG9wc2J3ZWdkNw==",
    thumbnail: "/fitness-training-tips-gym-workout.jpg",
    title: "Consejos de entrenamiento",
  },
  {
    id: "2",
    url: "https://www.instagram.com/reel/DRSV-QUDmmu/?igsh=MWpxY3Y0ZmdzamUwYQ==",
    thumbnail: "/exercise-technique-proper-form.jpg",
    title: "Técnica y progresión",
  },
  {
    id: "3",
    url: "https://www.instagram.com/reel/DRncGbJDkLx/?igsh=a2wwbzc5amNzYnVz",
    thumbnail: "/smart-training-muscle-building.jpg",
    title: "Entrenamiento inteligente",
  },
  {
    id: "4",
    url: "https://www.instagram.com/reel/DRK06EikVsw/?igsh=MXJpNG9wc2J3ZWdkNw==",
    thumbnail: "/effective-workout-routine-gym.jpg",
    title: "Rutinas efectivas",
  },
]

export function ReelsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener("scroll", checkScroll, { passive: true })
      checkScroll()
      return () => slider.removeEventListener("scroll", checkScroll)
    }
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

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 280
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const openReel = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-zinc-900 overflow-hidden" aria-labelledby="reels-heading">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-primary font-semibold uppercase tracking-wide mb-2 text-sm">Contenido</p>
            <h2 id="reels-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Mira mis videos
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Tips, entrenamientos y contenido educativo en Instagram
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 h-10 w-10"
              aria-label="Ver videos anteriores"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 h-10 w-10"
              aria-label="Ver más videos"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="list"
          aria-label="Videos de Instagram"
        >
          {reels.map((reel, index) => (
            <button
              key={reel.id}
              onClick={() => openReel(reel.url)}
              className={`group relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              aria-label={`Ver video: ${reel.title} (abre Instagram en nueva ventana)`}
              role="listitem"
            >
              {/* Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${reel.thumbnail})` }}
                aria-hidden="true"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                aria-hidden="true"
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Play className="h-5 w-5 md:h-6 md:w-6 text-white fill-white ml-1" aria-hidden="true" />
                </div>
              </div>

              {/* Instagram badge */}
              <div className="absolute top-3 right-3">
                <Instagram className="h-5 w-5 text-white drop-shadow-lg" aria-hidden="true" />
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-medium line-clamp-2">{reel.title}</p>
              </div>
            </button>
          ))}

          {/* Ver más card */}
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[250px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer snap-center bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex flex-col items-center justify-center gap-4 hover:border-primary transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${reels.length * 100}ms` }}
            aria-label="Ver más contenido en Instagram (abre en nueva ventana)"
            role="listitem"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Instagram className="h-7 w-7 md:h-8 md:w-8 text-primary" aria-hidden="true" />
            </div>
            <div className="text-center px-4">
              <p className="text-white font-semibold text-sm md:text-base">Ver más en Instagram</p>
              <p className="text-gray-400 text-xs md:text-sm">{CONTACT.instagramHandle}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
