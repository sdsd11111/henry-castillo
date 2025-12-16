import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(request: Request) {
    try {
        const { name, email } = await request.json()

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Nombre y email son requeridos' },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Tu correo no es válido. Por favor verifica el formato.' },
                { status: 400 }
            )
        }

        // 1. Ensure table exists (Automatic migration for simplicity)
        await query(`
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        // 2. Insert subscriber
        try {
            await query(
                'INSERT INTO newsletter_subscribers (name, email) VALUES (?, ?)',
                [name, email]
            )
        } catch (error: any) {
            // Handle duplicate entry
            if (error.code === 'ER_DUP_ENTRY') {
                return NextResponse.json(
                    { error: 'Este correo ya está suscrito' },
                    { status: 409 }
                )
            }
            throw error
        }

        return NextResponse.json(
            { message: 'Suscripción exitosa' },
            { status: 201 }
        )

    } catch (error) {
        console.error('Newsletter error:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
