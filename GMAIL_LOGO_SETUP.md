# Gmail Logo Setup Guide

## 🎯 To ensure your logo shows up in Gmail, follow these steps:

### Step 1: Convert Logo to Base64 (Recommended for Gmail)
```bash
node scripts/convertLogo.js
```

This will:
- Convert your `Lmd.png` logo to base64 format
- Generate the environment variable for you
- Save it to `logo-base64.txt`

### Step 2: Add Base64 to Environment Variables
Copy the generated line from `logo-base64.txt` to your `.env.local`:

```env
COMPANY_LOGO_BASE64="data:image/png;base64,your-base64-string-here"
```

### Step 3: Test in Gmail
1. Go to Admin Dashboard → Email Settings
2. Send a test email to a Gmail account
3. Check that the logo displays correctly

## 📧 Gmail-Specific Optimizations Applied:

### ✅ **Technical Improvements:**
- **Table-based layout** instead of divs (Gmail preferred)
- **Inline CSS only** (no external stylesheets)
- **Base64 images** (bypasses Gmail image blocking)
- **Fixed width/height** attributes on images
- **Gmail-compatible fonts** (Arial, Helvetica)
- **No JavaScript** (stripped by Gmail)

### ✅ **Email Structure:**
- Uses `<table>` elements for layout
- All styles are inline
- Proper `cellpadding="0" cellspacing="0" border="0"`
- `align="center"` for compatibility
- Fallback fonts specified

### ✅ **Image Optimization:**
- Logo resized to 200x60px max
- Base64 encoding for immediate display
- Proper alt text for accessibility
- No external dependencies

## 🔍 Troubleshooting Gmail Issues:

### Logo not showing in Gmail?
1. **Use Base64**: Gmail blocks external images by default
2. **Check size**: Keep logo under 50KB
3. **Test with different Gmail accounts**: Some may have different settings

### Logo too small/large?
1. **Edit the script**: Change dimensions in `convertLogo.js`
2. **CSS adjustments**: Modify width/height in `getLogoHeader()`

### Colors not showing correctly?
1. **Gmail strips some CSS**: Use basic color properties
2. **Test in multiple clients**: What works in one may not work in another

## 📱 Testing Checklist:

Test your emails in:
- ✅ Gmail (web)
- ✅ Gmail (mobile app)
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail

## 🚀 Quick Commands:

```bash
# Convert logo to base64
node scripts/convertLogo.js

# Test email with logo
# Go to Admin Dashboard → Email Settings → Send Test Email
```

Your logo should now display reliably in Gmail and all other major email clients!
