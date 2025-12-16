"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function NewsletterForm() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        console.log("Form submitted")
        toast.success("¡Gracias por suscribirte!")

        setIsLoading(false)
            ; (event.target as HTMLFormElement).reset()
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-xl">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        id="name"
                        placeholder="Nombre"
                        required
                        className="bg-white/80 border-white/20 focus:bg-white text-black placeholder:text-gray-500 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Tu mejor correo electrónico"
                        required
                        className="bg-white/80 border-white/20 focus:bg-white text-black placeholder:text-gray-500 h-12"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required className="border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <Label htmlFor="terms" className="text-sm text-white/90 font-light cursor-pointer">
                        Acepto la política de privacidad*
                    </Label>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-wider"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        "ME APUNTO"
                    )}
                </Button>
            </form>
        </div>
    )
}
