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
  metadataBase: new URL('https://teamhenrycastillo.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Henry Castillo - Entrenador Personal en Loja | Nutrición y Fitness",
    template: `%s | ${SITE.name}`,
  },
  description: "Entrenamiento personal científico e integral en Loja, Ecuador. Transforma tu físico y vitalidad con planes de nutrición y ejercicio personalizados.",
  keywords: [
    "Entrenador personal Loja",
    "Nutrición deportiva Loja",
    "Henry Castillo",
    "Coach fitness Ecuador",
    "Pérdida de grasa",
    "Ganancia muscular",
    "Hipertrofia",
    "Recomposición corporal",
    "Plan de alimentación personalizado",
    "Entrenamiento online",
    "Asesoría fitness",
    "Evaluación física integral",
    "Escala de Bristol",
    "Bioimpedancia",
    "Entrenamiento de fuerza",
    "Salud metabólica",
    "Rutinas de gimnasio",
    "Preparación física",
    "Wellness Coach",
    "Vida saludable Loja"
  ],
  authors: [{ name: "Henry Castillo" }],
  creator: "Henry Castillo",
  publisher: "Henry Castillo Team",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://teamhenrycastillo.com",
    title: "Henry Castillo - Entrenador Personal en Loja | Resultados Reales",
    description: "Transforma tu cuerpo y mente con un enfoque científico. Entrenamiento presencial en Loja y asesoría online mundial.",
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
    description: "Entrenamiento inteligente y nutrición basada en ciencia. Empieza tu cambio hoy.",
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
  generator: 'Next.js',
  applicationName: 'Henry Castillo Fitness',
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://teamhenrycastillo.com/#person",
        "name": "Henry Castillo",
        "jobTitle": "Entrenador Personal y Coach Nutricional",
        "url": "https://teamhenrycastillo.com",
        "sameAs": ["https://www.instagram.com/henrycastillonarvaez"],
        "image": "https://teamhenrycastillo.com/images/seccion 1.webp",
        "knowsAbout": ["Entrenamiento de fuerza", "Nutrición deportiva", "Fisiología del ejercicio", "Biomecánica"]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://teamhenrycastillo.com/#business",
        "name": "Henry Castillo Team",
        "image": "https://teamhenrycastillo.com/Logo Henry.webp",
        "url": "https://teamhenrycastillo.com",
        "telephone": "+593986562727",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Loja",
          "addressRegion": "Loja",
          "addressCountry": "EC"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -3.99313,
          "longitude": -79.20422
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "06:00",
            "closes": "21:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/henrycastillonarvaez"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://teamhenrycastillo.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Por qué un Entrenador Personal me pide exámenes médicos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Como Entrenador Personal con enfoque integral, mi prioridad es tu seguridad. Los exámenes de colesterol, glucosa y triglicéridos me permiten conocer tu estado metabólico real. No entreno a ciegas; diseño tu plan para que el ejercicio sea una herramienta de mejora interna y no un riesgo para tu salud."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué es la Escala de Bristol y por qué la usamos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Es una herramienta visual para evaluar tu salud digestiva e intestinal. Un entrenamiento y una nutrición de élite no sirven de nada si tu cuerpo no absorbe los nutrientes correctamente. Monitorear esto nos ayuda a ajustar tu dieta para que tengas más energía y mejores resultados físicos."
            }
          },
          {
            "@type": "Question",
            "name": "¿Puedo entrenar Online si soy principiante?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para garantizar tu seguridad y una técnica impecable, recomiendo que los principiantes inicien de forma presencial en Loja. El servicio Online está reservado para atletas o personas con experiencia previa que ya dominan los movimientos básicos y buscan una programación científica a distancia."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cada cuánto tiempo se realizan las evaluaciones?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Realizamos un seguimiento de progreso cada 15 días (medidas, peso y sensaciones) para ajustar tu plan. Además, solicitamos nuevos exámenes médicos cada 3 meses para validar científicamente la mejora de tu funcionamiento interno."
            }
          },
          {
            "@type": "Question",
            "name": "¿El programa incluye asesoría médica?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Soy Entrenador Personal certificado, no médico. Sin embargo, mi protocolo de entrenamiento es integral y analítico. Esto significa que no solo diseñamos rutinas, sino que interpretamos tus marcadores de salud para personalizar tu nutrición y cargas de trabajo."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué incluye exactamente el plan de nutrición?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Incluye un cálculo preciso de tus necesidades calóricas y macronutrientes basado en tus objetivos y tus análisis de sangre. Utilizamos tecnología (MyFitnessPal) para que aprendas a comer de forma inteligente, flexible y sin restricciones innecesarias."
            }
          }
        ]
      }
    ]
  }

  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
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
