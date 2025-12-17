import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4 text-center space-y-8">
            <div className="space-y-4">
                <h1 className="text-8xl font-black text-primary animate-pulse">404</h1>
                <h2 className="text-2xl md:text-4xl font-bold">Página no encontrada</h2>
                <p className="text-neutral-400 max-w-lg mx-auto">
                    Parece que te has perdido en el camino. Al igual que en el entrenamiento, a veces hay que recalcular la ruta para llegar a la meta.
                </p>
            </div>

            <Button asChild className="bg-primary text-black hover:bg-primary/90 font-bold px-8 py-6 rounded-full text-lg">
                <Link href="/">
                    Volver al Inicio
                </Link>
            </Button>
        </div>
    )
}
