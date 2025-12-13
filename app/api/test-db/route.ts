import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
    try {
        // Test 1: Database connection
        const dbTest = await query('SELECT 1 as test')

        // Test 2: Check appointments table exists
        const tableCheck = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = ? 
      AND table_name = 'appointments'
    `, [process.env.MYSQL_DATABASE])

        // Test 3: Try to query appointments
        const appointmentsCheck = await query('SELECT COUNT(*) as count FROM appointments')

        return NextResponse.json({
            success: true,
            tests: {
                databaseConnection: dbTest ? 'OK' : 'FAILED',
                appointmentsTableExists: tableCheck[0].count > 0 ? 'OK' : 'NOT FOUND',
                canQueryAppointments: appointmentsCheck ? 'OK' : 'FAILED',
                appointmentsCount: appointmentsCheck[0]?.count || 0,
            },
            config: {
                host: process.env.MYSQL_HOST,
                database: process.env.MYSQL_DATABASE,
                user: process.env.MYSQL_USER,
            },
            message: 'All tests passed! Database is ready.',
        })
    } catch (error) {
        console.error('Database test error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                config: {
                    host: process.env.MYSQL_HOST,
                    database: process.env.MYSQL_DATABASE,
                    user: process.env.MYSQL_USER,
                },
            },
            { status: 500 }
        )
    }
}
