"use client"

import { useState } from "react"
import { Star, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

const allClients = [
    // Group 1
    { name: "Carlos M.", before: "/images/502903707-4097245297213076-1836789078342719368-n.jpg", after: "/images/503891860-4098892280381711-848031671112462455-n.jpg" },
    { name: "Ana P.", before: "/images/513249579-4119168998354039-2382360676927873571-n.jpg", after: "/images/503984705-4097457117191894-5670764605460021442-n.jpg" },
    { name: "Jorge L.", before: "/images/503891860-4098892280381711-848031671112462455-n.jpg", after: "/images/513249579-4119168998354039-2382360676927873571-n.jpg" },
    { name: "Sofia R.", before: "/images/503984705-4097457117191894-5670764605460021442-n.jpg", after: "/images/502903707-4097245297213076-1836789078342719368-n.jpg" },
    { name: "Miguel A.", before: "/images/502903707-4097245297213076-1836789078342719368-n.jpg", after: "/images/503891860-4098892280381711-848031671112462455-n.jpg" },
    { name: "Lucia T.", before: "/images/513249579-4119168998354039-2382360676927873571-n.jpg", after: "/images/503984705-4097457117191894-5670764605460021442-n.jpg" },
    // Group 2
    { name: "Roberto S.", before: "/images/503891860-4098892280381711-848031671112462455-n.jpg", after: "/images/513249579-4119168998354039-2382360676927873571-n.jpg" },
    { name: "Elena G.", before: "/images/503984705-4097457117191894-5670764605460021442-n.jpg", after: "/images/502903707-4097245297213076-1836789078342719368-n.jpg" },
    { name: "David F.", before: "/images/502903707-4097245297213076-1836789078342719368-n.jpg", after: "/images/503891860-4098892280381711-848031671112462455-n.jpg" },
    { name: "Carmen H.", before: "/images/513249579-4119168998354039-2382360676927873571-n.jpg", after: "/images/503984705-4097457117191894-5670764605460021442-n.jpg" },
    { name: "Pablo N.", before: "/images/502903707-4097245297213076-1836789078342719368-n.jpg", after: "/images/503891860-4098892280381711-848031671112462455-n.jpg" },
    { name: "Laura B.", before: "/images/503984705-4097457117191894-5670764605460021442-n.jpg", after: "/images/502903707-4097245297213076-1836789078342719368-n.jpg" },
]

// Helper function to chunk array
function chunkArray<T>(array: T[], size: number): T[][] {
    const result = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}

const mobileClientGroups = chunkArray(allClients, 2)
const desktopClientGroups = chunkArray(allClients, 6)

const reviews = [
    {
        name: "Dagmar Gualotuña",
        role: "2 opiniones · 1 foto",
        text: "Henry es un excelente entrenador, mostrando desde un inicio su profesionalismo y motivación adaptando un plan de entrenamiento de acuerdo a mis necesidades y objetivos. Explica cada ejercicio con paciencia corrige la técnica y se asegura de que el entrenamiento sea seguro y efectivo. Además, transmite mucha energía positiva, lo que hace cada sesión motivadora. Gracias a su acompañamiento he notado avances significativos tanto en mi condición física como en mi confianza. Sin duda lo recomiendo.",
        stars: 5,
        date: "Hace 3 meses",
        link: "https://share.google/J6cZuNV06EQCKvj9d"
    },
    {
        name: "Geraldine Gualotuña",
        role: "2 opiniones",
        text: "Excelente entrenador, siempre considerando las necesidades individuales, priorizando tu bienestar y tu salud. Henry es una persona que adapta tus rutinas, y ejercicios de acuerdo a tus necesidades específicas. Considerando rango de movimientos y experiencia previa. Sin duda ha hecho mi experiencia del deporte y el gym más llevadera ⭐️",
        stars: 5,
        date: "Hace 3 meses",
        link: "https://share.google/G1gVLvjSfiTAuWd3W"
    },
    {
        name: "Mateo Japon",
        role: "1 opinión",
        text: "Excelente entrenador, siempre motiva y adapta las rutinas a mis necesidades. Profesional, puntual y con mucha energía positiva. 100% recomendado.👌",
        stars: 5,
        date: "Hace 3 meses",
        link: "https://share.google/0HGTcJqClAmGqalMJ"
    },
    {
        name: "Adriana Moncada",
        role: "1 opinión",
        text: "Excelente entrenador y gran profesional. El mejor entrenador de la ciudad",
        stars: 5,
        date: "Hace 3 meses",
        link: "https://share.google/f1h2Fo0bgbrslJCZJ"
    }
]

function ReviewCard({ review }: { review: typeof reviews[0] }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const shouldTruncate = review.text.length > 150

    return (
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg h-full transition-colors hover:bg-zinc-900/80">
            <CardContent className="p-6 flex flex-col h-full">
                <a href={review.link} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{review.name}</h4>
                                <p className="text-xs text-zinc-500">{review.role}</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-bold text-xs">G</span>
                        </div>
                    </div>
                    <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                </a>

                <div className="flex-grow">
                    <p className="text-zinc-300 text-sm leading-relaxed mb-1">
                        &quot;{isExpanded || !shouldTruncate ? review.text : `${review.text.slice(0, 150)}...`}&quot;
                    </p>
                    {shouldTruncate && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsExpanded(!isExpanded)
                            }}
                            className="text-primary text-xs font-bold hover:underline focus:outline-none"
                        >
                            {isExpanded ? "Leer menos" : "Leer más"}
                        </button>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                    <p className="text-zinc-600 text-xs">
                        {review.date}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function TransformationPair({ client }: { client: typeof allClients[0] }) {
    return (
        <div className="flex flex-col">
            {/* Centered Title per Pair */}
            <div className="text-center mb-2">
                <h3 className="text-white font-bold text-sm md:text-xl tracking-wide">{client.name}</h3>
            </div>

            {/* Comparison (Lightbox Trigger) */}
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex gap-0.5 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:opacity-90 transition-opacity">
                        {/* Before */}
                        <div className="relative w-1/2 aspect-[4/5] group overflow-hidden">
                            <Image
                                src={client.before}
                                alt={`Antes ${client.name}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-neutral-300 uppercase">
                                Antes
                            </div>
                        </div>

                        {/* After */}
                        <div className="relative w-1/2 aspect-[4/5] group overflow-hidden">
                            <Image
                                src={client.after}
                                alt={`Despues ${client.name}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-primary/90 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                Después
                            </div>
                        </div>
                        {/* Hint overlay */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Ver Completo</span>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
                    <DialogTitle className="sr-only">Transformación de {client.name}</DialogTitle>
                    <div className="flex gap-1 md:gap-2 p-4 h-[80vh]">
                        <div className="relative w-1/2 h-full rounded-lg overflow-hidden border border-zinc-800">
                            <Image
                                src={client.before}
                                alt={`Antes ${client.name}`}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-sm font-bold text-white uppercase">
                                Antes
                            </div>
                        </div>
                        <div className="relative w-1/2 h-full rounded-lg overflow-hidden border border-zinc-800">
                            <Image
                                src={client.after}
                                alt={`Despues ${client.name}`}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded text-sm font-bold uppercase">
                                Después
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export function ResultsSection() {
    return (
        <section className="py-24 bg-zinc-950" aria-labelledby="results-heading">
            {/* Header Container */}
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        Resultados y Experiencias
                    </span>
                    <h2 id="results-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Casos de Éxito: <span className="text-primary">Resultados Visibles</span>,<br className="hidden md:block" /> Salud Comprobada
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        No solo lo digo yo, lo dicen mis clientes. Desliza para ver las transformaciones físicas y lee las opiniones de quienes ya integraron la ciencia a su entrenamiento.
                    </p>
                </div>
            </div>

            {/* Gallery Grid - Full Width */}
            <div className="mb-20 w-full">

                {/* MOBILE VIEW: 2 Items per Slide */}
                <div className="block md:hidden">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="">
                            {mobileClientGroups.map((group, groupIndex) => (
                                <CarouselItem key={groupIndex} className="basis-full px-4">
                                    <div className="grid grid-cols-1 gap-8">
                                        {group.map((client, index) => (
                                            <TransformationPair key={index} client={client} />
                                        ))}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-4 mt-8">
                            <CarouselPrevious className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                            <CarouselNext className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                        </div>
                    </Carousel>
                </div>

                {/* DESKTOP VIEW: 6 Items per Slide (3x2 Grid) */}
                <div className="hidden md:block">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-1">
                            {desktopClientGroups.map((group, groupIndex) => (
                                <CarouselItem key={groupIndex} className="basis-full pl-1">
                                    <div className="grid grid-cols-3 gap-2 px-12">
                                        {group.map((client, index) => (
                                            <TransformationPair key={index} client={client} />
                                        ))}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-4 mt-8">
                            <CarouselPrevious className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                            <CarouselNext className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                        </div>
                    </Carousel>
                </div>

            </div>

            {/* Google Reviews Grid - Responsive Container */}
            <div className="container mx-auto px-4">
                <div className="max-w-[1400px] mx-auto"> {/* Increased width for 4 cols */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        <div className="flex -space-x-1">
                            {/* Google colors G logo mock for context */}
                            <span className="font-bold text-2xl text-white mr-2">Google</span>
                        </div>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                        <span className="text-white font-bold text-xl ml-2">5.0</span>
                    </div>

                    {/* MOGILE VIEW: Carousel */}
                    <div className="block lg:hidden mb-12">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {reviews.map((review, index) => (
                                    <CarouselItem key={index} className="pl-4 md:basis-1/2">
                                        <div className="h-full">
                                            <ReviewCard review={review} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center gap-4 mt-6">
                                <CarouselPrevious className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                                <CarouselNext className="static transform-none bg-zinc-800 border-zinc-700 text-white hover:bg-primary hover:text-black" />
                            </div>
                        </Carousel>
                    </div>

                    {/* DESKTOP VIEW: 4 Columns Grid */}
                    <div className="hidden lg:grid grid-cols-4 gap-4 mb-12">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>

                    {/* Google Button */}
                    <div className="flex justify-center">
                        <Button
                            asChild
                            variant="outline"
                            className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white group"
                        >
                            <a
                                href="https://www.google.com/search?sca_esv=34fb7e70802b3bda&rlz=1C1CHBF_esEC1095EC1095&sxsrf=AE3TifMW13gvgVFNmozDEnaolFtFZ7hflQ:1765587403938&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5FdYoBwfboABHQ6AUdgyQZJFXHNNmIIf3WJUQky_80m67RvjyF6FC64TZ7a1lNC2OyJ-gVC7H15WLBdZuQgZkNfFtaVhtim-FC_288F92WRwvD6hU3EgP0JI2lAy3Ium-Sg-7o%3D&q=Henry+Castillo+-+Entrenador+Personal+Opiniones&sa=X&ved=2ahUKEwjikaDQrbmRAxUbQjABHWlDJckQ0bkNegQISRAD&biw=1866&bih=1016&dpr=0.9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full text-black font-bold text-xs">G</span>
                                Ver todas las opiniones en Google
                                <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </div>

                </div>

            </div>
        </section>
    )
}
