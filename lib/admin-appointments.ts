import { query } from "./db"

/**
 * Obtiene todas las citas con filtros opcionales
 */
export async function getAllAppointments(filters?: {
  startDate?: string
  endDate?: string
  estado?: string
}) {
  let sql = `
    SELECT id, fecha, hora, nombre, email, telefono, edad, ocupacion,
           objetivo, motivacion, estado, created_at
    FROM appointments
    WHERE 1=1
  `
  const params: any[] = []

  if (filters?.startDate) {
    sql += ` AND fecha >= ?`
    params.push(filters.startDate)
  }

  if (filters?.endDate) {
    sql += ` AND fecha <= ?`
    params.push(filters.endDate)
  }

  if (filters?.estado) {
    sql += ` AND estado = ?`
    params.push(filters.estado)
  }

  sql += ` ORDER BY fecha DESC, hora DESC`

  const results = await query(sql, params)
  return results as any[]
}

/**
 * Obtiene las citas de un mes específico
 */
export async function getAppointmentsByMonth(year: number, month: number) {
  // month is 1-indexed (1 = January, 12 = December)
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`

  // Calculate last day of month
  const lastDay = new Date(year, month, 0).getDate()
  const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`

  const sql = `
    SELECT DATE(fecha) as date, COUNT(*) as count
    FROM appointments
    WHERE fecha >= ? AND fecha <= ?
      AND estado != 'cancelado'
    GROUP BY DATE(fecha)
  `

  const results = await query(sql, [startDate, endDate])
  return results as { date: string; count: number }[]
}

/**
 * Cancela una cita (cambia estado a 'cancelado')
 */
export async function cancelAppointment(id: number) {
  const sql = `
    UPDATE appointments
    SET estado = 'cancelado'
    WHERE id = ?
  `

  await query(sql, [id])
  return { success: true, id }
}

/**
 * Obtiene una cita por ID
 */
export async function getAppointmentById(id: number) {
  const sql = `
    SELECT * FROM appointments WHERE id = ?
  `

  const results = await query(sql, [id]) as any[]
  return results[0] || null
}

/**
 * Elimina permanentemente una cita de la base de datos
 */
export async function deleteAppointment(id: number) {
  const sql = `
    DELETE FROM appointments WHERE id = ?
  `

  await query(sql, [id])
  return { id }
}
