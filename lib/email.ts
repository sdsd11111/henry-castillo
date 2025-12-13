import nodemailer from 'nodemailer'

// Configurar transporter de nodemailer con cPanel
const transporter = nodemailer.createTransport({
  host: 'smtp.teamhenrycastillo.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

/**
 * Envía email de confirmación al usuario con link de Google Meet
 */
export async function sendConfirmationEmail(data: {
  nombre: string
  email: string
  fecha: string
  hora: string
  meetLink: string
}) {
  const mailOptions = {
    from: `"Henry Castillo - Entrenador Personal" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `✅ Evaluación Gratuita Confirmada - ${data.fecha}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
          .meet-button { display: inline-block; background: #0F9D58; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .meet-button:hover { background: #0b7a44; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .calendar-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="calendar-icon">📅</div>
            <h1>¡Tu Evaluación está Confirmada!</h1>
          </div>
          
          <div class="content">
            <p>Hola <strong>${data.nombre}</strong>,</p>
            
            <p>¡Excelente noticia! Tu evaluación gratuita con Henry Castillo ha sido confirmada.</p>
            
            <div class="info-box">
              <h3 style="margin-top: 0; color: #667eea;">📍 Detalles de tu cita:</h3>
              <p><strong>📅 Fecha:</strong> ${data.fecha}</p>
              <p><strong>🕐 Hora:</strong> ${data.hora}</p>
              <p><strong>⏱️ Duración:</strong> 45 minutos</p>
            </div>
            
            <h3 style="color: #667eea;">🎥 Link de la Reunión Virtual:</h3>
            <p>Únete a la videollamada en Google Meet:</p>
            <a href="${data.meetLink}" class="meet-button">🔗 Unirse a Google Meet</a>
            
            <p style="font-size: 12px; color: #666;">O copia este link: <br>${data.meetLink}</p>
            
            <div class="info-box" style="background: #fff3cd; border-left-color: #ffc107;">
              <h4 style="margin-top: 0;">⏰ Recordatorios:</h4>
              <ul>
                <li>Asegúrate de tener buena conexión a internet</li>
                <li>Prepara tus preguntas y objetivos</li>
                <li>Únete 2-3 minutos antes</li>
                <li>Ten a mano papel y lápiz para tomar notas</li>
              </ul>
            </div>
            
            <h3 style="color: #667eea;">¿Necesitas reagendar?</h3>
            <p>Si por algún motivo no puedes asistir, contáctame por WhatsApp: <a href="https://wa.me/593986562727">+593 98 656 2727</a></p>
          </div>
          
          <div class="footer">
            <p><strong>Henry Castillo</strong> - Entrenador Personal & Online</p>
            <p>📱 +593 98 656 2727 | 📧 cristhopheryeah113@gmail.com</p>
            <p style="font-size: 12px; color: #999;">Este email fue enviado automáticamente. Por favor no respondas directamente.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hola ${data.nombre},

¡Tu evaluación gratuita está confirmada!

DETALLES:
Fecha: ${data.fecha}
Hora: ${data.hora}
Duración: 45 minutos

LINK DE GOOGLE MEET:
${data.meetLink}

Únete a la reunión 2-3 minutos antes.

¿Necesitas reagendar? WhatsApp: +593 98 656 2727

--
Henry Castillo - Entrenador Personal
    `,
  }

  await transporter.sendMail(mailOptions)
}

/**
 * Envía notificación a Henry (ti) sobre la nueva cita
 */
export async function sendAdminNotification(data: {
  nombre: string
  email: string
  telefono?: string
  fecha: string
  hora: string
  objetivo?: string
  meetLink: string
}) {
  const mailOptions = {
    from: `"Sistema de Citas" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Tu email
    subject: `🔔 Nueva Evaluación Agendada - ${data.nombre}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c3e50; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #ecf0f1; padding: 20px; border-radius: 0 0 5px 5px; }
          .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #3498db; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 Nueva Cita Agendada</h2>
          </div>
          <div class="content">
            <div class="info">
              <h3>Información del Cliente:</h3>
              <p><strong>Nombre:</strong> ${data.nombre}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.telefono ? `<p><strong>Teléfono:</strong> ${data.telefono}</p>` : ''}
            </div>
            
            <div class="info">
              <h3>Detalles de la Cita:</h3>
              <p><strong>Fecha:</strong> ${data.fecha}</p>
              <p><strong>Hora:</strong> ${data.hora}</p>
              <p><strong>Google Meet:</strong> <a href="${data.meetLink}">${data.meetLink}</a></p>
            </div>
            
            ${data.objetivo ? `
            <div class="info">
              <h3>Objetivo del Cliente:</h3>
              <p>${data.objetivo}</p>
            </div>
            ` : ''}
            
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #bdc3c7;">
              <small>Email enviado automáticamente por el sistema de reservas.</small>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}
