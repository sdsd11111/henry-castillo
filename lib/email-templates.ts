import { SITE, CONTACT } from './constants'

interface NewsletterTemplateProps {
    message: string
    subject: string
}

export const getNewsletterTemplate = ({ message, subject }: NewsletterTemplateProps) => {
    // Asegurar que las URLs sean absolutas
    const logoUrl = `${SITE.url}/images/logo-cuadrado.png`

    // Iconos hospedados o usar imagen estática si es posible. 
    // Para emails, SVG a veces da problemas, mejor PNG si se tiene o CDN.
    // Usaremos texto con estilo o iconos simples por ahora si no tenemos URLs de iconos de redes garantizadas.
    // Pero trataremos de usar algunos públicos genéricos o texto estilizado.

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        /* Reset para clientes de correo */
        body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important; margin: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
    </style>
</head>
<body style="background-color: #f4f4f4; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <div style="background-color: #f4f4f4; padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header con Logo -->
            <tr>
                <td align="center" style="padding: 40px 0; background-color: #1a1a1a;">
                    <a href="${SITE.url}" target="_blank" style="text-decoration: none;">
                        <img src="${logoUrl}" alt="${SITE.name}" width="120" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">
                    </a>
                </td>
            </tr>

            <!-- Contenido Principal -->
            <tr>
                <td style="padding: 40px 30px; color: #333333; font-size: 16px; line-height: 1.8;">
                    <h1 style="margin: 0 0 25px; font-size: 24px; font-weight: bold; color: #1a1a1a; text-align: center;">${subject}</h1>
                    
                    <div style="color: #4a4a4a; white-space: pre-line; font-size: 16px;">
                        ${message}
                    </div>
                </td>
            </tr>

            <!-- Banner Promocional / Footer -->
            <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eeeeee;">
                    <a href="${SITE.url}" target="_blank" style="text-decoration: none; color: inherit;">
                        <p style="margin: 0 0 5px; font-weight: bold; color: #1a1a1a; font-size: 18px;">Henry Castillo</p>
                        <p style="margin: 0 0 20px; color: #666666; font-size: 14px;">Entrenador Personal & Online</p>
                    </a>
                    
                    <!-- Redes Sociales con Iconos -->
                    <table border="0" cellpadding="0" cellspacing="0" align="center">
                        <tr>
                            <td style="padding: 0 10px;">
                                <a href="${CONTACT.instagram}" target="_blank" style="text-decoration: none;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="32" height="32" style="display: block;">
                                </a>
                            </td>
                            <td style="padding: 0 10px;">
                                <a href="https://www.facebook.com/henry.castillo.90475?locale=es_LA" target="_blank" style="text-decoration: none;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="32" height="32" style="display: block;">
                                </a>
                            </td>
                            <td style="padding: 0 10px;">
                                <a href="${CONTACT.whatsappLink}" target="_blank" style="text-decoration: none;">
                                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="32" height="32" style="display: block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Legal Footer -->
            <tr>
                <td style="background-color: #1a1a1a; padding: 20px 30px; text-align: center; color: #888888; font-size: 12px; line-height: 1.5;">
                    <p style="margin: 0;">Loja, Ecuador</p>
                    <p style="margin: 10px 0 0;">
                        Estás recibiendo este correo porque te suscribiste a nuestro newsletter.<br>
                        Si no deseas recibir más correos, por favor responde a este mensaje.
                    </p>
                    <p style="margin: 10px 0 0;">© ${new Date().getFullYear()} ${SITE.name}. Todos los derechos reservados.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`
}
