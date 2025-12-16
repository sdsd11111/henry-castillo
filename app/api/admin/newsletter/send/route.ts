import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import nodemailer from 'nodemailer'

// Reusing the transporter config logic from lib/email.ts
// Ideally we should export 'transporter' from lib/email.ts, but to avoid touching that file excessively I'll recreate it locally or update lib/email.ts.
// Let's configure it here to ensure it works with the specific .env variables.

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.teamhenrycastillo.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const subject = formData.get("subject") as string
        const message = formData.get("message") as string
        const files = formData.getAll("files") as File[]

        if (!subject || !message) {
            return NextResponse.json(
                { error: 'Asunto y mensaje son requeridos' },
                { status: 400 }
            )
        }

        // Process attachments
        const attachments = []
        if (files && files.length > 0) {
            for (const file of files) {
                if (file.size > 0) {
                    const arrayBuffer = await file.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer)
                    attachments.push({
                        filename: file.name,
                        content: buffer,
                        contentType: file.type || 'application/octet-stream' // Optional but good practice
                    })
                }
            }
        }

        // 1. Get all subscribers
        const subscribers: any = await query('SELECT email FROM newsletter_subscribers')

        if (!Array.isArray(subscribers) || subscribers.length === 0) {
            return NextResponse.json(
                { error: 'No hay suscriptores para enviar correos' },
                { status: 400 }
            )
        }

        // 2. Prepare emails
        let sentCount = 0
        let errors = 0

        const emailPromises = subscribers.map(async (sub: any) => {
            try {
                await transporter.sendMail({
                    from: `"Henry Castillo" <${process.env.EMAIL_USER}>`,
                    to: sub.email,
                    subject: subject,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            ${message}
                            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                            <small style="color: #999;">Recibes esto porque te suscribiste al newsletter de Henry Castillo.</small>
                        </div>
                    `,
                    attachments: attachments // Add attachments here
                })
                return true
            } catch (err) {
                console.error(`Failed to send to ${sub.email}`, err)
                return false
            }
        })

        const results = await Promise.all(emailPromises)
        sentCount = results.filter(Boolean).length
        errors = results.length - sentCount

        return NextResponse.json({
            message: `Enviado a ${sentCount} suscriptores. ${errors > 0 ? `${errors} fallos.` : ''}`,
            sentCount,
            errors
        })

    } catch (error) {
        console.error('Newsletter send error:', error)
        return NextResponse.json(
            { error: 'Error al enviar el newsletter' },
            { status: 500 }
        )
    }
}
