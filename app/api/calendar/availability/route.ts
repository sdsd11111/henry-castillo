import { NextResponse } from "next/server"
import { getAvailableSlots } from "@/lib/appointments"

export async function POST(request: Request) {
    try {
        const { date } = await request.json()

        if (!date) {
            return NextResponse.json({ error: "Fecha requerida" }, { status: 400 })
        }

        const requestedDate = new Date(date)

        // Validar que la fecha no sea en el pasado
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (requestedDate < today) {
            return NextResponse.json(
                { error: "No se pueden consultar fechas pasadas" },
                { status: 400 }
            )
        }

        const availableSlots = await getAvailableSlots(requestedDate)

        return NextResponse.json({
            success: true,
            date: requestedDate.toISOString(),
            slots: availableSlots.map((slot) => slot.toISOString()),
            count: availableSlots.length,
        })
    } catch (error) {
        console.error("Error getting availability:", error)
        return NextResponse.json(
            {
                error: "Error al obtener disponibilidad",
                message: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        )
    }
}
