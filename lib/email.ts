import nodemailer from 'nodemailer'

// Configurar transporter de nodemailer con cPanel
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.teamhenrycastillo.com',
  port: Number(process.env.SMTP_PORT) || 465,
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
  edad?: number
  ocupacion?: string
  objetivo?: string
  motivacion?: string
  obstaculos?: string
  intentos_previos?: string
  experiencia_entrenador?: string
  inversion?: string
  fecha: string
  hora: string
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
          body { font-family: Arial, sans-serif; line-height: 1.5; color: #333; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
          .header { background: #1a1a1a; color: white; padding: 25px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { padding: 25px; background: #ffffff; }
          .section-title { font-size: 18px; font-weight: bold; color: #ff3333; border-bottom: 2px solid #ff3333; margin-top: 25px; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
          .info-item { background: #f9f9f9; padding: 12px; border-radius: 6px; border-left: 3px solid #ddd; }
          .label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; }
          .value { font-size: 15px; margin-top: 4px; font-weight: 500; }
          .full-width { grid-column: span 2; }
          .link-box { background: #eef2ff; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px; border: 1px dashed #6366f1; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Nueva Evaluación Agendada</h1>
            <p style="margin:5px 0 0 0; opacity:0.8;">Tienes una nueva cita para evaluación gratuita</p>
          </div>
          
          <div class="content">
            <div class="section-title">Información del Cliente</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Nombre</div>
                <div class="value">${data.nombre}</div>
              </div>
              <div class="info-item">
                <div class="label">Edad</div>
                <div class="value">${data.edad || 'No especificada'}</div>
              </div>
              <div class="info-item">
                <div class="label">Email</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="info-item">
                <div class="label">Ocupación</div>
                <div class="value">${data.ocupacion || 'No especificada'}</div>
              </div>
            </div>

            <div class="section-title">Detalles de la Cita</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Fecha</div>
                <div class="value">${data.fecha}</div>
              </div>
              <div class="info-item">
                <div class="label">Hora</div>
                <div class="value">${data.hora}</div>
              </div>
            </div>
            
            <div class="link-box">
              <div class="label">Link de la Reunión</div>
              <a href="${data.meetLink}" style="color:#6366f1; font-weight:bold; text-decoration:none; font-size:16px;">${data.meetLink}</a>
            </div>

            <div class="section-title">Respuestas del Formulario</div>
            <div class="info-grid">
              <div class="info-item full-width">
                <div class="label">Objetivo Principal</div>
                <div class="value">${data.objetivo || 'N/A'}</div>
              </div>
              <div class="info-item full-width">
                <div class="label">¿Por qué es importante?</div>
                <div class="value">${data.motivacion || 'N/A'}</div>
              </div>
              <div class="info-item full-width">
                <div class="label">¿Qué le ha impedido conseguirlo?</div>
                <div class="value">${data.obstaculos || 'N/A'}</div>
              </div>
              <div class="info-item full-width">
                <div class="label">Intentos previos</div>
                <div class="value">${data.intentos_previos || 'N/A'}</div>
              </div>
              <div class="info-item full-width">
                <div class="label">Experiencia con entrenador</div>
                <div class="value">${data.experiencia_entrenador || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="label">Inversión mensual cómoda</div>
                <div class="value">${data.inversion || 'N/A'}</div>
              </div>
            </div>
            
            <div class="footer">
              Este es un mensaje generado automáticamente por el sistema de reservas.
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}
