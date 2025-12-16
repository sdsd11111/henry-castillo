import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getAllAppointments, getAppointmentsByMonth, cancelAppointment, deleteAppointment } from '@/lib/admin-appointments'

// GET - Obtener citas
export async function GET(request: Request) {
    try {
        // Verificar autenticación
        const isAuth = await isAdminAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const year = searchParams.get('year')
        const month = searchParams.get('month')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const estado = searchParams.get('estado')

        // Si se pide resumen mensual
        if (year && month) {
            const appointments = await getAppointmentsByMonth(
                parseInt(year),
                parseInt(month)
            )
            return NextResponse.json({ appointments })
        }

        // Todas las citas con filtros opcionales
        const appointments = await getAllAppointments({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            estado: estado || undefined,
        })

        return NextResponse.json({ appointments })
    } catch (error) {
        console.error('Error getting appointments:', error)
        return NextResponse.json(
            { error: 'Error al obtener citas' },
            { status: 500 }
        )
    }
}

// PATCH - Cancelar cita
export async function PATCH(request: Request) {
    try {
        // Verificar autenticación
        const isAuth = await isAdminAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
        }

        const result = await cancelAppointment(id)

        return NextResponse.json({
            success: true,
            message: 'Cita cancelada exitosamente',
            id: result.id,
        })
    } catch (error) {
        console.error('Error canceling appointment:', error)
        return NextResponse.json(
            { error: 'Error al cancelar cita' },
            { status: 500 }
        )
    }
}

// PUT - Actualizar cita (reagendar)
export async function PUT(request: Request) {
    try {
        const isAuth = await isAdminAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { id, fecha, hora } = await request.json()

        if (!id || !fecha || !hora) {
            return NextResponse.json({ error: 'Faltan datos requeridos (id, fecha, hora)' }, { status: 400 })
        }

        // Importación dinámica para evitar conflictos circulares si los hubiera
        const { updateAppointment } = await import('@/lib/admin-appointments')

        // fecha viene como YYYY-MM-DD
        // hora viene como ISO string completo o HH:mm... 
        // Normalmente convertimos Date a string HH:mm:ss.
        // Si el frontend envía ISO string para fecha y hora:
        // Necesitamos asegurar formato MySQL.

        // Simple validación/transformación si es necesario:
        const cleanFecha = fecha.split('T')[0]
        const cleanHora = hora.includes('T') ? new Date(hora).toLocaleTimeString('es-EC', { hour12: false }) : hora

        const result = await updateAppointment(id, cleanFecha, cleanHora)

        return NextResponse.json({
            success: true,
            message: 'Cita actualizada exitosamente',
            appointment: result
        })
    } catch (error) {
        console.error('Error updating appointment:', error)
        return NextResponse.json(
            { error: 'Error al actualizar cita' },
            { status: 500 }
        )
    }
}

// DELETE - Eliminar cita permanentemente
export async function DELETE(request: Request) {
    try {
        // Verificar autenticación
        const isAuth = await isAdminAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
        }

        const result = await deleteAppointment(parseInt(id))

        return NextResponse.json({
            success: true,
            message: 'Cita eliminada permanentemente',
            id: result.id,
        })
    } catch (error) {
        console.error('Error deleting appointment:', error)
        return NextResponse.json(
            { error: 'Error al eliminar cita' },
            { status: 500 }
        )
    }
}
