const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function forceOptimize() {
    // 1. Define Overwrites
    const replacements = [
        { target: 'public/og-image.webp', optimized: 'public/og-image-opt.webp' },
        { target: 'public/images/hero-movil.webp', optimized: 'public/images/hero-movil-opt.webp' }
    ];

    for (const rep of replacements) {
        if (fs.existsSync(rep.optimized) && fs.existsSync(rep.target)) {
            console.log(`Overwriting ${rep.target} with ${rep.optimized}...`);
            try {
                // Copy optimized content to target
                fs.copyFileSync(rep.optimized, rep.target);
                console.log(`Success! ${rep.target} is now ${fs.statSync(rep.target).size / 1024} KB`);
            } catch (e) {
                console.error(`Failed to overwrite ${rep.target}: ${e.message}`);
            }
        } else {
            console.log(`Skipping ${rep.target} (Optimized file not found or target missing)`);
        }
    }

    // 2. New Optimization: seccion 1.webp
    // Report says: 1081x1440 displayed at 887x887. 
    // We can resize to 800px width.
    const sec1 = 'public/images/seccion 1.webp';
    if (fs.existsSync(sec1)) {
        console.log(`Optimizing ${sec1}...`);
        const temp = sec1 + '.temp';
        try {
            await sharp(sec1)
                .resize({ width: 800 })
                .webp({ quality: 80 })
                .toFile(temp);

            fs.copyFileSync(temp, sec1);
            fs.unlinkSync(temp);
            console.log(`Success! ${sec1} resized.`);
        } catch (e) {
            console.error(`Failed to optimize ${sec1}: ${e.message}`);
        }
    }
}

forceOptimize();
