# Shipment Email Tracking Links

This document explains the enhanced shipment email tracking functionality that includes clickable tracking links.

## Overview

All shipment emails now include clickable tracking links that automatically redirect users to the tracking page with their tracking number pre-filled and automatically searched.

## Features

### 📧 Email Templates with Tracking Links

All email notifications now include:
- **Prominent tracking buttons** - Styled gradient buttons that make tracking easy
- **Pre-filled tracking numbers** - Links automatically fill the tracking form
- **Auto-search functionality** - The tracking page automatically searches when opened via email link
- **Multiple tracking options** - Both prominent buttons and smaller backup links

### 🔗 Tracking URL Format

Tracking links follow this format:
```
https://www.certifiedfreightlogistic.com/tracking?trackingNumber=LT123456789
```

### 📨 Updated Email Types

The following email templates now include tracking links:

#### Sender Notifications
- **Shipment Created** - Includes tracking button for the shipper
- **Shipment Updated** - Progress updates with tracking access

#### Receiver Notifications  
- **Package Incoming** - Tracking button for the recipient
- **Package Updated** - Delivery progress with tracking access

## Configuration

### Environment Variables

Set your website base URL in your `.env` file:

```bash
# Primary option - explicit base URL
NEXT_PUBLIC_BASE_URL=https://www.certifiedfreightlogistic.com

# Alternative options (auto-detected):
VERCEL_URL=auto-populated-on-vercel-deployment
WEBSITE_URL=https://www.certifiedfreightlogistic.com
```

### URL Priority Order

The system uses this priority order for determining the base URL:
1. `NEXT_PUBLIC_BASE_URL` (highest priority)
2. `VERCEL_URL` (auto-populated on Vercel)
3. `WEBSITE_URL` (fallback)
4. Development default: `http://localhost:3000`
5. Production default: `https://www.certifiedfreightlogistic.com`

## Technical Implementation

### Auto-Search Functionality

When users click tracking links from emails:
1. URL parameters are automatically parsed
2. Tracking number is pre-filled in the search form
3. Search is automatically triggered
4. Results are displayed immediately

### Email Template Changes

- **HTML emails** include styled gradient buttons with hover effects
- **Plain text emails** include direct tracking URLs
- **Fallback options** provide both buttons and text links
- **Mobile responsive** buttons work on all email clients

## Testing

### Test Tracking Links

To test the functionality:
1. Create a shipment in the admin panel
2. Check the generated email for tracking links
3. Click the link to verify auto-search works
4. Test with different tracking numbers

### Email Client Compatibility

Tracking buttons are designed to work across:
- Gmail (web and mobile)
- Outlook (web and desktop)
- Apple Mail
- Thunderbird
- Mobile email clients

## Best Practices

### For Users
- Tracking links work best when clicked directly from the email
- If copy-pasting URLs, ensure the full link is copied
- Links work on both desktop and mobile devices

### For Administrators
- Ensure `NEXT_PUBLIC_BASE_URL` is set correctly for production
- Test tracking links after deployment
- Monitor email delivery and click-through rates

## Troubleshooting

### Common Issues

**Link doesn't auto-search:**
- Check if JavaScript is enabled
- Verify the tracking number parameter in URL
- Clear browser cache and try again

**Wrong domain in links:**
- Verify `NEXT_PUBLIC_BASE_URL` environment variable
- Check deployment configuration
- Restart application after changing environment variables

**Email not displaying buttons:**
- Some email clients block external styles
- Plain text fallback URLs are always included
- Consider email client preview testing

## Future Enhancements

Planned improvements:
- **Email analytics** - Track click-through rates
- **Deep linking** - Direct links to specific shipment sections
- **Mobile app integration** - Open in mobile app if installed
- **QR codes** - Include QR codes for mobile scanning
