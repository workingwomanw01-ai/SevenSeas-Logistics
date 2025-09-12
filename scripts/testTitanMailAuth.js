const nodemailer = require('nodemailer');

// Environment variable validation
const validateEnv = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'ADMIN_EMAIL'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  console.log('Environment variables validated:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', '****'); // Mask password for security
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
};

// SMTP configuration options
const smtpConfigs = [
  {
    name: 'Port 587 (STARTTLS)',
    config: {
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false // For testing only
      },
      debug: true,
      logger: true
    }
  },
  {
    name: 'Port 465 (SSL/TLS)',
    config: {
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false // For testing only
      },
      debug: true,
      logger: true
    }
  },
  {
    name: 'Port 587 (PLAIN auth)',
    config: {
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        method: 'PLAIN'
      },
      tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false // For testing only
      },
      debug: true,
      logger: true
    }
  }
];

// Test email options
const mailOptions = {
  from: `"Test Script" <${process.env.EMAIL_USER}>`,
  to: process.env.ADMIN_EMAIL,
  subject: 'SMTP Troubleshooting Test',
  text: 'This is a test email to verify SMTP authentication.',
  html: '<p>This is a test email to verify SMTP authentication.</p>'
};

// Function to test SMTP configuration
const testSmtpConfig = async (config, name) => {
  console.log(`\nTesting configuration: ${name}`);
  const transporter = nodemailer.createTransport(config);
  
  try {
    // Verify connection
    await transporter.verify();
    console.log(`✓ Connection verified for ${name}`);

    // Send test email
    const result = await transporter.sendMail(mailOptions);
    console.log(`✓ Test email sent successfully for ${name}`);
    console.log('Message ID:', result.messageId);
    return { success: true, name, messageId: result.messageId };
  } catch (error) {
    console.error(`✗ Error in ${name}:`);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Response:', error.response);
    console.error('Response Code:', error.responseCode);
    console.error('Command:', error.command);
    return { success: false, name, error: error.message };
  }
};

// Main function to run tests
const troubleshootSmtp = async () => {
  try {
    // Step 1: Validate environment variables
    validateEnv();

    // Step 2: Test each SMTP configuration
    const results = [];
    for (const { name, config } of smtpConfigs) {
      const result = await testSmtpConfig(config, name);
      results.push(result);
      if (result.success) break; // Stop if a configuration works
    }

    // Step 3: Summarize results
    console.log('\n=== Test Summary ===');
    results.forEach(result => {
      console.log(`${result.name}: ${result.success ? 'Success' : `Failed (${result.error})`}`);
    });

    // Step 4: Provide next steps if all tests fail
    if (!results.some(r => r.success)) {
      console.log('\n=== Next Steps ===');
      console.log('1. Verify credentials in Titan Email webmail: https://webmail.titan.email');
      console.log('2. Check for 2FA and generate an application-specific password if enabled.');
      console.log('3. Confirm SMTP server hostname in Titan control panel (e.g., smtp0101.titan.email).');
      console.log('4. Test network connectivity:');
      console.log('   - Run: telnet smtp.titan.email 587');
      console.log('   - Run: telnet smtp.titan.email 465');
      console.log('5. Contact Titan support (support@titan.email) with:');
      console.log('   - Your public IP (check at https://www.whatismyip.com/)');
      console.log('   - Error logs above');
      console.log('6. Ensure SPF/DKIM records are set up for your domain.');
    }
  } catch (error) {
    console.error('Unexpected error during troubleshooting:', error.message);
  }
};

// Run the troubleshooter
troubleshootSmtp();