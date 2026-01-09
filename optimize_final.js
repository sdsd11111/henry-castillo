const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeSeccion1() {
    const file = 'public/images/seccion 1.webp';

    if (fs.existsSync(file)) {
        console.log(`Processing ${file}...`);
        const temp = file + '.temp';

        try {
            await sharp(file)
                .resize({ width: 800 })
                .webp({ quality: 80 })
                .toFile(temp);

            // Robust replace
            try {
                fs.copyFileSync(temp, file);
                fs.unlinkSync(temp);
                const size = fs.statSync(file).size / 1024;
                console.log(`Success! New size: ${size.toFixed(2)} KB`);
            } catch (copyErr) {
                console.error(`Copy failed: ${copyErr.message}`);
            }

        } catch (e) {
            console.error(`Optimization failed: ${e.message}`);
        }
    } else {
        console.error(`File not found: ${file}`);
    }

    // Cleanup others
    ['public/og-image-opt.webp', 'public/images/hero-movil-opt.webp'].forEach(f => {
        if (fs.existsSync(f)) {
            try {
                fs.unlinkSync(f);
                console.log(`Cleaned up ${f}`);
            } catch (e) { }
        }
    });
}

optimizeSeccion1();
