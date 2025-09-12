import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testTitanMail = async () => {
  try {
    console.log('🧪 Testing Titan Mail Configuration...\n');
    
    // Check environment variables
    console.log('📋 Checking environment variables:');
    console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ Missing'}`);
    console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Missing'}`);
    console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Missing'}\n`);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('❌ Missing required environment variables. Please check your .env file.');
      return;
    }
    
    // Create transporter
    console.log('🔗 Creating Titan Mail transporter...');
    const transporter = nodemailer.createTransporter({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
    
    // Verify connection
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');
    
    // Send test email
    console.log('📧 Sending test email...');
    const testEmail = {
      from: `"Logistics Test" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'Titan Mail Test - Configuration Successful',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2c3e50; text-align: center;">🎉 Titan Mail Test Successful!</h2>
          <p>Congratulations! Your Titan Mail configuration is working correctly.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Configuration Details:</h3>
            <ul>
              <li><strong>SMTP Server:</strong> smtp.titan.email</li>
              <li><strong>Port:</strong> 587</li>
              <li><strong>Security:</strong> STARTTLS</li>
              <li><strong>From Email:</strong> ${process.env.EMAIL_USER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p style="color: #6c757d; font-size: 14px; text-align: center;">
            This email was sent automatically to test your Titan Mail integration.
          </p>
        </div>
      `
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`📬 Message ID: ${result.messageId}`);
    console.log(`📧 Sent to: ${testEmail.to}\n`);
    
    console.log('🎉 Titan Mail configuration test completed successfully!');
    console.log('Your logistics application is ready to send emails via Titan Mail.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Verify your EMAIL_USER and EMAIL_PASSWORD in .env file');
    console.log('2. Check that SMTP is enabled in your Titan Mail settings');
    console.log('3. Ensure your domain is properly configured with Titan Mail');
    console.log('4. Verify that port 587 is not blocked by your firewall/hosting provider');
    console.log('5. Check if your Titan Mail account requires 2FA or app-specific passwords');
  }
};

// Run the test
testTitanMail();
