# Email Notifications Setup Guide

This guide will help you set up automated email notifications for your logistics management system.

## 📧 Features

- **Automated Admin Notifications**: Receive emails when shipments are created or updated
- **Customer Notifications**: Automatically notify senders and receivers about shipment status
- **Professional Templates**: HTML-formatted emails with shipment details
- **Testing Interface**: Built-in email testing from the admin dashboard

## 🔧 Setup Instructions

### 1. Gmail Configuration

You'll need a Gmail account to send emails. Follow these steps:

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-factor authentication if not already enabled

2. **Generate App Password**
   - Go to Google Account > Security > 2-Step Verification
   - Scroll down to "App passwords"
   - Generate a new app password for "Mail"
   - Save this password (you'll need it for EMAIL_APP_PASSWORD)

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
ADMIN_EMAIL=admin@certifiedfreightlogistic.com

# Optional: Custom SMTP settings (if not using Gmail)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
```

### 3. Environment Variable Descriptions

- **EMAIL_USER**: Your Gmail address that will send the emails
- **EMAIL_APP_PASSWORD**: The 16-character app password generated in step 1 (NOT your regular Gmail password)
- **ADMIN_EMAIL**: Email address where admin notifications will be sent

### 4. Testing the Setup

1. Start your development server: `npm run dev`
2. Go to the Admin Dashboard
3. Click on "Email Settings" in the sidebar
4. Use the "Send Test Email" feature to verify your configuration

## 📨 Email Types

### Shipment Created Emails

Sent automatically when a new shipment is created via the admin dashboard:

- **To Admin**: Detailed shipment information with sender/receiver details
- **To Customers**: Confirmation with tracking number and basic details

### Shipment Updated Emails

Sent automatically when shipment details are modified:

- **To Admin**: Shows what changed (status, location, etc.)
- **To Customers**: Status update notification

## 🔍 Troubleshooting

### Common Issues

1. **"Authentication failed" error**
   - Ensure 2-factor authentication is enabled on your Gmail account
   - Verify you're using an App Password, not your regular password
   - Check that EMAIL_USER matches the Gmail account that generated the App Password

2. **Emails not being sent**
   - Check your .env.local file is in the project root
   - Restart your development server after adding environment variables
   - Verify all required environment variables are set

3. **Emails going to spam**
   - This is normal for development/testing
   - In production, consider using a dedicated email service like SendGrid or AWS SES
   - Set up proper SPF, DKIM, and DMARC records for your domain

### Testing Commands

You can also test emails via API:

```bash
# Test admin notification for created shipment
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "created", "emailType": "admin"}'

# Test customer notification for updated shipment
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "updated", "emailType": "customer"}'
```

## 🚀 Production Considerations

### Security
- Never commit your .env.local file to version control
- Use environment variables in your hosting platform
- Consider using more secure email services for production

### Email Service Alternatives
For production, consider upgrading to:
- **SendGrid**: Professional email service with better deliverability
- **AWS SES**: Amazon's email service
- **Postmark**: Transactional email service
- **Mailgun**: Email automation service

### Performance
- Email sending is non-blocking (uses Promise.all with catch)
- Failed emails won't prevent shipment creation/updates
- Consider implementing a retry mechanism for failed emails

## 📊 Email Templates

The system includes responsive HTML templates with:
- Company branding placeholders
- Shipment details and tracking information
- Professional styling with CSS
- Mobile-friendly design

You can customize these templates by editing `/utils/emailService.js`.

## 🛠️ Development Notes

### File Structure
```
utils/
  emailService.js          # Main email service and templates
app/api/
  createShipment/route.js  # Enhanced with email notifications
  updateShipment/route.js  # Enhanced with email notifications
  test-email/route.js      # Email testing endpoint
app/admin/components/
  EmailSettings.jsx        # Admin email management interface
```

### Integration Points
- Email notifications are integrated into existing shipment APIs
- No changes needed to frontend forms - emails are sent automatically
- Test interface available in admin dashboard for easy testing

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Gmail/App Password setup
3. Test with the built-in email testing interface
4. Check the browser console and server logs for error messages
