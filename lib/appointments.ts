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
export async function getAvailableSlots(date: Date): Promise<Date[]> {
    const dayStart = new Date(date)
    dayStart.setHours(CALENDAR.workingHours.start, 0, 0, 0)

    const dayEnd = new Date(date)
    dayEnd.setHours(CALENDAR.workingHours.end, 0, 0, 0)

    // Obtener citas reservadas del día
    const appointments = await getAppointmentsByDate(date)
    const reservedHours = new Set(
        appointments.map((apt) => apt.hora.substring(0, 5)) // "14:00:00" -> "14:00"
    )

    // Generar todos los slots posibles (cada 1 hora)
    const allSlots: Date[] = []
    let currentSlot = new Date(dayStart)

    while (currentSlot < dayEnd) {
        const hourMinute = currentSlot.toTimeString().substring(0, 5) // "14:00"

        // Solo agregar si NO está reservado
        if (!reservedHours.has(hourMinute)) {
            allSlots.push(new Date(currentSlot))
        }

        // Avanzar 1 hora
        currentSlot.setHours(currentSlot.getHours() + 1)
    }

    return allSlots
}

/**
 * Verifica si un slot específico está disponible
 */
export async function checkSlotAvailability(dateTime: Date): Promise<boolean> {
    const dateStr = dateTime.toISOString().split('T')[0]
    const timeStr = dateTime.toTimeString().substring(0, 5) + ':00' // "14:00:00"

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
    const timeStr = data.hora.toTimeString().substring(0, 8) // "14:00:00"

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
