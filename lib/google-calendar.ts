import { google, calendar_v3 } from "googleapis"
import { CALENDAR } from "./constants"

/**
 * Inicializar cliente OAuth2 para Google Calendar
 */
function getOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    )

    // Para uso de servidor, no necesitamos tokens de usuario
    // La API Key se usará para acceso público de solo lectura si es necesario
    return oauth2Client
}

/**
 * Obtiene los eventos del calendario para un rango de fechas
 */
export async function getCalendarEvents(startDate: Date, endDate: Date) {
    try {
        const calendar = google.calendar({
            version: "v3",
            auth: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
        })

        const response = await calendar.events.list({
            calendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            timeZone: CALENDAR.timeZone,
        })

        return response.data.items || []
    } catch (error) {
        console.error("Error fetching calendar events:", error)
        throw new Error("No se pudieron obtener los eventos del calendario")
    }
}

/**
 * Obtiene los slots disponibles para una fecha específica
 */
export async function getAvailableSlots(date: Date) {
    const dayStart = new Date(date)
    dayStart.setHours(CALENDAR.workingHours.start, 0, 0, 0)

    const dayEnd = new Date(date)
    dayEnd.setHours(CALENDAR.workingHours.end, 0, 0, 0)

    // Obtener eventos del día
    const events = await getCalendarEvents(dayStart, dayEnd)

    // Generar todos los slots posibles del día
    const allSlots: Date[] = []
    let currentSlot = new Date(dayStart)

    while (currentSlot < dayEnd) {
        allSlots.push(new Date(currentSlot))
        currentSlot.setMinutes(currentSlot.getMinutes() + CALENDAR.slotDuration)
    }

    // Filtrar slots que están ocupados
    const availableSlots = allSlots.filter((slot) => {
        const slotEnd = new Date(slot)
        slotEnd.setMinutes(slotEnd.getMinutes() + CALENDAR.evaluationDuration)

        // Verificar si el slot se superpone con algún evento existente
        const isOccupied = events.some((event: calendar_v3.Schema$Event) => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false

            const eventStart = new Date(event.start.dateTime)
            const eventEnd = new Date(event.end.dateTime)

            // Hay superposición si el slot comienza antes de que termine el evento
            // Y termina después de que comience el evento
            return slot < eventEnd && slotEnd > eventStart
        })

        return !isOccupied
    })

    return availableSlots
}

/**
 * Verifica si un slot específico está disponible
 */
export async function checkSlotAvailability(dateTime: Date): Promise<boolean> {
    const slotEnd = new Date(dateTime)
    slotEnd.setMinutes(slotEnd.getMinutes() + CALENDAR.evaluationDuration)

    const events = await getCalendarEvents(dateTime, slotEnd)

    // El slot está disponible si no hay eventos en ese rango
    return events.length === 0
}

/**
 * Crea un evento de evaluación gratuita en el calendario
 */
export async function createEvaluationEvent(data: {
    name: string
    email: string
    dateTime: Date
    notes?: string
}) {
    try {
        const calendar = google.calendar({
            version: "v3",
            auth: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
        })

        const endTime = new Date(data.dateTime)
        endTime.setMinutes(endTime.getMinutes() + CALENDAR.evaluationDuration)

        const event: calendar_v3.Schema$Event = {
            summary: `Evaluación Gratuita - ${data.name}`,
            description: `Evaluación gratuita\n\nNombre: ${data.name}\nEmail: ${data.email}${data.notes ? `\n\nNotas: ${data.notes}` : ""
                }`,
            start: {
                dateTime: data.dateTime.toISOString(),
                timeZone: CALENDAR.timeZone,
            },
            end: {
                dateTime: endTime.toISOString(),
                timeZone: CALENDAR.timeZone,
            },
            attendees: [{ email: data.email }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 }, // 1 día antes
                    { method: "popup", minutes: 60 }, // 1 hora antes
                ],
            },
        }

        const response = await calendar.events.insert({
            calendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
            requestBody: event,
            sendUpdates: "all", // Enviar notificaciones por email
        })

        return response.data
    } catch (error) {
        console.error("Error creating calendar event:", error)
        throw new Error("No se pudo crear el evento en el calendario")
    }
}
