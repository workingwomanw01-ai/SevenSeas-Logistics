/**
 * Color Update Script for Burgundy & Gold Theme
 * Run this script to systematically update color schemes across the application
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color mappings from old to new
const colorMappings = {
  // Teal to Burgundy
  'bg-burgundy-primary': 'bg-burgundy-primary',
  'bg-burgundy-dark': 'bg-burgundy-dark',
  'bg-burgundy-dark': 'bg-burgundy-dark',
  'text-burgundy-primary': 'text-burgundy-primary',
  'text-burgundy-primary': 'text-burgundy-primary',
  'text-burgundy-dark': 'text-burgundy-dark',
  'border-burgundy-primary': 'border-burgundy-primary',
  'hover:bg-burgundy-dark': 'hover:bg-burgundy-primary',
  'hover:text-burgundy-primary': 'hover:text-burgundy-primary',
  'from-burgundy-primary': 'from-burgundy-primary',
  'to-burgundy-dark': 'to-burgundy-dark',
  'from-burgundy-dark': 'from-burgundy-dark',
  'to-burgundy-primary': 'to-burgundy-primary',
  
  // Orange to Gold
  'bg-gold-secondary': 'bg-gold-secondary',
  'bg-gold-dark': 'bg-gold-dark',
  'text-gold-secondary': 'text-gold-secondary',
  'text-gold-dark': 'text-gold-dark',
  'border-gold-secondary': 'border-gold-secondary',
  'hover:bg-gold-secondary': 'hover:bg-gold-secondary',
  'hover:bg-gold-dark': 'hover:bg-gold-dark',
  'hover:text-gold-secondary': 'hover:text-gold-secondary',
  'from-gold-secondary': 'from-gold-secondary',
  'to-gold-dark': 'to-gold-dark',
  'bg-cream-accent': 'bg-cream-accent',
  'hover:bg-cream-accent': 'hover:bg-cream-accent'
};

// Files to exclude from automatic updates
const excludeFiles = [
  'scripts/updateColors.js',
  'package.json',
  'package-lock.json',
  '.env',
  'README.md'
];

// Function to recursively get all JS/JSX files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (!['node_modules', '.git', '.next'].includes(file)) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if ((file.endsWith('.js') || file.endsWith('.jsx')) && 
               !excludeFiles.some(exclude => filePath.includes(exclude))) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to update colors in a file
function updateColorsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Apply color mappings
    for (const [oldColor, newColor] of Object.entries(colorMappings)) {
      if (content.includes(oldColor)) {
        content = content.replace(new RegExp(oldColor, 'g'), newColor);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  console.log('🎨 Starting Burgundy & Gold Theme Update...\n');
  
  const projectRoot = path.resolve(__dirname, '..');
  const allFiles = getAllFiles(projectRoot);
  
  let updatedCount = 0;
  
  allFiles.forEach(filePath => {
    if (updateColorsInFile(filePath)) {
      updatedCount++;
    }
  });
  
  console.log(`\n🎉 Theme update complete!`);
  console.log(`📊 Files updated: ${updatedCount}/${allFiles.length}`);
  console.log('\n🎨 Color Scheme Applied:');
  console.log('   Primary: #8b1538 (Burgundy)');
  console.log('   Secondary: #c9a96e (Gold)');
  console.log('   Accent: #f4f1e8 (Cream)');
  console.log('   Success: #27ae60 (Green)');
  console.log('   Warning: #e74c3c (Red)');
}

// Run the script
main();
