# Email Footer Configuration

This document explains how to configure the professional email footers for your logistics company.

## Environment Variables for Footer Customization

Add these environment variables to your `.env` file to customize the email footer:

### Company Information
```
COMPANY_NAME="Your Logistics Company Name"
COMPANY_TAGLINE="Your Company Tagline or Mission"
COMPANY_ADDRESS="1344 White Ct"
COMPANY_CITY="Santa Maria, CA 93458"
COMPANY_COUNTRY="Country Name"
COMPANY_PHONE="+1 (209) 353-3619"
COMPANY_EMAIL="info@certifiedfreightlogistic.com"
COMPANY_WEBSITE="www.certifiedfreightlogistic.com"
COMPANY_LICENSE="DOT License #123456789"
```

### Social Media Links
```
SOCIAL_FACEBOOK="https://facebook.com/yourcompany"
SOCIAL_LINKEDIN="https://linkedin.com/company/yourcompany"
SOCIAL_TWITTER="https://twitter.com/yourcompany"
SOCIAL_INSTAGRAM="https://instagram.com/yourcompany"
```

## Professional Footer Features

The new email footer includes:

### 📍 Company Information Section
- Company name and branding
- Business address
- DOT license number (required for logistics companies)

### 📞 Contact Information
- Clickable phone number (tel: link)
- Clickable email address (mailto: link)
- Website link

### 🚚 Services Description
- Professional services overview
- Industry-specific messaging

### 📱 Social Media Links
- Professional circular icons for major platforms
- Configurable URLs via environment variables

### ⚖️ Legal & Privacy Section
- Privacy notice and confidentiality statement
- Copyright information
- Links to Privacy Policy and Terms of Service
- Unsubscribe option
- System disclaimer

## Professional Design Elements

### Color Scheme
- **Primary Background**: Light grey (#f5f6f7) with blue accent border
- **Text Colors**: Dark grey (#2c3e50), Medium grey (#5a6c7d)
- **Accent Links**: Professional blue (#4a90e2)
- **Dividers**: Light grey (#d5d8dc)
- **Legal Text**: Muted grey (#7b8794, #96a2b2)

### Typography
- **Font Family**: Arial, sans-serif (email-safe)
- **Responsive**: Works on desktop and mobile
- **Accessibility**: Good contrast ratios

### Layout Features
- **Two-column layout**: Company info and contact details
- **Organized sections**: Clear separation of information
- **Professional spacing**: Proper padding and margins
- **Email-safe HTML**: Compatible with all email clients

## Example Footer Appearance

```
┌─────────────────────────────────────────────────────────────┐
│                 [Light Grey Professional Footer]            │
├─────────────────────────────────────────────────────────────┤
│  Certified Freight Logistics   Contact Information           │
│  Address:                     📞 Phone: +1 (209) 353-3619   │
│  1344 White Ct                📧 Email: info@certifiedfreightlogistic.com    │
│  Santa Maria, CA 93458        🌐 Website: www.certifiedfreightlogistic.com    │
│  License: DOT #123456789                                    │
├─────────────────────────────────────────────────────────────┤
│        🚚 Professional Logistics & Shipping Services        │
│    Domestic & International • Real-time Tracking •         │
│         Freight • Express Delivery • Supply Chain          │
│                                                             │
│              [f] [in] [𝕏] [📷] Social Icons                  │
├─────────────────────────────────────────────────────────────┤
│  Privacy Notice: Confidential and legally privileged...    │
│  © 2025 Company. All rights reserved. | Privacy | Terms    │
│        Automated message - Do not reply directly           │
└─────────────────────────────────────────────────────────────┘
```

## Benefits of Professional Footers

### 🎯 Brand Consistency
- Reinforces company branding in every email
- Professional appearance builds trust
- Consistent contact information

### 📞 Improved Communication
- Multiple contact methods clearly displayed
- Clickable links for easy contact
- Social media presence showcased

### ⚖️ Legal Compliance
- Privacy notices for email compliance
- Professional disclaimers
- Unsubscribe options

### 🚚 Industry Credibility
- DOT license prominently displayed
- Professional services clearly listed
- Industry-specific messaging

## Implementation Notes

1. **Environment Variables**: All customization is done via environment variables
2. **Default Values**: Sensible defaults are provided if variables aren't set
3. **Mobile Responsive**: Footer adapts to different screen sizes
4. **Email Client Safe**: Uses table-based layout for maximum compatibility
5. **Easy Updates**: Change environment variables to update all emails instantly

## Testing

To test your footer configuration:
1. Update your environment variables
2. Send a test email through the admin panel
3. Check the footer appearance on desktop and mobile
4. Verify all links work correctly

The footer will automatically appear in all email types:
- Shipment creation notifications
- Shipment update notifications
- Custom admin emails
