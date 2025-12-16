import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Michroma } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SITE } from "@/lib/constants"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Michroma es la alternativa libre más cercana a Microgramma/Eurostile Extended
const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-michroma",
})

export const metadata: Metadata = {
  metadataBase: new URL('http://teamhenrycastillo.com'),
  title: {
    default: "Henry Castillo - Entrenador Personal en Loja",
    template: `%s | ${SITE.name}`,
  },
  description: "Entrenamiento personal científico e integral en Loja, Ecuador. Transforma tu físico y vitalidad con planes de nutrición y ejercicio personalizados.",
  keywords: [
    "Nutrición deportiva Loja",
    "Plan de alimentación personalizado",
    "Entrenador personal Loja",
    "Henry Castillo",
    "Coach fitness",
    "Entrenamiento personalizado",
    "Entrenamiento online",
    "Fitness Ecuador",
    "Nutrición deportiva",
    "Pérdida de grasa",
    "Ganancia muscular",
    "Plan de entrenamiento personalizado",
    "Rutina de entrenamiento",
    "Entrenamiento en Loja",
    "Rutina de ejercicios online",
    "Planificación de entrenamiento",
    "Rutina personalizada",
    "Entrenamiento presencial",
    "Corrección postural",
    "Plan de entrenamiento",
    "Evaluación física integral"
  ],
  authors: [{ name: "Henry Castillo" }],
  creator: "Henry Castillo",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "http://teamhenrycastillo.com",
    title: "Henry Castillo - Entrenador Personal en Loja",
    description: "Entrenamiento personal científico e integral en Loja, Ecuador. Transforma tu físico y vitalidad con planes de nutrición y ejercicio personalizados.",
    siteName: "Henry Castillo Team",
    images: [
      {
        url: "/Logo Henry.webp",
        width: 800,
        height: 600,
        alt: "Logo Henry Castillo - Entrenador Personal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Castillo - Entrenador Personal en Loja",
    description: "Entrenamiento personal científico e integral en Loja, Ecuador.",
    images: ["/Logo Henry.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/Logo Henry.ico",
    shortcut: "/Logo Henry.ico",
    apple: "/apple-icon.png",
  },
  generator: 'Next.js'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#121212" }, // Force dark theme color even in light mode preference for consistency
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Henry Castillo",
              jobTitle: "Entrenador Personal",
              description: SITE.description,
              url: SITE.url,
              sameAs: ["https://www.instagram.com/henrycastillonarvaez"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Loja",
                addressCountry: "EC",
              },
              knowsAbout: ["Entrenamiento de fuerza", "Nutrición deportiva", "Pérdida de grasa", "Hipertrofia"],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${michroma.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
