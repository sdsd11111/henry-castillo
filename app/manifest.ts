import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Henry Castillo - Entrenador Personal',
        short_name: 'Henry Castillo',
        description: 'Entrenamiento personal integral en Loja, Ecuador.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
            {
                src: '/images/logo-cuadrado.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/logo-cuadrado.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
