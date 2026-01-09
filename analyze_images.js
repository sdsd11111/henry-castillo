const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function check() {
    const files = ['public/og-image.webp', 'public/images/hero-movil.webp'];

    for (const f of files) {
        if (fs.existsSync(f)) {
            const meta = await sharp(f).metadata();
            const stats = fs.statSync(f);
            console.log(`File: ${f}`);
            console.log(`Dimensions: ${meta.width}x${meta.height}`);
            console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB`);
            console.log('---');
        } else {
            console.log(`File not found: ${f}`);
        }
    }
}

check();
