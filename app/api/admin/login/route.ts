import { NextResponse } from 'next/server'
import { verifyAdminCredentials, setAdminSession } from '@/lib/admin-auth'

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Usuario y contraseña requeridos' },
                { status: 400 }
            )
        }

        const isValid = verifyAdminCredentials(username, password)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        // Crear sesión
        await setAdminSession()

        return NextResponse.json({
            success: true,
            message: 'Login exitoso',
        })
    } catch (error) {
        console.error('Error in admin login:', error)
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        )
    }
}
