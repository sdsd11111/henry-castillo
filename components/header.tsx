"use client"

import { useState, useEffect } from "react"
import { Calendar, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#servicios", label: "Servicios" },
    { href: "#testimonios", label: "Testimonios" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#272726] shadow-lg border-b border-white/5" : "bg-transparent"
        }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Ir al inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo Henry.webp"
              alt="Logo Henry Castillo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">
              HENRY CASTILLO
            </span>
          </a>

          {/* Nav links hidden per request "Solamente tiene que salir Henry Castillo..." */}
          {/* 
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav> 
          */}

          {/* CTA Button - Appears on right when scrolling */}
          <div className={`flex items-center gap-3 transition-all duration-500 transform ${isScrolled
            ? "translate-x-0 opacity-100"
            : "translate-x-10 opacity-0 pointer-events-none"
            }`}>
            <Button
              asChild
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hidden sm:flex"
            >
              <a
                href={CONTACT.calLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agenda una llamada gratuita (abre en nueva ventana)"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Agenda tu Evaluación Gratuita</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button - Optional: Keeping it accessible if needed, but per instructions 'Solamente', maybe hide too? 
                 If user needs NO menu at all, I should hide this. 
                 "Solamente tiene que salir Henry Castillo y el logo... luego... un boton". 
                 This implies NO hamburger menu initially. 
                 I will hide the hamburger menu as well to strictly follow instructions.
              */}
        </div>
      </div>
    </header>
  )
}
