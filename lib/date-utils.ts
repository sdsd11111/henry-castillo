import { CALENDAR } from "./constants"

/**
 * Formatea una fecha para mostrar en la UI (solo hora)
 */
export function formatSlotTime(date: Date): string {
    return new Intl.DateTimeFormat("es-EC", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: CALENDAR.timeZone,
    }).format(date)
}

/**
 * Formatea una fecha completa
 */
export function formatFullDate(date: Date): string {
    return new Intl.DateTimeFormat("es-EC", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: CALENDAR.timeZone,
    }).format(date)
}
