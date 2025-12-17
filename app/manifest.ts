import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Henry Castillo - Entrenador Personal',
        short_name: 'Henry Castillo',
        description: 'Entrenamiento personal científico e integral en Loja, Ecuador.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon-light-32x32.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/Logo Henry.webp',
                sizes: '192x192',
                type: 'image/webp',
            },
            {
                src: '/Logo Henry.webp',
                sizes: '512x512',
                type: 'image/webp',
            },
        ],
    }
}
