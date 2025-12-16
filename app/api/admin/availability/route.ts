import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getWeeklyAvailability, updateWeeklyAvailability } from '@/lib/availability-settings'

export async function GET() {
    try {
        const settings = await getWeeklyAvailability()
        return NextResponse.json(settings)
    } catch (error) {
        console.error('Error fetching availability:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const isAuth = await isAdminAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const settings = await request.json()
        await updateWeeklyAvailability(settings)

        return NextResponse.json({ success: true, settings })
    } catch (error) {
        console.error('Error updating availability:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
