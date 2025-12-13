import { NextResponse } from "next/server"
import { createAppointment, checkSlotAvailability } from "@/lib/appointments"
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email"
import { CONTACT } from "@/lib/constants"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            nombre,
            email,
            telefono,
            edad,
            ocupacion,
            cambioPrincipal,
            porQueImportante,
            queTeHaImpedido,
            queHasIntentado,
            experienciaEntrenador,
            inversion,
            dateTime,
        } = body

        // Validar datos requeridos
        if (!nombre || !email || !dateTime) {
            return NextResponse.json(
                { error: "Faltan datos requeridos: nombre, email, dateTime" },
                { status: 400 }
            )
        }

        const requestedDateTime = new Date(dateTime)

        // Validar que la fecha no sea en el pasado
        const now = new Date()
        if (requestedDateTime < now) {
            return NextResponse.json(
                { error: "No se pueden crear citas en el pasado" },
                { status: 400 }
            )
        }

        // Verificar disponibilidad
        const isAvailable = await checkSlotAvailability(requestedDateTime)

        if (!isAvailable) {
            return NextResponse.json(
                { error: "Este horario ya no está disponible" },
                { status: 409 }
            )
        }

        // Crear cita en la base de datos
        const appointment = await createAppointment({
            fecha: requestedDateTime,
            hora: requestedDateTime,
            nombre,
            email,
            telefono,
            edad,
            ocupacion,
            objetivo: cambioPrincipal,
            motivacion: porQueImportante,
            obstaculos: queTeHaImpedido,
            intentos_previos: queHasIntentado,
            experiencia_entrenador: experienciaEntrenador,
            inversion,
        })

        // Link de Google Meet (puedes usar uno fijo o generar dinámico)
        // Por ahora usamos uno fijo - puedes cambiarlo después
        const meetLink = process.env.GOOGLE_MEET_LINK || "https://meet.google.com/new"

        // Formatear fecha y hora para los emails
        const fechaFormateada = format(requestedDateTime, "EEEE, d 'de' MMMM 'de' yyyy", {
            locale: es,
        })
        const horaFormateada = format(requestedDateTime, "HH:mm", { locale: es })

        // Enviar emails de confirmación
        try {
            await Promise.all([
                sendConfirmationEmail({
                    nombre,
                    email,
                    fecha: fechaFormateada,
                    hora: horaFormateada,
                    meetLink,
                }),
                sendAdminNotification({
                    nombre,
                    email,
                    telefono,
                    fecha: fechaFormateada,
                    hora: horaFormateada,
                    objetivo: cambioPrincipal,
                    meetLink,
                }),
            ])
        } catch (emailError) {
            console.error("Error sending emails:", emailError)
            // No fallar la reserva si el email falla
        }

        return NextResponse.json({
            success: true,
            message: "Evaluación agendada exitosamente",
            appointment: {
                id: appointment.id,
                fecha: appointment.fecha,
                hora: appointment.hora,
                meetLink,
            },
        })
    } catch (error) {
        console.error("Error booking evaluation:", error)
        return NextResponse.json(
            {
                error: "Error al agendar evaluación",
                message: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        )
    }
}
