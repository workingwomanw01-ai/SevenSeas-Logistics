import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const testEmailConfigurations = async () => {
  console.log('🔍 Testing Email Configuration...\n');
  
  // Check environment variables
  console.log('📧 Environment Variables:');
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ Not set'}`);
  console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '✅ Set' : '❌ Not set'}`);
  console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL ? '✅ Set' : '❌ Not set'}\n`);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Missing required email credentials in .env.local');
    return;
  }

  // Test different SMTP configurations for Titan Mail
  const configurations = [
    {
      name: 'Titan Mail (Port 587, STARTTLS)',
      config: {
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    },
    {
      name: 'Titan Mail (Port 465, SSL)',
      config: {
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    },
    {
      name: 'Titan Mail (Port 25, No encryption)',
      config: {
        host: 'smtp.titan.email',
        port: 25,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    }
  ];

  for (const { name, config } of configurations) {
    console.log(`🧪 Testing: ${name}`);
    
    try {
      const transporter = nodemailer.createTransporter(config);
      
      // Verify connection
      await transporter.verify();
      console.log(`✅ ${name}: Connection successful!`);
      
      // Try to send a test email
      const testEmail = {
        from: `"Test" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'Email Configuration Test',
        text: `This is a test email from ${name} configuration.`,
        html: `<p>This is a test email from <strong>${name}</strong> configuration.</p>`
      };
      
      const result = await transporter.sendMail(testEmail);
      console.log(`✅ ${name}: Test email sent successfully! Message ID: ${result.messageId}`);
      console.log(`📧 Email sent to: ${process.env.ADMIN_EMAIL}\n`);
      
      // If this configuration works, we found our solution
      return config;
      
    } catch (error) {
      console.log(`❌ ${name}: Failed`);
      console.log(`   Error: ${error.message}`);
      if (error.code) {
        console.log(`   Code: ${error.code}`);
      }
      if (error.response) {
        console.log(`   Response: ${error.response}`);
      }
      console.log('');
    }
  }
  
  console.log('🔧 Troubleshooting Tips:');
  console.log('1. Check if your Titan Mail password is correct');
  console.log('2. Verify if 2FA is enabled - you may need an app-specific password');
  console.log('3. Check if SMTP access is enabled in your Titan Mail settings');
  console.log('4. Verify your domain is properly configured with Titan Mail');
  console.log('5. Check if your IP is not blocked by Titan Mail');
  console.log('6. Try logging into webmail first to ensure account is active');
};

// Run the test
testEmailConfigurations().catch(console.error);
