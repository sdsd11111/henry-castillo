"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Calendar as CalendarIcon, Clock, Mail, User, Phone, Target, Ban, Loader2, List, Trash2, RefreshCcw, Settings } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { AvailabilityForm } from "@/components/admin/availability-form"
import { CalendarBooking } from "@/components/calendar-booking"

interface Appointment {
    id: number
    fecha: string
    hora: string
    nombre: string
    email: string
    telefono?: string
    edad?: number
    ocupacion?: string
    objetivo?: string
    motivacion?: string
    estado: string
    created_at: string
}

export default function AdminDashboardPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [dayAppointments, setDayAppointments] = useState<Appointment[]>([])
    const [daysWithAppointments, setDaysWithAppointments] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)
    const [canceling, setCanceling] = useState<number | null>(null)
    const [deleting, setDeleting] = useState<number | null>(null)
    const [showAllAppointments, setShowAllAppointments] = useState(false)
    const [rescheduling, setRescheduling] = useState<Appointment | null>(null)
    const [newDate, setNewDate] = useState<Date | null>(null)
    const [isSavingReschedule, setIsSavingReschedule] = useState(false)

    const router = useRouter()

    // Cargar todas las citas
    useEffect(() => {
        loadAppointments()
    }, [])

    // Filtrar citas del día seleccionado
    useEffect(() => {
        if (selectedDate && appointments.length > 0) {
            // Normalizar fecha seleccionada a formato YYYY-MM-DD
            const dateStr = format(selectedDate, "yyyy-MM-dd")

            const filtered = appointments.filter((apt) => {
                // Normalizar la fecha de la cita
                // MySQL devuelve fechas como "2025-12-18T00:00:00.000Z" o "2025-12-18"
                const aptDateStr = apt.fecha.split('T')[0] // Tomar solo la parte de fecha
                return aptDateStr === dateStr
            })

            setDayAppointments(filtered.sort((a, b) => a.hora.localeCompare(b.hora)))
        } else {
            setDayAppointments([])
        }
    }, [selectedDate, appointments])

    const loadAppointments = async () => {
        try {
            const response = await fetch("/api/admin/appointments")

            if (!response.ok) {
                if (response.status === 401) {
                    router.push("/admin/login")
                    return
                }
                throw new Error("Error al cargar citas")
            }

            const data = await response.json()
            setAppointments(data.appointments)

            // Crear set de fechas con citas (normalizadas)
            const dates = new Set<string>(
                data.appointments
                    .filter((apt: Appointment) => apt.estado !== "cancelado")
                    .map((apt: Appointment) => apt.fecha.split('T')[0])
            )
            setDaysWithAppointments(dates)
        } catch (error) {
            console.error("Error loading appointments:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelAppointment = async (id: number) => {
        if (!confirm("¿Estás seguro de que quieres cancelar esta cita?")) {
            return
        }

        setCanceling(id)
        try {
            const response = await fetch("/api/admin/appointments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })

            if (!response.ok) {
                throw new Error("Error al cancelar cita")
            }

            // Recargar citas
            await loadAppointments()
        } catch (error) {
            console.error("Error canceling appointment:", error)
            alert("Error al cancelar la cita")
        } finally {
            setCanceling(null)
        }
    }

    const handleDeleteAppointment = async (id: number) => {
        if (!confirm("⚠️ ATENCIÓN: ¿Estás seguro de que quieres ELIMINAR PERMANENTEMENTE esta cita? Esta acción NO se puede deshacer.")) {
            return
        }

        setDeleting(id)
        try {
            const response = await fetch(`/api/admin/appointments?id=${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Error al eliminar cita")
            }

            // Recargar citas
            await loadAppointments()
        } catch (error) {
            console.error("Error deleting appointment:", error)
            alert("Error al eliminar la cita")
        } finally {
            setDeleting(null)
        }
    }

    const handleReschedule = async () => {
        if (!rescheduling || !newDate) return

        setIsSavingReschedule(true)
        try {
            const fecha = format(newDate, "yyyy-MM-dd")
            const hora = format(newDate, "HH:mm:ss")

            const response = await fetch("/api/admin/appointments", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: rescheduling.id,
                    fecha,
                    hora
                }),
            })

            if (!response.ok) throw new Error("Error al reagendar")

            await loadAppointments()
            setRescheduling(null)
            setNewDate(null)
            alert("Cita reagendada exitosamente")
        } catch (error) {
            console.error(error)
            alert("Error al reagendar la cita")
        } finally {
            setIsSavingReschedule(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" })
            router.push("/admin/login")
        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    const handleGoToAppointmentDate = (fecha: string) => {
        const date = parseISO(fecha.split('T')[0])
        setSelectedDate(date)
        setShowAllAppointments(false)
    }

    const modifiers = {
        booked: (date: Date) => {
            const dateStr = format(date, "yyyy-MM-dd")
            return daysWithAppointments.has(dateStr)
        },
    }

    const modifiersClassNames = {
        booked: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-bold",
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Panel de Administración</h1>
                        <p className="text-sm text-muted-foreground">Henry Fitness - Gestión de Citas</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Tabs defaultValue="citas" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="citas" className="flex gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Gestión de Citas
                        </TabsTrigger>
                        <TabsTrigger value="config" className="flex gap-2">
                            <Settings className="h-4 w-4" />
                            Configuración
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="config">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración de Disponibilidad</CardTitle>
                                <CardDescription>Define tu horario de trabajo semanal para las evaluaciones.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AvailabilityForm />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="citas" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Calendario */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5" />
                                        Calendario de Citas
                                    </CardTitle>
                                    <CardDescription>
                                        Los días marcados tienen citas agendadas
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        locale={es}
                                        modifiers={modifiers}
                                        modifiersClassNames={modifiersClassNames}
                                        className="rounded-md border"
                                    />
                                </CardContent>
                            </Card>

                            {/* Lista de citas del día */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {selectedDate
                                            ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })
                                            : "Selecciona una fecha"}
                                    </CardTitle>
                                    <CardDescription>
                                        {dayAppointments.length} cita(s) para este día
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {dayAppointments.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>No hay citas para este día</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                            {dayAppointments.map((apt) => (
                                                <Card
                                                    key={apt.id}
                                                    className={apt.estado === "cancelado" ? "opacity-50" : ""}
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <Clock className="h-4 w-4 text-primary" />
                                                                    <span className="font-bold text-lg">
                                                                        {apt.hora.substring(0, 5)}
                                                                    </span>
                                                                    <Badge variant={apt.estado === "cancelado" ? "destructive" : "default"}>
                                                                        {apt.estado}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm mt-1">
                                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                                    <span className="font-medium">{apt.nombre}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 flex-wrap">
                                                                {apt.estado === "confirmado" && (
                                                                    <>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                setRescheduling(apt)
                                                                                setNewDate(null)
                                                                            }}
                                                                        >
                                                                            <RefreshCcw className="h-4 w-4 mr-1" />
                                                                            Reagendar
                                                                        </Button>
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            onClick={() => handleCancelAppointment(apt.id)}
                                                                            disabled={canceling === apt.id || deleting === apt.id}
                                                                        >
                                                                            {canceling === apt.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4 mr-1" />}
                                                                            Cancelar
                                                                        </Button>
                                                                    </>
                                                                )}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteAppointment(apt.id)}
                                                                    disabled={deleting === apt.id || canceling === apt.id}
                                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                >
                                                                    {deleting === apt.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1 text-sm pl-6 border-l-2 border-primary/20">
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                                <a href={`mailto:${apt.email}`} className="text-blue-600 hover:underline">
                                                                    {apt.email}
                                                                </a>
                                                            </div>

                                                            {apt.telefono && (
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                                    <span>{apt.telefono}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <Card
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => setShowAllAppointments(true)}
                            >
                                <CardHeader className="pb-3">
                                    <CardDescription className="flex items-center justify-between">
                                        Total de Citas
                                        <List className="h-4 w-4" />
                                    </CardDescription>
                                    <CardTitle className="text-3xl">{appointments.length}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardDescription>Confirmadas</CardDescription>
                                    <CardTitle className="text-3xl text-green-600">
                                        {appointments.filter((a) => a.estado === "confirmado").length}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardDescription>Canceladas</CardDescription>
                                    <CardTitle className="text-3xl text-red-600">
                                        {appointments.filter((a) => a.estado === "cancelado").length}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Modal de Todas las Citas */}
            <Dialog open={showAllAppointments} onOpenChange={setShowAllAppointments}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Todas las Citas</DialogTitle>
                        <DialogDescription>
                            Haz clic en una cita para ir a ese día en el calendario
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        {appointments.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No hay citas registradas</p>
                            </div>
                        ) : (
                            appointments
                                .sort((a, b) => {
                                    const dateCompare = b.fecha.localeCompare(a.fecha)
                                    if (dateCompare !== 0) return dateCompare
                                    return b.hora.localeCompare(a.hora)
                                })
                                .map((apt) => (
                                    <Card
                                        key={apt.id}
                                        className={`cursor-pointer hover:shadow-md transition-shadow ${apt.estado === "cancelado" ? "opacity-50" : ""
                                            }`}
                                        onClick={() => handleGoToAppointmentDate(apt.fecha)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarIcon className="h-4 w-4 text-primary" />
                                                            <span className="font-semibold">
                                                                {format(parseISO(apt.fecha.split('T')[0]), "d MMM yyyy", { locale: es })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-primary" />
                                                            <span className="font-semibold">
                                                                {apt.hora.substring(0, 5)}
                                                            </span>
                                                        </div>
                                                        <Badge variant={apt.estado === "cancelado" ? "destructive" : "default"}>
                                                            {apt.estado}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{apt.nombre}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal de Reagendar */}
            <Dialog open={!!rescheduling} onOpenChange={(open) => !open && setRescheduling(null)}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Reagendar Cita</DialogTitle>
                        <DialogDescription>
                            Selecciona la nueva fecha y hora para la cita de {rescheduling?.nombre}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <CalendarBooking
                            selectedDateTime={newDate}
                            onDateTimeSelected={setNewDate}
                            minNoticeHours={0} // Admin can reschedule without 24h constraint
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setRescheduling(null)}>Cancelar</Button>
                        <Button onClick={handleReschedule} disabled={!newDate || isSavingReschedule}>
                            {isSavingReschedule && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                            Confirmar Cambio
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
