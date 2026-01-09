import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Unoptimized maps to false by default, enabling the Image Optimization API.
    // unoptimized: false, 
  },
  compress: true, // Enable Gzip/Brotli compression
  experimental: {},
}

export default nextConfig
