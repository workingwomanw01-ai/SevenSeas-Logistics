import { NextResponse } from "next/server";
import { sendAdminNotification, sendCustomerNotification } from '@/utils/emailService';

export async function POST(request) {
  try {
    const { type, shipmentData, emailType = 'admin' } = await request.json();
    
    if (!type || !shipmentData) {
      return NextResponse.json({ 
        message: "Missing required fields: type and shipmentData" 
      }, { status: 400 });
    }

    // Mock shipment data for testing if not provided
    const testShipmentData = {
      trackingNumber: 'EWL-12345678-TEST',
      status: 'In Transit',
      sender: 'John Doe',
      senderEmail: 'john@example.com',
      senderNumber: '+1234567890',
      senderAddress: '123 Main St, City, State',
      receiver: 'Jane Smith',
      receiverEmail: 'jane@example.com',
      receiverNumber: '+0987654321',
      receiverAddress: '456 Oak Ave, Another City, State',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      product: 'Electronics',
      weight: '5',
      quantity: '2',
      currentLocationPercentage: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...shipmentData
    };

    let result;
    
    if (emailType === 'admin') {
      result = await sendAdminNotification(type, testShipmentData);
    } else if (emailType === 'customer') {
      result = await sendCustomerNotification(type, testShipmentData, 'both');
    } else if (emailType === 'both') {
      const adminResult = await sendAdminNotification(type, testShipmentData);
      const customerResult = await sendCustomerNotification(type, testShipmentData, 'both');
      result = { admin: adminResult, customer: customerResult };
    } else {
      return NextResponse.json({ 
        message: "Invalid emailType. Use 'admin', 'customer', or 'both'" 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      message: "Test email sent successfully",
      result
    }, { status: 200 });

  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json({ 
      message: "Error sending test email",
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Email Test API",
    usage: {
      method: "POST",
      body: {
        type: "created | updated",
        emailType: "admin | customer | both (optional, defaults to admin)",
        shipmentData: "object with shipment details (optional, will use test data)"
      },
      example: {
        type: "created",
        emailType: "both",
        shipmentData: {
          trackingNumber: "EWL-12345678-DEMO",
          sender: "Test Sender",
          senderEmail: "sender@test.com"
        }
      }
    }
  });
}
