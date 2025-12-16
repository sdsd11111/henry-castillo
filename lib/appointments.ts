import { CALENDAR } from "./constants"
import { query } from "./db"

interface Appointment {
    id: number
    fecha: string
    hora: string
    nombre: string
    email: string
    estado: string
}

/**
 * Obtiene las citas reservadas para una fecha específica
 */
export async function getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    const dateStr = date.toISOString().split('T')[0] // YYYY-MM-DD

    const sql = `
    SELECT id, fecha, hora, nombre, email, estado
    FROM appointments
    WHERE fecha = ? AND estado = 'confirmado'
    ORDER BY hora ASC
  `

    const results = await query(sql, [dateStr]) as Appointment[]
    return results
}

/**
 * Obtiene los slots disponibles para una fecha específica
 */
/**
 * Obtiene los slots disponibles para una fecha específica
 */
import { WEEKLY_AVAILABILITY } from "@/lib/constants" // Fallback if needed, but we use DB
import { getWeeklyAvailability, AvailabilitySettings } from "./availability-settings"

/**
 * Obtiene los slots disponibles para una fecha específica
 */
export async function getAvailableSlots(date: Date): Promise<Date[]> {
    // Usar UTC para evitar problemas de zona horaria del servidor
    const dayStart = new Date(date)
    // Reiniciar a medianoche UTC
    dayStart.setUTCHours(0, 0, 0, 0) // Esto es 00:00 UTC.

    // Get dynamic settings
    const settings = await getWeeklyAvailability()

    // Map day index (0=Sunday) to settings key
    const days: (keyof AvailabilitySettings)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayIndex = dayStart.getUTCDay() // UTC Day might differ from local day if offset shifts date? 
    // Wait, `date` coming in is usually created as UTC string from frontend? 
    // Frontend sends `date.toISOString()`.
    // If I pick "Dec 16", frontend sends "2023-12-16T00:00:00.000Z" (if purely date).
    // `dayIndex` 0 is Sunday.

    // ADJUSTMENT: We want the day of week in ECUADOR time.
    // UTC 00:00 is Ecuador 19:00 previous day.
    // So we should shift by offset before getting day.
    const offset = 5 // UTC-5
    // But `getUTCDay()` on 00:00 UTC will be the date we expect (e.g. 16th).
    // Wait, 00:00 UTC on 16th IS 19:00 on 15th in Ecuador.
    // So "Monday 16th" in Calendar matches "Monday 16th" in JS Date? 
    // Yes, because usually we work with local dates in frontend.
    // If frontend sends "2025-12-16T00:00:00.000Z", meant as "Start of Dec 16th".
    // We treat it as THE day. 
    // So `dayStart.getUTCDay()` returns the correct day of week index for that date.

    const dayKey = days[dayStart.getUTCDay()]
    const dayConfig = settings[dayKey]

    if (!dayConfig.enabled) {
        return []
    }

    const { start, end } = dayConfig

    // Obtener citas reservadas del día
    // La base de datos guarda la hora local ("09:00:00")
    const appointments = await getAppointmentsByDate(date)
    const reservedHours = new Set(
        appointments.map((apt) => apt.hora.substring(0, 5)) // "09:00"
    )

    // Generar todos los slots posibles (cada 1 hora)
    const allSlots: Date[] = []

    // Iterar desde hora inicio hasta hora fin
    for (let hour = start; hour < end; hour++) {
        const slot = new Date(dayStart)
        // Establecer la hora UTC: Hora Local (hour) + 5 = UTC
        // Example: 9 AM Local => 14 PM UTC.
        slot.setUTCHours(hour + offset, 0, 0, 0)

        // Obtener la hora formateada en tiempo de Ecuador para comparar con la DB
        const hourString = slot.toLocaleTimeString("es-EC", {
            timeZone: CALENDAR.timeZone,
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        })

        // Solo agregar si NO está reservado
        if (!reservedHours.has(hourString)) {
            allSlots.push(slot)
        }
    }

    return allSlots
}

/**
 * Verifica si un slot específico está disponible
 */
export async function checkSlotAvailability(dateTime: Date): Promise<boolean> {
    const dateStr = dateTime.toISOString().split('T')[0]

    // Convertir el Date (que puede ser UTC) a la hora string local de Ecuador para la DB
    const timeStr = dateTime.toLocaleTimeString("es-EC", {
        timeZone: CALENDAR.timeZone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }) // "09:00:00"

    const sql = `
    SELECT COUNT(*) as count
    FROM appointments
    WHERE fecha = ? AND hora = ? AND estado = 'confirmado'
  `

    const results = await query(sql, [dateStr, timeStr]) as any[]
    return results[0].count === 0
}

/**
 * Crea una nueva cita
 */
export async function createAppointment(data: {
    fecha: Date
    hora: Date
    nombre: string
    email: string
    telefono?: string
    edad?: number
    ocupacion?: string
    objetivo?: string
    motivacion?: string
    obstaculos?: string
    intentos_previos?: string
    experiencia_entrenador?: string
    inversion?: string
    notas?: string
}) {
    const dateStr = data.fecha.toISOString().split('T')[0]

    // Convertir el Date a hora local string para guardar en DB
    const timeStr = data.hora.toLocaleTimeString("es-EC", {
        timeZone: CALENDAR.timeZone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }) // "09:00:00" (Para 14:00 UTC guardará 09:00:00)

    const sql = `
    INSERT INTO appointments (
      fecha, hora, nombre, email, telefono, edad, ocupacion,
      objetivo, motivacion, obstaculos, intentos_previos,
      experiencia_entrenador, inversion, notas, estado
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmado')
  `

    const params = [
        dateStr,
        timeStr,
        data.nombre,
        data.email,
        data.telefono || null,
        data.edad || null,
        data.ocupacion || null,
        data.objetivo || null,
        data.motivacion || null,
        data.obstaculos || null,
        data.intentos_previos || null,
        data.experiencia_entrenador || null,
        data.inversion || null,
        data.notas || null,
    ]

    const result = await query(sql, params) as any
    return {
        id: result.insertId,
        fecha: dateStr,
        hora: timeStr,
    }
}
