import { NextResponse } from 'next/server'
import { clearAdminSession } from '@/lib/admin-auth'

export async function POST() {
    try {
        await clearAdminSession()

        return NextResponse.json({
            success: true,
            message: 'Logout exitoso',
        })
    } catch (error) {
        console.error('Error in admin logout:', error)
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        )
    }
}
