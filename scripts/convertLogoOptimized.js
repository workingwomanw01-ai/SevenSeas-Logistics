// Logo to Base64 Converter Utility with Auto-Optimization
// Use this script to convert your logo to base64 format for Gmail compatibility

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const convertLogoToBase64 = async () => {
  try {
    // Path to your logo file - using Elite.png as specified
    const logoPath = path.join(process.cwd(), 'public', 'images', 'Elite.png');
    
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      console.log('❌ Logo file not found at:', logoPath);
      console.log('📁 Available files in public/images/:');
      const imagesDir = path.join(process.cwd(), 'public', 'images');
      if (fs.existsSync(imagesDir)) {
        const files = fs.readdirSync(imagesDir);
        files.forEach(file => console.log(`   - ${file}`));
      }
      return;
    }
    
    console.log('🔍 Analyzing original logo...');
    const originalStats = fs.statSync(logoPath);
    console.log(`📊 Original size: ${(originalStats.size / 1024).toFixed(2)} KB`);
    
    // Optimize the image for email use
    const optimizedBuffer = await sharp(logoPath)
      .resize(200, 60, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .png({ 
        quality: 80, 
        compressionLevel: 9,
        palette: true 
      })
      .toBuffer();
    
    console.log(`✨ Optimized size: ${(optimizedBuffer.length / 1024).toFixed(2)} KB`);
    console.log(`💾 Size reduction: ${(((originalStats.size - optimizedBuffer.length) / originalStats.size) * 100).toFixed(1)}%`);
    
    // Convert optimized image to base64
    const logoBase64 = optimizedBuffer.toString('base64');
    const base64DataUri = `data:image/png;base64,${logoBase64}`;
    
    console.log('✅ Logo converted and optimized successfully!');
    console.log('🎨 Format: Optimized PNG');
    console.log('📐 Max dimensions: 200x60px');
    
    console.log('\n📋 Add this to your .env.local file for Gmail compatibility:');
    console.log('COMPANY_LOGO_BASE64="' + base64DataUri + '"');
    
    console.log('\n🚀 Gmail Optimization Applied:');
    console.log('- ✅ Resized to email-optimal dimensions (200x60px max)');
    console.log('- ✅ Compressed to reduce file size');
    console.log('- ✅ Converted to base64 for Gmail compatibility');
    console.log('- ✅ PNG format optimized for logos');
    
    // Save to file for easy copying
    const outputPath = path.join(process.cwd(), 'logo-base64.txt');
    fs.writeFileSync(outputPath, `COMPANY_LOGO_BASE64="${base64DataUri}"`);
    console.log('\n💾 Environment variable saved to:', outputPath);
    
    // Save optimized image for reference
    const optimizedImagePath = path.join(process.cwd(), 'public', 'images', 'Elite-optimized.png');
    fs.writeFileSync(optimizedImagePath, optimizedBuffer);
    console.log('🖼️  Optimized image saved to:', optimizedImagePath);
    
    // Check final file size
    const finalSizeKB = optimizedBuffer.length / 1024;
    if (finalSizeKB > 50) {
      console.log('\n⚠️  Note: Even after optimization, logo is still large. Consider using a simpler design.');
    } else {
      console.log('\n✅ Logo size is now optimal for email delivery!');
    }
    
  } catch (error) {
    console.error('❌ Error converting logo:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Elite.png exists in public/images/');
    console.log('2. Check file permissions');
    console.log('3. Run this script from the project root directory');
    console.log('4. Make sure Sharp is installed: npm install sharp');
  }
};

// Run the conversion
convertLogoToBase64();
