import mysql from 'mysql2/promise'

// Configuración de conexión a MySQL
const dbConfig = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

// Pool de conexiones para mejor rendimiento
let pool: mysql.Pool | null = null

export function getDbPool() {
    if (!pool) {
        pool = mysql.createPool(dbConfig)
    }
    return pool
}

// Función helper para ejecutar queries
export async function query(sql: string, params?: any[]) {
    const pool = getDbPool()
    const [results] = await pool.execute(sql, params)
    return results
}

// Cerrar pool (útil para testing)
export async function closePool() {
    if (pool) {
        await pool.end()
        pool = null
    }
}
