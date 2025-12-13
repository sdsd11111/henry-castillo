import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
    const config = {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        connectTimeout: 10000, // 10 seconds
    }

    console.log('Trying to connect with config:', {
        host: config.host,
        port: config.port,
        user: config.user,
        database: config.database,
    })

    try {
        const connection = await mysql.createConnection(config)

        const [rows] = await connection.execute('SELECT 1 as test')

        await connection.end()

        return NextResponse.json({
            success: true,
            message: '✅ Conexión exitosa!',
            config: {
                host: config.host,
                port: config.port,
                user: config.user,
                database: config.database,
            },
            testResult: rows,
        })
    } catch (error: any) {
        console.error('Connection error:', error)

        return NextResponse.json({
            success: false,
            error: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            config: {
                host: config.host,
                port: config.port,
                user: config.user,
                database: config.database,
            },
            troubleshooting: {
                ETIMEDOUT: 'El servidor no responde. Verifica que el puerto esté abierto y que hayas agregado % en Remote MySQL.',
                ECONNREFUSED: 'La conexión fue rechazada. Verifica host y puerto.',
                ER_ACCESS_DENIED_ERROR: 'Usuario o contraseña incorrectos.',
            }
        }, { status: 500 })
    }
}
