import { sendCustomEmail } from '../utils/emailService.js';

// Test email to check spam score
const testEmailDeliverability = async () => {
  console.log('🔬 Testing email deliverability...');
  
  // Test email to mail-tester.com for spam score analysis
  const testEmailData = {
    recipientEmail: 'test-email@mail-tester.com', // Replace with your test email
    subject: 'Test: Logistics System Email Deliverability',
    message: `This is a test email from our logistics management system.

We are testing:
- Email authentication
- Content quality
- Technical headers
- Spam score analysis

If you receive this email in your inbox (not spam), our configuration is working well.

Best regards,
Logistics Team`,
    recipientName: 'Email Tester'
  };

  try {
    const result = await sendCustomEmail(testEmailData);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('\n📋 Next steps:');
      console.log('1. Check if the email arrived in inbox (not spam)');
      console.log('2. Visit https://www.mail-tester.com/ to check your spam score');
      console.log('3. Aim for a score of 8/10 or higher');
      console.log('\n🔍 If score is low, check:');
      console.log('- DNS records (SPF, DKIM, DMARC)');
      console.log('- Email content and headers');
      console.log('- Domain reputation');
    } else {
      console.log('❌ Test email failed to send');
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
};

// Alternative test with a real email address
const testWithRealEmail = async (emailAddress) => {
  console.log(`🔬 Testing with real email: ${emailAddress}`);
  
  const testEmailData = {
    recipientEmail: emailAddress,
    subject: 'Test: Shipment Notification System',
    message: `Hello!

This is a test of our shipment notification system. 

Key features being tested:
✓ Professional email template
✓ Proper headers and authentication
✓ Anti-spam optimizations
✓ Plain text version included

If you received this in your inbox, our email system is configured correctly!

Please check your spam folder if you don't see this email in your inbox.

Best regards,
${process.env.COMPANY_NAME || 'Logistics Team'}`,
    recipientName: 'Test User'
  };

  try {
    const result = await sendCustomEmail(testEmailData);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('📧 Check your inbox and spam folder');
      console.log('💯 If in inbox = Good deliverability');
      console.log('⚠️ If in spam = Needs improvement');
    } else {
      console.log('❌ Test failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

// Run tests
console.log('='.repeat(50));
console.log('📧 EMAIL DELIVERABILITY TEST');
console.log('='.repeat(50));

// Uncomment the test you want to run:

// Test 1: Use mail-tester.com for professional spam analysis
// testEmailDeliverability();

// Test 2: Use your own email address
// testWithRealEmail('your-email@gmail.com');

console.log('\n📝 To run tests:');
console.log('1. Uncomment one of the test functions above');
console.log('2. Run: node scripts/testEmailDeliverability.js');
console.log('3. Check results and spam scores');

export { testEmailDeliverability, testWithRealEmail };
