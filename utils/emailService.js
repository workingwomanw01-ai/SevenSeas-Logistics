import nodemailer from 'nodemailer';

// Get the base URL for tracking links
const getBaseUrl = () => {
  // Check for environment variable first
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Check for Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
    // Default to common production domain patterns or localhost for development
  if (process.env.NODE_ENV === 'production') {
    return process.env.WEBSITE_URL || 'https://www.certifiedfreightlogistic.com';
  }
  
  return 'http://localhost:3000';
};

// Create a tracking URL with pre-filled tracking number
const createTrackingUrl = (trackingNumber) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/tracking?trackingNumber=${encodeURIComponent(trackingNumber)}`;
};

// Create transporter using Titan Mail SMTP with anti-spam configurations
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      minVersion: 'TLSv1.2'
    },    pool: false, // Disable connection pooling to prevent connection reuse issues
    maxConnections: 1,
    maxMessages: 1, // Only send one message per connection
    rateLimit: 5, // Reduced rate limit for more stability
    connectionTimeout: 60000, // 60 seconds timeout
    greetingTimeout: 30000, // 30 seconds greeting timeout
    socketTimeout: 60000 // 60 seconds socket timeout
  });
};

// Header template without logo - company name and tagline only
const getLogoHeader = () => {
  // Use the company name from environment or default
  const companyName = process.env.COMPANY_NAME || "Certified Freight Logistics";
  const companyTagline = process.env.COMPANY_TAGLINE || "Professional Shipping & Logistics Services";
  
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); margin: 0; padding: 0;">
      <tr>
        <td align="center" style="padding: 25px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
            <tr>
              <td align="center">
                <!-- Company name - clean text header without logo -->
                <div style="color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3); font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.2; letter-spacing: 1px;">
                  ${companyName}
                </div>
                <div style="color: rgba(255,255,255,0.95); font-size: 16px; margin-top: 8px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-weight: 300; line-height: 1.3;">
                  ${companyTagline}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

// Professional email footer template
const getProfessionalFooter = () => {
  const companyName = process.env.COMPANY_NAME || "Certified Freight Logistics";  const companyAddress = process.env.COMPANY_ADDRESS || "1344 White Ct";
  const companyCity = process.env.COMPANY_CITY || "Santa Maria, CA 93458";
  const companyCountry = process.env.COMPANY_COUNTRY || "United States";
  const companyPhone = process.env.COMPANY_PHONE || "+1 (415) 758-0116";  const companyEmail = process.env.COMPANY_EMAIL || process.env.EMAIL_USER || "info@certifiedfreightlogistic.com";  const companyWebsite = process.env.COMPANY_WEBSITE || "www.certifiedfreightlogistic.com";
  const companyLicense = process.env.COMPANY_LICENSE || "US DOT 1769376";
  
  // Social media links (configurable via environment variables)
  const facebookUrl = process.env.SOCIAL_FACEBOOK || "#";
  const linkedinUrl = process.env.SOCIAL_LINKEDIN || "#";
  const twitterUrl = process.env.SOCIAL_TWITTER || "#";
  const instagramUrl = process.env.SOCIAL_INSTAGRAM || "#";
    return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f6f7; border-top: 3px solid #4a90e2; margin-top: 30px;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto;">
            <!-- Company Info Section -->
            <tr>
              <td style="padding-bottom: 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <!-- Company Details -->
                    <td width="50%" style="vertical-align: top; padding-right: 20px;">
                      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                        ${companyName}
                      </h3>
                      <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0;">
                        <strong style="color: #34495e;">Address:</strong><br>
                        ${companyAddress}<br>
                        ${companyCity}<br>
                        ${companyCountry}
                      </p>
                      <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 14px; margin: 15px 0 0 0;">
                        <strong style="color: #34495e;">License:</strong> ${companyLicense}
                      </p>
                    </td>
                    
                    <!-- Contact Information -->
                    <td width="50%" style="vertical-align: top; padding-left: 20px;">
                      <h3 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                        Contact Information
                      </h3>
                      <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0;">
                        <strong style="color: #34495e;">📞 Phone:</strong><br>
                        <a href="tel:${companyPhone.replace(/[^\d+]/g, '')}" style="color: #4a90e2; text-decoration: none;">${companyPhone}</a>
                      </p>
                      <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 10px 0;">
                        <strong style="color: #34495e;">📧 Email:</strong><br>
                        <a href="mailto:${companyEmail}" style="color: #4a90e2; text-decoration: none;">${companyEmail}</a>
                      </p>
                      <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                        <strong style="color: #34495e;">🌐 Website:</strong><br>
                        <a href="https://${companyWebsite}" style="color: #4a90e2; text-decoration: none;">${companyWebsite}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Divider -->
            <tr>
              <td style="border-top: 1px solid #d5d8dc; padding: 20px 0;"></td>
            </tr>
            
            <!-- Services & Social Media Section -->
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                <h4 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; margin: 0 0 15px 0;">
                  🚚 Professional Logistics & Shipping Services
                </h4>
                <p style="color: #5a6c7d; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">
                  Domestic & International Shipping • Real-time Tracking • Freight Services • Express Delivery • Supply Chain Solutions
                </p>
                  <!-- Social Media Icons -->
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                  <tr>
                    <td style="padding: 0 8px;">
                      <a href="${facebookUrl}" style="text-decoration: none; color: #4a90e2;">
                        <div style="width: 32px; height: 32px; background-color: #3b5998; border-radius: 16px; text-align: center; line-height: 32px; color: white; font-weight: bold; font-family: Arial, sans-serif;">f</div>
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="${linkedinUrl}" style="text-decoration: none; color: #4a90e2;">
                        <div style="width: 32px; height: 32px; background-color: #0077b5; border-radius: 16px; text-align: center; line-height: 32px; color: white; font-weight: bold; font-family: Arial, sans-serif;">in</div>
                      </a>
                    </td>
                    <td style="padding: 0 8px;">
                      <a href="${twitterUrl}" style="text-decoration: none; color: #4a90e2;">
                        <div style="width: 32px; height: 32px; background-color: #1da1f2; border-radius: 16px; text-align: center; line-height: 32px; color: white; font-weight: bold; font-family: Arial, sans-serif;">𝕏</div>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Divider -->
            <tr>
              <td style="border-top: 1px solid #d5d8dc; padding: 20px 0 15px 0;"></td>
            </tr>
            
            <!-- Legal & Privacy Section -->
            <tr>
              <td style="text-align: center;">
                <p style="color: #7b8794; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; margin: 0 0 10px 0;">
                  <strong>Privacy Notice:</strong> This email and any attachments are confidential and may be legally privileged. 
                  If you are not the intended recipient, please notify the sender immediately and delete this email.
                </p>
                <p style="color: #96a2b2; font-family: Arial, sans-serif; font-size: 11px; line-height: 1.3; margin: 0;">
                  © ${new Date().getFullYear()} ${companyName}. All rights reserved. | 
                  <a href="https://${companyWebsite}/privacy" style="color: #4a90e2; text-decoration: none;">Privacy Policy</a> | 
                  <a href="https://${companyWebsite}/terms" style="color: #4a90e2; text-decoration: none;">Terms of Service</a> | 
                  <a href="mailto:${companyEmail}?subject=Unsubscribe" style="color: #4a90e2; text-decoration: none;">Unsubscribe</a>
                </p>
                <p style="color: #96a2b2; font-family: Arial, sans-serif; font-size: 10px; margin: 10px 0 0 0;">
                  This is an automated message from our logistics management system. Please do not reply directly to this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

// Email templates
const getShipmentCreatedTemplate = (shipmentData) => {
  return {
    subject: `New Shipment Created - ${shipmentData.trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
        ${getLogoHeader()}
        <div style="background-color: #f8f9fa; padding: 30px 20px;">
          <h2 style="color: #2c3e50; margin-bottom: 25px; margin-top: 0; text-align: center; font-size: 24px;">🚚 New Shipment Created</h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Shipment Details</h3>
            <p><strong>Tracking Number:</strong> ${shipmentData.trackingNumber}</p>
            <div style="text-align: center; margin: 15px 0;">
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #3498db; color: white; text-decoration: none; padding: 10px 25px; border-radius: 20px; font-weight: bold; font-size: 14px;">
                🔍 Track Shipment
              </a>
            </div>
            <p><strong>Status:</strong> <span style="background-color: #fff3cd; padding: 4px 8px; border-radius: 4px;">${shipmentData.status}</span></p>
            <p><strong>Created:</strong> ${new Date(shipmentData.createdAt?.toDate?.() || shipmentData.createdAt).toLocaleString()}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #27ae60; margin-top: 0;">Sender Information</h3>
            <p><strong>Name:</strong> ${shipmentData.sender}</p>
            <p><strong>Email:</strong> ${shipmentData.senderEmail}</p>
            <p><strong>Phone:</strong> ${shipmentData.senderNumber}</p>
            <p><strong>Address:</strong> ${shipmentData.senderAddress}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #e74c3c; margin-top: 0;">Receiver Information</h3>
            <p><strong>Name:</strong> ${shipmentData.receiver}</p>
            <p><strong>Email:</strong> ${shipmentData.receiverEmail}</p>
            <p><strong>Phone:</strong> ${shipmentData.receiverNumber}</p>
            <p><strong>Address:</strong> ${shipmentData.receiverAddress}</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #9b59b6; margin-top: 0;">Route Information</h3>
            <p><strong>Origin:</strong> ${shipmentData.origin}</p>
            <p><strong>Destination:</strong> ${shipmentData.destination}</p>
            ${shipmentData.product ? `<p><strong>Product:</strong> ${shipmentData.product}</p>` : ''}
            ${shipmentData.weight ? `<p><strong>Weight:</strong> ${shipmentData.weight} kg</p>` : ''}            ${shipmentData.quantity ? `<p><strong>Quantity:</strong> ${shipmentData.quantity}</p>` : ''}
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; font-size: 14px;">
              This is an automated notification from your logistics management system.
            </p>
          </div>
        </div>
        ${getProfessionalFooter()}
      </div>
    `
  };
};

const getShipmentUpdatedTemplate = (shipmentData, previousData = {}) => {
  const changes = [];
  
  // Compare key fields to highlight changes
  const fieldsToCheck = ['status', 'origin', 'destination', 'currentLocationPercentage'];
  fieldsToCheck.forEach(field => {
    if (previousData[field] !== shipmentData[field]) {
      changes.push({
        field: field.charAt(0).toUpperCase() + field.slice(1),
        from: previousData[field] || 'Not set',
        to: shipmentData[field] || 'Not set'
      });
    }
  });

  return {
    subject: `Shipment Updated - ${shipmentData.trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          ${getLogoHeader()}
          <h2 style="color: #2c3e50; margin-bottom: 20px;">📦 Shipment Updated</h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Shipment Details</h3>
            <p><strong>Tracking Number:</strong> ${shipmentData.trackingNumber}</p>
            <div style="text-align: center; margin: 15px 0;">
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #3498db; color: white; text-decoration: none; padding: 10px 25px; border-radius: 20px; font-weight: bold; font-size: 14px;">
                🔍 Track Shipment
              </a>
            </div>
            <p><strong>Current Status:</strong> <span style="background-color: #d4edda; padding: 4px 8px; border-radius: 4px; color: #155724;">${shipmentData.status}</span></p>
            <p><strong>Updated:</strong> ${new Date(shipmentData.updatedAt?.toDate?.() || shipmentData.updatedAt || Date.now()).toLocaleString()}</p>
            ${shipmentData.currentLocationPercentage ? `<p><strong>Progress:</strong> ${shipmentData.currentLocationPercentage}% complete</p>` : ''}
          </div>

          ${changes.length > 0 ? `
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #f39c12; margin-top: 0;">Changes Made</h3>
            ${changes.map(change => `
              <div style="margin-bottom: 10px; padding: 10px; background-color: #fff3cd; border-radius: 4px;">
                <strong>${change.field}:</strong><br>
                <span style="color: #856404;">From: ${change.from}</span><br>
                <span style="color: #155724;">To: ${change.to}</span>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #27ae60; margin-top: 0;">Route Information</h3>
            <p><strong>Origin:</strong> ${shipmentData.origin}</p>
            <p><strong>Destination:</strong> ${shipmentData.destination}</p>            <p><strong>Receiver:</strong> ${shipmentData.receiver} (${shipmentData.receiverEmail})</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; font-size: 14px;">
              This is an automated notification from your logistics management system.
            </p>
          </div>
        </div>
        ${getProfessionalFooter()}
      </div>
    `
  };
};

// Generate plain text version of email content
const generatePlainTextVersion = (shipmentData, type) => {
  const companyName = process.env.COMPANY_NAME || "Certified Freight Logistics";
  
  if (type === 'created') {
    return `
${companyName}
New Shipment Created

Dear ${shipmentData.sender || shipmentData.receiver},

Your shipment has been successfully created:

Tracking Number: ${shipmentData.trackingNumber}

Track your shipment online: ${createTrackingUrl(shipmentData.trackingNumber)}

Status: ${shipmentData.status}
From: ${shipmentData.origin}
To: ${shipmentData.destination}

You can track your shipment using the tracking number above or by visiting the link provided.

Thank you for choosing ${companyName}.

---
This is an automated message. Please do not reply to this email.
For support, contact: ${process.env.COMPANY_EMAIL || process.env.EMAIL_USER}
    `.trim();
  } else if (type === 'updated') {
    return `
${companyName}
Shipment Status Update

Dear ${shipmentData.sender || shipmentData.receiver},

Your shipment has been updated:

Tracking Number: ${shipmentData.trackingNumber}

Track your shipment online: ${createTrackingUrl(shipmentData.trackingNumber)}

New Status: ${shipmentData.status}
${shipmentData.currentLocationPercentage ? `Progress: ${shipmentData.currentLocationPercentage}% complete` : ''}

From: ${shipmentData.origin}
To: ${shipmentData.destination}

Continue tracking your shipment using the tracking number above or by visiting the link provided.

Thank you for choosing ${companyName}.

---
This is an automated message. Please do not reply to this email.
For support, contact: ${process.env.COMPANY_EMAIL || process.env.EMAIL_USER}
    `.trim();
  }
  
  return '';
};

// Enhanced mail options with anti-spam headers
const createMailOptions = (to, subject, html, plainText, type = 'notification') => {
  const companyName = process.env.COMPANY_NAME || "Certified Freight Logistics";
  const companyEmail = process.env.COMPANY_EMAIL || process.env.EMAIL_USER;
  
  return {
    from: `"${companyName}" <${process.env.EMAIL_USER}>`,
    replyTo: companyEmail,
    to: to,
    subject: subject,
    html: html,
    text: plainText,
    headers: {
      'List-Unsubscribe': `<mailto:${companyEmail}?subject=Unsubscribe>`,
      'X-Mailer': `${companyName} Logistics System`,
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN',
      'Precedence': 'bulk'
    }
  };
};

// Function to send email to admin
export const sendAdminNotification = async (type, shipmentData, previousData = null) => {
  let transporter;
  try {    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.log('Email configuration missing. Skipping email notification.');
      return { success: false, error: 'Email configuration missing' };
    }

    transporter = createTransporter();
    
    let emailTemplate;
    if (type === 'created') {
      emailTemplate = getShipmentCreatedTemplate(shipmentData);
    } else if (type === 'updated') {
      emailTemplate = getShipmentUpdatedTemplate(shipmentData, previousData);
    } else {
      throw new Error('Invalid email type');
    }

    const plainText = generatePlainTextVersion(shipmentData, type);
    const mailOptions = createMailOptions(process.env.ADMIN_EMAIL, emailTemplate.subject, emailTemplate.html, plainText);

    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', result.messageId);
    
    // Close the transporter connection
    if (transporter && typeof transporter.close === 'function') {
      transporter.close();
    }
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    
    // Ensure transporter is closed on error
    if (transporter && typeof transporter.close === 'function') {
      try {
        transporter.close();
      } catch (closeError) {
        console.error('Error closing transporter:', closeError);
      }
    }
    
    return { success: false, error: error.message };
  }
};

// Function to send email to customer (sender/receiver)
export const sendCustomerNotification = async (type, shipmentData, customerType = 'both') => {
  try {    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email configuration missing. Skipping customer notification.');
      return { success: false, error: 'Email configuration missing' };
    }

    const results = [];
    
    // Send to sender if requested
    if (customerType === 'sender' || customerType === 'both') {
      if (shipmentData.senderEmail) {
        const senderResult = await sendSenderNotification(null, type, shipmentData);
        results.push({ email: shipmentData.senderEmail, role: 'sender', ...senderResult });
        
        // Add delay between emails to prevent connection conflicts
        if (customerType === 'both' && shipmentData.receiverEmail) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // Send to receiver if requested
    if (customerType === 'receiver' || customerType === 'both') {
      if (shipmentData.receiverEmail) {
        const receiverResult = await sendReceiverNotification(null, type, shipmentData);
        results.push({ email: shipmentData.receiverEmail, role: 'receiver', ...receiverResult });
      }
    }
    
    return { success: true, results };
  } catch (error) {
    console.error('Error sending customer notifications:', error);
    return { success: false, error: error.message };
  }
};

// Send notification to sender (shipper)
const sendSenderNotification = async (_, type, shipmentData) => {
  let transporter;
  try {
    transporter = createTransporter();
    
    let subject, html;
    
    if (type === 'created') {subject = `Shipment Created - Your Package is Ready for Pickup - ${shipmentData.trackingNumber}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
          ${getLogoHeader()}
          <div style="background-color: #f8f9fa; padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-top: 0; text-align: center; font-size: 24px;">📦 Your Shipment Has Been Created Successfully</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Dear <strong>${shipmentData.sender}</strong>,</p>
              <p>Thank you for choosing our logistics service! Your shipment has been successfully created and is now in our system.</p>
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p style="margin: 0;"><strong>🏷️ Tracking Number:</strong> <span style="font-size: 18px; color: #1976d2; font-weight: bold;">${shipmentData.trackingNumber}</span></p>
                <p style="margin: 8px 0 0 0;"><strong>📋 Status:</strong> ${shipmentData.status}</p>
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3); transition: all 0.3s ease;">
                  🔍 Track Your Shipment
                </a>
              </div>
              
              <h3 style="color: #1976d2; margin-top: 20px;">📍 Shipment Details</h3>
              <p><strong>From:</strong> ${shipmentData.origin}</p>
              <p><strong>To:</strong> ${shipmentData.destination}</p>
              <p><strong>Recipient:</strong> ${shipmentData.receiver}</p>
              <p><strong>Recipient Contact:</strong> ${shipmentData.receiverNumber}</p>
              ${shipmentData.product ? `<p><strong>Product:</strong> ${shipmentData.product}</p>` : ''}
              ${shipmentData.weight ? `<p><strong>Weight:</strong> ${shipmentData.weight} kg</p>` : ''}
              ${shipmentData.quantity ? `<p><strong>Quantity:</strong> ${shipmentData.quantity}</p>` : ''}
              
              <div style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4 style="color: #1976d2; margin-top: 0;">📋 Next Steps:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Your package is ready for pickup from: <strong>${shipmentData.senderAddress}</strong></li>
                  <li>You'll receive updates as your shipment progresses</li>
                  <li>The recipient will be notified separately</li>
                  <li>Use your tracking number to monitor progress</li>
                </ul>
              </div>
            </div>              <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #fff3e0; border-radius: 6px;">
              <p style="color: #ef6c00; font-size: 14px; margin: 0 0 10px 0;">
                📱 Track your shipment anytime using tracking number: <strong>${shipmentData.trackingNumber}</strong>
              </p>
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #ef6c00; color: white; text-decoration: none; padding: 8px 20px; border-radius: 15px; font-weight: bold; font-size: 14px;">
                Click to Track Now
              </a>
            </div>
          </div>
          ${getProfessionalFooter()}
        </div>
      `;} else if (type === 'updated') {
      subject = `Your Shipment Update - ${shipmentData.trackingNumber}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
          ${getLogoHeader()}
          <div style="background-color: #f8f9fa; padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-top: 0; text-align: center; font-size: 24px;">📍 Your Shipment Status Update</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Dear <strong>${shipmentData.sender}</strong>,</p>
              <p>We have an update on your shipment that's being delivered to <strong>${shipmentData.receiver}</strong>.</p>
                <div style="background-color: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p style="margin: 0;"><strong>🏷️ Tracking Number:</strong> <span style="font-size: 18px; color: #2e7d32; font-weight: bold;">${shipmentData.trackingNumber}</span></p>
                <p style="margin: 8px 0 0 0;"><strong>📋 New Status:</strong> <span style="background-color: #c8e6c9; padding: 4px 8px; border-radius: 4px; color: #1b5e20;">${shipmentData.status}</span></p>
                ${shipmentData.currentLocationPercentage ? `<p style="margin: 8px 0 0 0;"><strong>🚚 Progress:</strong> ${shipmentData.currentLocationPercentage}% complete</p>` : ''}
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3); transition: all 0.3s ease;">
                  🔍 Track Your Shipment
                </a>
              </div>
              
              <h3 style="color: #2e7d32; margin-top: 20px;">📦 Shipment Details</h3>
              <p><strong>From:</strong> ${shipmentData.origin}</p>
              <p><strong>To:</strong> ${shipmentData.destination}</p>
              <p><strong>Recipient:</strong> ${shipmentData.receiver}</p>
              
              <div style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #1976d2; margin: 0;">
                  💡 <strong>Good news!</strong> Your shipment is making progress toward its destination. We'll keep you updated as it moves closer to delivery.
                </p>
              </div>
            </div>              <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #fff3e0; border-radius: 6px;">
              <p style="color: #ef6c00; font-size: 14px; margin: 0 0 10px 0;">
                📱 Continue tracking: <strong>${shipmentData.trackingNumber}</strong>
              </p>
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #ef6c00; color: white; text-decoration: none; padding: 8px 20px; border-radius: 15px; font-weight: bold; font-size: 14px;">
                Click to Track Now
              </a>
            </div>
          </div>
          ${getProfessionalFooter()}
        </div>
      `;
    }

    const plainText = generatePlainTextVersion(shipmentData, type);
    const mailOptions = createMailOptions(shipmentData.senderEmail, subject, html, plainText);    const result = await transporter.sendMail(mailOptions);
    console.log(`Sender notification sent to ${shipmentData.senderEmail}:`, result.messageId);
    
    // Close the transporter connection
    if (transporter && typeof transporter.close === 'function') {
      transporter.close();
    }
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`Error sending sender notification:`, error);
    
    // Ensure transporter is closed on error
    if (transporter && typeof transporter.close === 'function') {
      try {
        transporter.close();
      } catch (closeError) {
        console.error('Error closing transporter:', closeError);
      }
    }
    
    return { success: false, error: error.message };
  }
};

// Send notification to receiver
const sendReceiverNotification = async (_, type, shipmentData) => {
  let transporter;
  try {
    transporter = createTransporter();
    
    let subject, html;
    
    if (type === 'created') {      subject = `Package Coming Your Way - ${shipmentData.trackingNumber}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
          ${getLogoHeader()}
          <div style="background-color: #f8f9fa; padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-top: 0; text-align: center; font-size: 24px;">📦 A Package is Being Sent to You!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Dear <strong>${shipmentData.receiver}</strong>,</p>
              <p>Great news! <strong>${shipmentData.sender}</strong> has sent you a package through our logistics service.</p>
                <div style="background-color: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p style="margin: 0;"><strong>🏷️ Tracking Number:</strong> <span style="font-size: 18px; color: #2e7d32; font-weight: bold;">${shipmentData.trackingNumber}</span></p>
                <p style="margin: 8px 0 0 0;"><strong>📋 Status:</strong> ${shipmentData.status}</p>
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3); transition: all 0.3s ease;">
                  🔍 Track Your Package
                </a>
              </div>
              
              <h3 style="color: #2e7d32; margin-top: 20px;">📍 Delivery Information</h3>
              <p><strong>From:</strong> ${shipmentData.origin}</p>
              <p><strong>To:</strong> ${shipmentData.destination}</p>
              <p><strong>Delivery Address:</strong> ${shipmentData.receiverAddress}</p>
              <p><strong>Sender:</strong> ${shipmentData.sender}</p>
              <p><strong>Sender Contact:</strong> ${shipmentData.senderNumber}</p>
              ${shipmentData.product ? `<p><strong>Package Contents:</strong> ${shipmentData.product}</p>` : ''}
              ${shipmentData.weight ? `<p><strong>Package Weight:</strong> ${shipmentData.weight} kg</p>` : ''}
              
              <div style="background-color: #fff3e0; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4 style="color: #ef6c00; margin-top: 0;">📋 What to Expect:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>We'll notify you with delivery updates</li>
                  <li>Please ensure someone is available at the delivery address</li>
                  <li>Have your ID ready for package verification</li>
                  <li>Track your package using the tracking number above</li>
                </ul>
              </div>
            </div>              <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #e3f2fd; border-radius: 6px;">
              <p style="color: #1976d2; font-size: 14px; margin: 0 0 10px 0;">
                📱 Track your incoming package: <strong>${shipmentData.trackingNumber}</strong>
              </p>
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #1976d2; color: white; text-decoration: none; padding: 8px 20px; border-radius: 15px; font-weight: bold; font-size: 14px;">
                Click to Track Now
              </a>
            </div>
          </div>
          ${getProfessionalFooter()}
        </div>
      `;} else if (type === 'updated') {
      subject = `Your Package Update - ${shipmentData.trackingNumber}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
          ${getLogoHeader()}
          <div style="background-color: #f8f9fa; padding: 30px 20px;">
            <h2 style="color: #2c3e50; margin-top: 0; text-align: center; font-size: 24px;">📍 Your Package is on the Move!</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Dear <strong>${shipmentData.receiver}</strong>,</p>
              <p>We have an update on the package being sent to you by <strong>${shipmentData.sender}</strong>.</p>
                <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p style="margin: 0;"><strong>🏷️ Tracking Number:</strong> <span style="font-size: 18px; color: #1976d2; font-weight: bold;">${shipmentData.trackingNumber}</span></p>
                <p style="margin: 8px 0 0 0;"><strong>📋 Current Status:</strong> <span style="background-color: #bbdefb; padding: 4px 8px; border-radius: 4px; color: #0d47a1;">${shipmentData.status}</span></p>
                ${shipmentData.currentLocationPercentage ? `<p style="margin: 8px 0 0 0;"><strong>🚚 Delivery Progress:</strong> ${shipmentData.currentLocationPercentage}% complete</p>` : ''}
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3); transition: all 0.3s ease;">
                  🔍 Track Your Package
                </a>
              </div>
              
              <h3 style="color: #1976d2; margin-top: 20px;">📦 Package Details</h3>
              <p><strong>From:</strong> ${shipmentData.origin}</p>
              <p><strong>To:</strong> ${shipmentData.destination}</p>
              <p><strong>Delivery Address:</strong> ${shipmentData.receiverAddress}</p>
              <p><strong>Sender:</strong> ${shipmentData.sender}</p>
              
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #2e7d32; margin: 0;">
                  🎯 <strong>Getting closer!</strong> Your package is making its way to you. We'll notify you when it's out for delivery.
                </p>
              </div>
            </div>              <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #fff3e0; border-radius: 6px;">
              <p style="color: #ef6c00; font-size: 14px; margin: 0 0 10px 0;">
                📱 Keep tracking: <strong>${shipmentData.trackingNumber}</strong>
              </p>
              <a href="${createTrackingUrl(shipmentData.trackingNumber)}" 
                 style="display: inline-block; background-color: #ef6c00; color: white; text-decoration: none; padding: 8px 20px; border-radius: 15px; font-weight: bold; font-size: 14px;">
                Click to Track Now
              </a>
            </div>
          </div>
          ${getProfessionalFooter()}
        </div>
      `;
    }

    const plainText = generatePlainTextVersion(shipmentData, type);
    const mailOptions = createMailOptions(shipmentData.receiverEmail, subject, html, plainText);    const result = await transporter.sendMail(mailOptions);
    console.log(`Receiver notification sent to ${shipmentData.receiverEmail}:`, result.messageId);
    
    // Close the transporter connection
    if (transporter && typeof transporter.close === 'function') {
      transporter.close();
    }
    
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`Error sending receiver notification:`, error);
    
    // Ensure transporter is closed on error
    if (transporter && typeof transporter.close === 'function') {
      try {
        transporter.close();
      } catch (closeError) {
        console.error('Error closing transporter:', closeError);
      }
    }
    
    return { success: false, error: error.message };
  }
};

// Custom email template function
const getCustomEmailTemplate = (customData) => {
  const { subject, message, recipientName } = customData;
  
  return {
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); background-color: white;">
        ${getLogoHeader()}        <div style="background-color: #f8f9fa; padding: 30px 20px;">
          <h2 style="color: #2c3e50; margin-bottom: 25px; margin-top: 0; text-align: center; font-size: 24px;">📧 ${subject}</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            ${recipientName ? `<p>Dear <strong>${recipientName}</strong>,</p>` : ''}
            <div style="line-height: 1.6; color: #333;">
              ${message.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
          </div>          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; font-size: 14px;">
              This message was sent from ${process.env.COMPANY_NAME || "Certified Freight Logistics"} administration.
            </p>
          </div>
        </div>
        ${getProfessionalFooter()}
      </div>
    `
  };
};

// Function to send custom email
export const sendCustomEmail = async (emailData) => {
  let transporter;
  try {    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email configuration missing. Cannot send custom email.');
      return { success: false, error: 'Email configuration missing' };
    }

    const { recipientEmail, subject, message, recipientName } = emailData;

    if (!recipientEmail || !subject || !message) {
      return { success: false, error: 'Missing required fields: recipient email, subject, or message' };
    }

    transporter = createTransporter();
    const emailTemplate = getCustomEmailTemplate({ subject, message, recipientName });

    const mailOptions = {
      from: `"${process.env.COMPANY_NAME || 'Certified Freight Logistics'} Admin" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Custom email sent successfully:', result.messageId);
    
    // Close the transporter connection
    if (transporter && typeof transporter.close === 'function') {
      transporter.close();
    }
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending custom email:', error);
    
    // Ensure transporter is closed on error
    if (transporter && typeof transporter.close === 'function') {
      try {
        transporter.close();
      } catch (closeError) {
        console.error('Error closing transporter:', closeError);
      }
    }
    
    return { success: false, error: error.message };
  }
};
