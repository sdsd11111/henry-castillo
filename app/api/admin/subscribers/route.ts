import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
    try {
        // Fetch all subscribers ordered by newest first
        const subscribers = await query(
            'SELECT * FROM newsletter_subscribers ORDER BY created_at DESC'
        )

        return NextResponse.json({ subscribers })
    } catch (error) {
        console.error('Error fetching subscribers:', error)
        return NextResponse.json(
            { error: 'Error al cargar suscriptores' },
            { status: 500 }
        )
    }
}
