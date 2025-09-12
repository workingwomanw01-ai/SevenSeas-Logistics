// Logo to Base64 Converter Utility
// Use this script to convert your logo to base64 format for Gmail compatibility

import fs from 'fs';
import path from 'path';

const convertLogoToBase64 = () => {
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
    
    // Read and convert to base64
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString('base64');
    const mimeType = logoPath.endsWith('.png') ? 'image/png' : 
                     logoPath.endsWith('.jpg') || logoPath.endsWith('.jpeg') ? 'image/jpeg' :
                     logoPath.endsWith('.gif') ? 'image/gif' : 'image/png';
    
    const base64DataUri = `data:${mimeType};base64,${logoBase64}`;
    
    console.log('✅ Logo converted successfully!');
    console.log('📊 File size:', (logoBuffer.length / 1024).toFixed(2), 'KB');
    console.log('🎨 MIME type:', mimeType);
    console.log('\n📋 Add this to your .env.local file for Gmail compatibility:');
    console.log('COMPANY_LOGO_BASE64="' + base64DataUri + '"');
    
    console.log('\n� Gmail Optimization Tips:');
    console.log('- Base64 images work best in Gmail');
    console.log('- Keep logo under 50KB for best performance');
    console.log('- PNG format recommended for logos');
    
    // Save to file for easy copying
    const outputPath = path.join(process.cwd(), 'logo-base64.txt');
    fs.writeFileSync(outputPath, `COMPANY_LOGO_BASE64="${base64DataUri}"`);
    console.log('\n💾 Environment variable saved to:', outputPath);
    
    // Check file size recommendations
    const fileSizeKB = logoBuffer.length / 1024;
    if (fileSizeKB > 50) {
      console.log('\n⚠️  Warning: Logo is larger than 50KB. Consider optimizing for better email performance.');
    } else {
      console.log('\n✅ Logo size is optimal for email delivery!');
    }
    
  } catch (error) {
    console.error('❌ Error converting logo:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure Elite.png exists in public/images/');
    console.log('2. Check file permissions');
    console.log('3. Run this script from the project root directory');
  }
};

// Run the conversion
convertLogoToBase64();
