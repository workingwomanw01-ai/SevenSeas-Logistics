# Logo Setup Instructions for Email Templates

Your email templates now include a professional logo header! Here's how to set it up properly:

## 🎨 Current Setup

The logo header is already integrated into all email templates:
- ✅ Admin notifications
- ✅ Sender (shipper) emails  
- ✅ Receiver emails
- ✅ Update notifications

## 🔧 Configuration Options

### Option 1: Hosted Logo (Recommended for Production)

1. **Upload your logo** to a publicly accessible location
2. **Add to .env.local**:
   ```env
   COMPANY_LOGO_URL=https://www.certifiedfreightlogistic.com/images/your-logo.png
   COMPANY_NAME=Your Company Name
   COMPANY_TAGLINE=Your Company Tagline
   ```

### Option 2: Base64 Encoded Logo (Maximum Compatibility)

For the best email client compatibility, use a base64 encoded logo:

1. **Convert your logo to base64**:
   ```bash
   cd scripts
   node convertLogo.js
   ```

2. **Add the generated base64 to .env.local**:
   ```env
   COMPANY_LOGO_BASE64=data:image/png;base64,your-base64-string-here
   ```

3. **Update the emailService.js** to use base64:
   - Uncomment the logoBase64 line
   - Replace `${logoUrl}` with `${logoBase64}` in the img src

## 🛠️ Quick Setup Steps

### Step 1: Add Environment Variables
Add these to your `.env.local` file:
```env
COMPANY_NAME=Certified Freight Logistics
COMPANY_TAGLINE=Professional Shipping & Logistics Services
COMPANY_LOGO_URL=https://www.certifiedfreightlogistic.com/images/Elite.png
```

### Step 2: Test the Setup
1. Go to Admin Dashboard → Email Settings
2. Send a test email
3. Check if the logo appears correctly

### Step 3: For Production (Optional)
Convert to base64 for maximum compatibility:
```bash
node scripts/convertLogo.js
```

## 🎯 Logo Requirements

- **Size**: Recommended 250x80px (max)
- **Format**: PNG, JPG, or GIF
- **File size**: Under 50KB for best performance
- **Background**: Transparent PNG works best

## 🔍 Troubleshooting

### Logo not showing?
1. **Check URL accessibility**: Make sure the logo URL is publicly accessible
2. **Try base64**: Convert to base64 for better compatibility
3. **Check file path**: Ensure the logo file exists in `public/images/`
4. **Environment variables**: Restart your server after adding env variables

### Logo too large/small?
1. **Resize the image file** to 250x80px or smaller
2. **The CSS will auto-scale** but it's better to use appropriately sized images

### Different logo for different emails?
You can create separate logo functions for different email types by modifying the `getLogoHeader()` function in `utils/emailService.js`.

## 📧 Email Header Design

The logo header includes:
- 🎨 **Gradient background** (blue theme)
- 🏢 **Company logo** (your image)
- 📝 **Company name** (from env variable)
- 🏷️ **Tagline** (from env variable)
- 📱 **Responsive design** (works on mobile)

## 🚀 Advanced Customization

To customize the header design, edit the `getLogoHeader()` function in `utils/emailService.js`:

```javascript
// Change colors
background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);

// Change fonts
font-family: 'Your Font', Arial, sans-serif;

// Change layout
// Modify the HTML structure and CSS styles
```

Your emails now have a professional, branded appearance that will help establish trust and recognition with your customers!
