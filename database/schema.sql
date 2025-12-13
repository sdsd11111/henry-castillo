-- Tabla para almacenar citas/evaluaciones
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    edad INT,
    ocupacion VARCHAR(255),
    objetivo TEXT,
    motivacion TEXT,
    obstaculos TEXT,
    intentos_previos TEXT,
    experiencia_entrenador TEXT,
    inversion VARCHAR(50),
    estado ENUM('confirmado', 'cancelado', 'completado') DEFAULT 'confirmado',
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_appointment (fecha, hora)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para mejorar rendimiento de consultas
CREATE INDEX idx_fecha ON appointments(fecha);
CREATE INDEX idx_estado ON appointments(estado);
CREATE INDEX idx_email ON appointments(email);
