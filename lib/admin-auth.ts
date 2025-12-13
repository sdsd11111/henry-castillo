import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'henry-fitness-secret-key-change-in-production'
)

/**
 * Verifica las credenciales de admin
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
    const validUsername = process.env.ADMIN_USERNAME || 'TeamHenryCastillo'
    const validPassword = process.env.ADMIN_PASSWORD || 'Contraseña123.'

    return username === validUsername && password === validPassword
}

/**
 * Crea un token JWT para la sesión del admin
 */
export async function createAdminToken() {
    const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret)

    return token
}

/**
 * Verifica un token JWT
 */
export async function verifyAdminToken(token: string) {
    try {
        const verified = await jwtVerify(token, secret)
        return verified.payload
    } catch (error) {
        return null
    }
}

/**
 * Establece la cookie de sesión del admin
 */
export async function setAdminSession() {
    const token = await createAdminToken()
    const cookieStore = await cookies()

    cookieStore.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    })
}

/**
 * Verifica si el usuario actual está autenticado como admin
 */
export async function isAdminAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')

    if (!token) {
        return false
    }

    const payload = await verifyAdminToken(token.value)
    return payload !== null && payload.role === 'admin'
}

/**
 * Cierra la sesión del admin
 */
export async function clearAdminSession() {
    const cookieStore = await cookies()
    cookieStore.delete('admin-token')
}
