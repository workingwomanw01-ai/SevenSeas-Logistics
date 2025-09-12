const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOpenGraphImage() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'Elite.png');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image.png');
  
  try {
    // Check if Sharp is available
    if (!sharp) {
      console.log('Sharp not available. Copying original Elite.png as og-image.png');
      fs.copyFileSync(inputPath, outputPath);
      console.log('✅ Created og-image.png by copying Elite.png');
      return;
    }
    
    // Create optimized Open Graph image
    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .png({
        quality: 80,
        compressionLevel: 6
      })
      .toFile(outputPath);
    
    // Check file size
    const stats = fs.statSync(outputPath);
    console.log(`✅ Created og-image.png (${Math.round(stats.size / 1024)}KB)`);
    
    if (stats.size > 300000) {
      console.log('⚠️  Image is larger than 300KB, which might affect loading speed');
    }
    
  } catch (error) {
    console.error('Error creating Open Graph image:', error);
    
    // Fallback: copy the original
    console.log('📋 Falling back to copying original Elite.png');
    fs.copyFileSync(inputPath, outputPath);
    console.log('✅ Created og-image.png by copying Elite.png');
  }
}

// Also create a hero image backup
async function createHeroBackup() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'hero.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'hero-og.jpg');
  
  try {
    if (fs.existsSync(inputPath)) {
      if (!sharp) {
        console.log('Creating hero-og.jpg without compression');
        fs.copyFileSync(inputPath, outputPath);
        console.log('✅ Created hero-og.jpg');
        return;
      }
      
      await sharp(inputPath)
        .resize(1200, 630, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality: 75
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ Created hero-og.jpg (${Math.round(stats.size / 1024)}KB)`);
    }
  } catch (error) {
    console.error('Error creating hero backup:', error);
  }
}

async function main() {
  console.log('🚀 Creating Open Graph optimized images...');
  await createOpenGraphImage();
  await createHeroBackup();
  console.log('✨ Done!');
}

main().catch(console.error);
