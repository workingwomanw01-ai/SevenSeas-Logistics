# Custom Email Feature

## Overview
The custom email feature allows administrators to send personalized emails using the same professional template used for shipment notifications.

## Features
- **Professional Template**: Uses the same company branding and styling as shipment emails
- **Custom Content**: Full control over subject and message content
- **Recipient Management**: Support for recipient name and email
- **Real-time Feedback**: Status messages for successful sends and errors
- **Form Validation**: Email format validation and required field checks
- **Responsive Design**: Works on all device sizes

## Usage

### Accessing the Feature
1. Login to the admin dashboard
2. Click on "Send Custom Email" in the sidebar navigation
3. Fill out the email form
4. Click "Send Email"

### Form Fields
- **Recipient Email** (Required): The email address to send to
- **Recipient Name** (Optional): Personal name for greeting
- **Email Subject** (Required): Subject line for the email
- **Email Message** (Required): Main content of the email

### Email Template
The emails are sent using the company template which includes:
- Company header with logo and branding
- Professional styling and formatting
- Responsive design for mobile devices
- Company footer and contact information

### Tips
- Use line breaks in your message to create paragraphs
- Keep the subject line clear and professional
- Include a recipient name for a more personal touch
- Test with your own email first before sending to customers

## Technical Implementation

### Files Added/Modified
- `utils/emailService.js` - Added `sendCustomEmail()` function and `getCustomEmailTemplate()`
- `app/api/email/send-custom/route.js` - API endpoint for sending custom emails
- `app/admin/components/CustomEmail.jsx` - React component for the email form
- `app/admin/components/AdminSidebar.jsx` - Added custom email navigation option
- `app/admin/page.jsx` - Integrated custom email component

### Environment Variables Required
- `EMAIL_USER` - Gmail account for sending emails
- `EMAIL_APP_PASSWORD` - Gmail app password
- `COMPANY_NAME` - Company name for email header
- `COMPANY_TAGLINE` - Company tagline for email header

### Error Handling
- Email format validation
- Required field validation
- Network error handling
- Server error responses
- User-friendly error messages
