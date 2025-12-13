import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from '@/lib/email'

export async function GET() {
    try {
        // Enviar email de prueba
        await sendConfirmationEmail({
            nombre: 'Prueba de Sistema',
            email: process.env.EMAIL_USER || 'test@example.com',
            fecha: 'Jueves, 19 de diciembre de 2025',
            hora: '10:00',
            meetLink: process.env.GOOGLE_MEET_LINK || 'https://meet.google.com/test',
        })

        return NextResponse.json({
            success: true,
            message: `Email de prueba enviado exitosamente a ${process.env.EMAIL_USER}`,
            config: {
                emailUser: process.env.EMAIL_USER,
                smtpHost: 'smtp.teamhenrycastillo.com',
                smtpPort: 465,
            },
        })
    } catch (error) {
        console.error('Email test error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                details: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        )
    }
}
