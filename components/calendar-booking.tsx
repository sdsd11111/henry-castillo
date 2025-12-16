"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react"
import { formatSlotTime } from "@/lib/date-utils"

interface CalendarBookingProps {
    onDateTimeSelected: (dateTime: Date) => void
    selectedDateTime?: Date | null
    minNoticeHours?: number
}

export function CalendarBooking({ onDateTimeSelected, selectedDateTime, minNoticeHours = 24 }: CalendarBookingProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(selectedDateTime || undefined)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [availableSlots, setAvailableSlots] = useState<Date[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Cargar slots disponibles cuando se selecciona una fecha
    useEffect(() => {
        if (selectedDate) {
            loadAvailableSlots(selectedDate)
        } else {
            setAvailableSlots([])
            setSelectedTime(null)
        }
    }, [selectedDate])

    const loadAvailableSlots = async (date: Date) => {
        setLoading(true)
        setError(null)
        setSelectedTime(null)

        try {
            const response = await fetch("/api/calendar/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date.toISOString() }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Error al cargar disponibilidad")
            }

            const slots = data.slots.map((slot: string) => new Date(slot))

            // Filter slots to enforce 24h advance notice
            const now = new Date()
            const minimumDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // Now + 24h

            const validSlots = slots.filter((slot: Date) => slot >= minimumDate)

            setAvailableSlots(validSlots)

            if (validSlots.length === 0) {
                setError("No hay horarios disponibles para esta fecha (mínimo 24h de anticipación)")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar horarios")
            setAvailableSlots([])
        } finally {
            setLoading(false)
        }
    }

    const handleTimeSelect = (slot: Date) => {
        setSelectedTime(slot.toISOString())
        onDateTimeSelected(slot)
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
        <div className="space-y-6">
            {/* Selector de Fecha */}
            <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Selecciona la fecha para tu evaluación
                </Label>
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                            const tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(0, 0, 0, 0)
                            return date < tomorrow || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        }}
                        locale={es}
                        className="rounded-md border"
                    />
                </div>
                {selectedDate && (
                    <p className="text-sm text-center text-muted-foreground">
                        {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                )}
            </div>

            {/* Selector de Hora */}
            {selectedDate && (
                <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Selecciona la hora
                    </Label>

                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <span className="ml-2 text-sm text-muted-foreground">Cargando horarios disponibles...</span>
                        </div>
                    )}

                    {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {!loading && !error && availableSlots.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2">
                            {availableSlots.map((slot) => {
                                const slotTime = slot.toISOString()
                                const isSelected = selectedTime === slotTime

                                return (
                                    <Button
                                        key={slotTime}
                                        type="button"
                                        variant={isSelected ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTimeSelect(slot)}
                                        className={`${isSelected
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-primary/10 hover:text-primary"
                                            }`}
                                    >
                                        {formatSlotTime(slot)}
                                    </Button>
                                )
                            })}
                        </div>
                    )}

                    {!loading && availableSlots.length === 0 && selectedDate && !error && (
                        <p className="text-sm text-center text-muted-foreground py-4">
                            No hay horarios disponibles para esta fecha. Por favor selecciona otra fecha.
                        </p>
                    )}
                </div>
            )}

            {/* Resumen de la selección */}
            {selectedDate && selectedTime && (
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-center">
                        Tu evaluación está agendada para:
                    </p>
                    <p className="text-center font-bold text-lg mt-1">
                        {format(new Date(selectedTime), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                    <p className="text-center font-bold text-xl text-primary">
                        {formatSlotTime(new Date(selectedTime))}
                    </p>
                </div>
            )}
        </div>
    )
}
