const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimize() {
    const tasks = [
        {
            input: 'public/og-image.webp',
            width: 1200,
            quality: 80
        },
        {
            input: 'public/images/hero-movil.webp',
            width: 828,
            quality: 80
        }
    ];

    for (const task of tasks) {
        if (fs.existsSync(task.input)) {
            const backup = task.input + '.bak';
            const tempOutput = task.input + '.temp';

            // 1. Create Backup (if safe)
            if (!fs.existsSync(backup)) {
                try {
                    fs.copyFileSync(task.input, backup);
                    console.log(`Backed up ${task.input}`);
                } catch (e) {
                    console.error(`Failed to backup ${task.input}: ${e.message}`);
                    continue;
                }
            }

            // 2. Process to Temp
            console.log(`Optimizing ${task.input}...`);
            try {
                await sharp(task.input)
                    .resize({ width: task.width })
                    .webp({ quality: task.quality })
                    .toFile(tempOutput);
            } catch (e) {
                console.error(`Sharp optimization failed: ${e.message}`);
                continue;
            }

            // 3. Replace Original with Retry Logic
            let retries = 3;
            while (retries > 0) {
                try {
                    // Try to copy temp to original (overwriting)
                    // fs.copyFileSync is sometimes more robust than rename on locked files if the lock is weak shared read
                    // But unlink + rename is standard. 
                    // Let's try copyFileSync first, it truncates and writes.
                    fs.copyFileSync(tempOutput, task.input);

                    // If successful, delete temp
                    fs.unlinkSync(tempOutput);

                    console.log(`Successfully optimized ${task.input}`);
                    break;
                } catch (e) {
                    console.error(`Attempt failed (${retries} left): ${e.message}`);
                    retries--;
                    await new Promise(r => setTimeout(r, 1000)); // Wait 1s
                }
            }

            if (retries === 0) {
                console.error(`CRITICAL: Could not replace ${task.input}. File might be locked by Next.js server.`);
            } else {
                // Success stats
                const oldSize = fs.statSync(backup).size;
                const newSize = fs.statSync(task.input).size;
                console.log(`Old Size: ${(oldSize / 1024).toFixed(2)} KB`);
                console.log(`New Size: ${(newSize / 1024).toFixed(2)} KB`);
                console.log(`Reduction: ${((1 - newSize / oldSize) * 100).toFixed(2)}%`);
            }
            console.log('---');

        } else {
            console.log(`File not found: ${task.input}`);
        }
    }
}

optimize();
