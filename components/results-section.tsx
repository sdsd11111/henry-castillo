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
    { name: "Cliente", before: "/images/galeria/antes.webp", after: "/images/galeria/despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 8" },
    { name: "Guille", before: "/images/galeria/guille-antes.webp", after: "/images/galeria/guille-despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 14" },
    { name: "Lara", before: "/images/galeria/lara-antes.webp", after: "/images/galeria/lara-despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 32" },
    { name: "Leo", before: "/images/galeria/leo-antes.webp", after: "/images/galeria/leo-despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 12" },
    { name: "Mateo", before: "/images/galeria/mateo-antes.webp", after: "/images/galeria/mateo-despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 10" },
    { name: "Migue", before: "/images/galeria/migue-antes.webp", after: "/images/galeria/migue-despues.webp", beforeLabel: "Semana 1", afterLabel: "Semana 27" },
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

function TransformationPair({ client, onSelect }: { client: typeof allClients[0], onSelect: () => void }) {
    return (
        <div className="flex flex-col">
            {/* Centered Title per Pair */}
            <div className="text-center mb-2">
                <h3 className="text-white font-bold text-sm md:text-xl tracking-wide">{client.name}</h3>
            </div>

            {/* Comparison (Lightbox Trigger) */}
            <div
                className="flex gap-0.5 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={onSelect}
            >
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
        </div>
    )
}

export function ResultsSection() {
    const [selectedClientName, setSelectedClientName] = useState<string | null>(null)

    const selectedClient = selectedClientName ? allClients.find(c => c.name === selectedClientName) : null

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

                {/* Dialog Controlled by Parent State */}
                <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClientName(null)}>
                    <DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
                        {selectedClient && (
                            <div key={selectedClient.name} className="flex flex-col md:flex-row h-[80vh] md:h-[600px]">
                                <DialogTitle className="sr-only">Transformación de {selectedClient.name}</DialogTitle>
                                <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
                                    <Image
                                        src={selectedClient.before}
                                        alt={`Antes ${selectedClient.name}`}
                                        fill
                                        className="object-contain bg-black"
                                    />
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-sm font-bold text-white uppercase">
                                        {selectedClient.beforeLabel}
                                    </div>
                                </div>
                                <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                                    <Image
                                        src={selectedClient.after}
                                        alt={`Despues ${selectedClient.name}`}
                                        fill
                                        className="object-contain bg-black"
                                    />
                                    <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded text-sm font-bold uppercase">
                                        {selectedClient.afterLabel}
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


                {/* MOBILE VIEW: 2 Items per Slide */}
                <div className="block md:hidden">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="">
                            {mobileClientGroups.map((group, groupIndex) => (
                                <CarouselItem key={groupIndex} className="basis-full px-4">
                                    <div className="grid grid-cols-1 gap-8">
                                        {group.map((client) => (
                                            <div key={client.name} className="flex flex-col">
                                                <div className="text-center mb-2">
                                                    <h3 className="text-white font-bold text-sm md:text-xl tracking-wide">{client.name}</h3>
                                                </div>
                                                <div
                                                    className="flex gap-0.5 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => setSelectedClientName(client.name)}
                                                >
                                                    <div className="relative w-1/2 aspect-[4/5] group overflow-hidden">
                                                        <Image
                                                            src={client.before}
                                                            alt={`Antes ${client.name}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-neutral-300 uppercase">
                                                            {client.beforeLabel}
                                                        </div>
                                                    </div>
                                                    <div className="relative w-1/2 aspect-[4/5] group overflow-hidden">
                                                        <Image
                                                            src={client.after}
                                                            alt={`Despues ${client.name}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-primary/90 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                                            {client.afterLabel}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="">
                            {desktopClientGroups.map((group, groupIndex) => (
                                <CarouselItem key={`desktop-group-${groupIndex}`} className="basis-full">
                                    <div className="grid grid-cols-3 gap-6 px-12">
                                        {group.map((client) => (
                                            <div key={`desktop-client-${client.name}`} className="flex flex-col relative group">
                                                <div className="text-center mb-3">
                                                    <h3 className="text-white font-bold text-xl tracking-wide">{client.name}</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="flex gap-1 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-primary/50 transition-all relative outline-none focus:ring-2 focus:ring-primary/50"
                                                    onClick={() => setSelectedClientName(client.name)}
                                                >
                                                    <div className="relative w-1/2 aspect-[4/5] overflow-hidden">
                                                        <Image
                                                            src={client.before}
                                                            alt={`Antes ${client.name}`}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-neutral-300 uppercase z-10">
                                                            {client.beforeLabel}
                                                        </div>
                                                    </div>
                                                    <div className="relative w-1/2 aspect-[4/5] overflow-hidden">
                                                        <Image
                                                            src={client.after}
                                                            alt={`Despues ${client.name}`}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-primary/90 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase z-10">
                                                            {client.afterLabel}
                                                        </div>
                                                    </div>
                                                    {/* Hint overlay */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center z-20">
                                                        <span className="bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                                            Ver Transformación
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
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
