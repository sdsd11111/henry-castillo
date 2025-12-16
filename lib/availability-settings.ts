import { query } from "./db"
import { CALENDAR } from "./constants"

export interface AvailabilitySettings {
    monday: { start: number; end: number; enabled: boolean }
    tuesday: { start: number; end: number; enabled: boolean }
    wednesday: { start: number; end: number; enabled: boolean }
    thursday: { start: number; end: number; enabled: boolean }
    friday: { start: number; end: number; enabled: boolean }
    saturday: { start: number; end: number; enabled: boolean }
    sunday: { start: number; end: number; enabled: boolean }
}

const DEFAULT_SETTINGS: AvailabilitySettings = {
    monday: { start: CALENDAR.workingHours.start, end: CALENDAR.workingHours.end, enabled: true },
    tuesday: { start: CALENDAR.workingHours.start, end: CALENDAR.workingHours.end, enabled: true },
    wednesday: { start: CALENDAR.workingHours.start, end: CALENDAR.workingHours.end, enabled: true },
    thursday: { start: CALENDAR.workingHours.start, end: CALENDAR.workingHours.end, enabled: true },
    friday: { start: CALENDAR.workingHours.start, end: CALENDAR.workingHours.end, enabled: true },
    saturday: { start: 9, end: 13, enabled: false },
    sunday: { start: 9, end: 13, enabled: false },
}

async function ensureTableExists() {
    const sql = `
    CREATE TABLE IF NOT EXISTS availability_settings (
        id INT PRIMARY KEY DEFAULT 1,
        settings JSON NOT NULL
    )
  `
    await query(sql)
}

export async function getWeeklyAvailability(): Promise<AvailabilitySettings> {
    await ensureTableExists()

    const sql = `SELECT settings FROM availability_settings WHERE id = 1`
    const results = await query(sql) as any[]

    if (results.length > 0) {
        return JSON.parse(results[0].settings)
    }

    // Insert default if not exists
    await updateWeeklyAvailability(DEFAULT_SETTINGS)
    return DEFAULT_SETTINGS
}

export async function updateWeeklyAvailability(settings: AvailabilitySettings) {
    await ensureTableExists()

    const sql = `
    INSERT INTO availability_settings (id, settings) 
    VALUES (1, ?) 
    ON DUPLICATE KEY UPDATE settings = ?
  `
    const jsonSettings = JSON.stringify(settings)
    await query(sql, [jsonSettings, jsonSettings])

    return settings
}
