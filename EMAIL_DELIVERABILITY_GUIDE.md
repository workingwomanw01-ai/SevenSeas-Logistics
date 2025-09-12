# Email Deliverability Guide for Titan Mail

## Current Spam Risk Assessment
Your emails **might go to spam** initially. Here's why and how to fix it:

## 🚨 Common Reasons Emails Go to Spam

### 1. **Domain/IP Reputation Issues**
- New domain without established reputation
- No SPF, DKIM, or DMARC records
- Shared IP reputation (if using shared hosting)

### 2. **Content Issues**
- Excessive HTML/CSS styling
- Sales-y language or spam trigger words
- Poor text-to-image ratio
- Missing unsubscribe links

### 3. **Technical Issues**
- No proper email authentication
- Inconsistent "From" addresses
- No plain text version

## ✅ Solutions to Improve Deliverability

### 1. **DNS Records Setup (CRITICAL)**
Add these DNS records to your domain:

#### SPF Record (TXT)
```
v=spf1 include:titan.email ~all
```

#### DKIM Record (TXT)
Contact Titan Mail support to get your DKIM record. It will look like:
```
k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

#### DMARC Record (TXT)
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; fo=1
```

### 2. **Titan Mail Account Setup**
1. **Log into Titan Mail Admin Panel**
2. **Enable SMTP Authentication**
3. **Set up DKIM signing** (contact support if needed)
4. **Configure proper display name and signature**

### 3. **Email Configuration Best Practices**

#### Use Consistent From Address
Always use the same email address for all automated emails:
```env
EMAIL_USER=noreply@yourdomain.com
COMPANY_EMAIL=support@yourdomain.com
```

#### Set Proper Reply-To Headers
```javascript
const mailOptions = {
  from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
  replyTo: process.env.COMPANY_EMAIL, // Different from sender
  to: recipientEmail,
  subject: subject,
  html: html,
  text: plainTextVersion // Always include plain text
};
```

### 4. **Content Optimization**

#### Avoid Spam Trigger Words
❌ Avoid: "Free", "Guaranteed", "Act Now", "Limited Time", "Click Here"
✅ Use: "Shipment Update", "Package Status", "Delivery Notification"

#### Improve HTML Structure
- Use proper DOCTYPE
- Include plain text version
- Reduce inline CSS
- Use alt text for images

### 5. **Email Authentication Headers**
Add these headers to all emails:

```javascript
const mailOptions = {
  // ...existing options
  headers: {
    'List-Unsubscribe': `<mailto:${process.env.COMPANY_EMAIL}?subject=Unsubscribe>`,
    'X-Mailer': 'Logistics Management System',
    'X-Priority': '3',
    'X-MSMail-Priority': 'Normal'
  }
};
```

## 🔧 Implementation Steps

### Step 1: DNS Configuration
Contact your domain registrar and add the DNS records above.

### Step 2: Titan Mail Setup
1. Log into Titan Mail admin
2. Go to Security Settings
3. Enable DKIM signing
4. Set up proper authentication

### Step 3: Update Environment Variables
```env
# Use a dedicated no-reply address
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-titan-password
ADMIN_EMAIL=admin@yourdomain.com
COMPANY_EMAIL=support@yourdomain.com

# Set proper company info
COMPANY_NAME=Your Company Name
COMPANY_WEBSITE=yourdomain.com
```

### Step 4: Test Email Deliverability
Use these tools to test:
- [Mail Tester](https://www.mail-tester.com/)
- [MXToolbox](https://mxtoolbox.com/deliverability/)
- [Google Postmaster Tools](https://postmaster.google.com/)

## 📊 Monitoring & Improvement

### Track Email Metrics
- Delivery rate
- Open rate
- Spam complaint rate
- Bounce rate

### Gradual Volume Increase
Start with low email volume and gradually increase to build reputation.

### Regular Monitoring
- Check spam folders regularly
- Monitor bounce notifications
- Review delivery reports

## 🚀 Quick Wins

1. **Set up SPF record immediately**
2. **Use consistent From address**
3. **Add plain text versions**
4. **Include proper unsubscribe links**
5. **Avoid spam trigger words**

## ⚠️ Red Flags to Avoid

- Sending bulk emails immediately
- Using purchased email lists
- High spam complaint rates (>0.1%)
- High bounce rates (>5%)
- Inconsistent sending patterns

## 📞 Support Resources

- **Titan Mail Support**: Contact for DKIM setup
- **DNS Provider**: For adding authentication records
- **Email Deliverability Tools**: For ongoing monitoring

## Timeline for Improvement

- **Week 1**: DNS records setup, immediate 30-50% improvement
- **Week 2-4**: Reputation building, 60-80% improvement
- **Month 2-3**: Full reputation establishment, 90%+ delivery rate

Remember: Email deliverability is a process, not a one-time setup. Consistent good practices will improve your reputation over time.
