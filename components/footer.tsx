"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MessageCircle, MapPin, Mail, Clock, Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/5" role="contentinfo">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Identity */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-auto">
                  <img
                    src="/og-image.webp"
                    alt="Henry Castillo - Entrenador Personal"
                    className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight uppercase">
                  Henry Castillo
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Entrenamiento personal con enfoque científico e integral. Elevando tu rendimiento físico y vitalidad desde Loja, Ecuador.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Navegación Rápida</h4>
            <nav className="flex flex-col space-y-3">
              <Link href="#sobre-mi" className="text-neutral-400 hover:text-primary transition-colors text-sm w-fit">
                Sobre Mí
              </Link>
              <Link href="#servicios" className="text-neutral-400 hover:text-primary transition-colors text-sm w-fit">
                Servicios (Presencial / Online)
              </Link>
              <Link href="#results-heading" className="text-neutral-400 hover:text-primary transition-colors text-sm w-fit">
                Casos de Éxito
              </Link>
              <Link href="#faq-heading" className="text-neutral-400 hover:text-primary transition-colors text-sm w-fit">
                Preguntas Frecuentes
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Contacto y Ubicación</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Loja, Ecuador.</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+593 98 656 2727</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>Lunes a Viernes - Citas previa evaluación.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Sígueme</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/henrycastillonarvaez/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/henry.castillo.90475?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/593986562727?text=Hola%20Henry,%20me%20gustar%C3%ADa%20agendar%20mi%20evaluaci%C3%B3n%20inicial%20integral"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-primary/30 flex text-xs text-neutral-400 justify-center">
          <p className="text-center">
            Diseñado por{" "}
            <a
              href="https://cesarreyesjaramillo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              Cesar Reyes
            </a>
            {" "}| Team Henry Castillo 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
