const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOptimizedCopies() {
    const jobs = [
        { src: 'public/og-image.webp', dest: 'public/og-image-opt.webp', width: 1200 },
        { src: 'public/images/hero-movil.webp', dest: 'public/images/hero-movil-opt.webp', width: 828 }
    ];

    for (const job of jobs) {
        try {
            if (fs.existsSync(job.src)) {
                await sharp(job.src)
                    .resize({ width: job.width })
                    .webp({ quality: 80 })
                    .toFile(job.dest);

                const oldSize = fs.statSync(job.src).size;
                const newSize = fs.statSync(job.dest).size;
                console.log(`Created ${job.dest}:`);
                console.log(`Size: ${(newSize / 1024).toFixed(2)} KB (vs ${(oldSize / 1024).toFixed(2)} KB)`);
            } else {
                console.log(`Source missing: ${job.src}`);
            }
        } catch (e) {
            console.error(`Error processing ${job.src}: ${e.message}`);
        }
    }
}

createOptimizedCopies();
