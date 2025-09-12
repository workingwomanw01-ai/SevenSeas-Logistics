import { sendCustomEmail } from '@/utils/emailService';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { recipientEmail, subject, message, recipientName } = body;

    // Validate required fields
    if (!recipientEmail || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields: recipientEmail, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send the custom email
    const result = await sendCustomEmail({
      recipientEmail,
      subject,
      message,
      recipientName
    });

    if (!result.success) {
      return Response.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Custom email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error in custom email API:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
