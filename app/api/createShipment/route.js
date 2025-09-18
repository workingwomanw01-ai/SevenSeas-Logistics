import { NextResponse } from "next/server";
import admin from '@/utils/admin';
import { sendAdminNotification, sendCustomerNotification } from '@/utils/emailService';

const extractNumber = (value) => {
  if (!value) return 0;
  const match = value.toString().replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received request body keys:', Object.keys(body)); // Debug log
    
    // Validate required fields
    if (!body.sender || !body.receiver) {
      return NextResponse.json({ 
        message: "Missing required fields: sender and receiver are required",
        error: "Validation error"
      }, { status: 400 });
    }

    const timestamp = Date.now().toString().slice(-8);
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const trackingNumber = `CFL-${timestamp}-${randomNum}`;
    
    // Handle custom timestamp and timezone
    let customTimestamp;
    
    try {
      if (body.customTimestampDate && body.customTimestampTime) {
        const customDateTimeString = `${body.customTimestampDate}T${body.customTimestampTime}`;
        const customDate = new Date(customDateTimeString);
        
        console.log('Custom DateTime String:', customDateTimeString);
        console.log('Parsed Custom Date:', customDate);
        
        if (isNaN(customDate.getTime())) {
          throw new Error('Invalid custom date/time');
        }
        
        customTimestamp = admin.firestore.Timestamp.fromDate(customDate);
      } else {
        customTimestamp = admin.firestore.Timestamp.now();
      }
    } catch (timestampError) {
      console.error('Error parsing timestamp:', timestampError);
      customTimestamp = admin.firestore.Timestamp.now();
    }

    // Clean and validate the shipment data
    const shipmentData = {
      // Basic info
      trackingNumber,
      status: body.status || "Pending",
      
      // Sender info
      sender: body.sender,
      senderNumber: body.senderNumber || '',
      senderEmail: body.senderEmail || '',
      senderAddress: body.senderAddress || '',
      
      // Receiver info
      receiver: body.receiver,
      receiverNumber: body.receiverNumber || '',
      receiverEmail: body.receiverEmail || '',
      receiverAddress: body.receiverAddress || '',
      
      // Location info
      origin: body.origin || '',
      destination: body.destination || '',
      latitude: body.latitude ? parseFloat(body.latitude) : null,
      longitude: body.longitude ? parseFloat(body.longitude) : null,
      originLatitude: body.originLatitude ? parseFloat(body.originLatitude) : null,
      originLongitude: body.originLongitude ? parseFloat(body.originLongitude) : null,
      destinationLatitude: body.destinationLatitude ? parseFloat(body.destinationLatitude) : null,
      destinationLongitude: body.destinationLongitude ? parseFloat(body.destinationLongitude) : null,
      currentLocationPercentage: body.currentLocationPercentage ? parseFloat(body.currentLocationPercentage) : 0,
      currentLocationDescription: body.currentLocationDescription || '',
      
      // Shipment details
      shipmentType: body.shipmentType || '',
      product: body.product || '',
      productType: body.productType || '',
      productQuantity: extractNumber(body.productQuantity),
      productWeight: extractNumber(body.productWeight),
      weight: extractNumber(body.weight),
      quantity: extractNumber(body.quantity),
      
      // Additional info
      comments: body.comments || '',
      featuredImage: body.featuredImage || '',
      courier: body.courier || '',
      totalFreight: body.totalFreight || '',
      carrier: body.carrier || '',
      carrierReferenceNo: body.carrierReferenceNo || '',
      departureTime: body.departureTime || '',
      pickupDate: body.pickupDate || '',
      pickupTime: body.pickupTime || '',
      estimatedDeliveryDate: body.estimatedDeliveryDate || '',
      length: body.length || '',
      width: body.width || '',
      height: body.height || '',
      paymentMethod: body.paymentMethod || '',
      description: body.description || '',
      
      // Timestamps
      createdAt: customTimestamp,
      updatedAt: customTimestamp,
      lastStatusUpdate: customTimestamp,
      timezone: body.timezone || 'UTC',
      customTimestampUsed: !!(body.customTimestampDate && body.customTimestampTime),
      
      // Timeline
      statusTimeline: [
        {
          status: body.status || "Pending",
          timestamp: customTimestamp,
          location: body.origin || body.senderAddress || 'Origin',
          description: 'Shipment created and received for processing',
          updatedBy: 'system',
          timezone: body.timezone || 'UTC'
        }
      ],
      
      // Mode
      mode: body.mode || '',
    };

    console.log('Attempting to save shipment data...'); // Debug log
    console.log('Shipment Data:', shipmentData);

    // Check if Firebase Admin is initialized
    if (!admin.apps.length) {
      throw new Error('Firebase Admin not initialized');
    }

    console.log('Firebase Admin apps:', admin.apps);

    // Save shipment to database
    const docRef = await admin.firestore()
      .collection('shipments')
      .add(shipmentData);

    console.log('Shipment saved with ID:', docRef.id); // Debug log

    // Get the saved shipment data for email
    const savedShipment = await docRef.get();
    const shipmentWithId = { 
      id: savedShipment.id, 
      ...savedShipment.data() 
    };

    // Send email notifications with better error handling
    let emailResults = { admin: false, customer: false };
    
    // Only attempt email sending if the functions exist
    console.log('sendAdminNotification exists:', typeof sendAdminNotification === 'function');
    console.log('sendCustomerNotification exists:', typeof sendCustomerNotification === 'function');
    
    if (typeof sendAdminNotification === 'function') {
      try {
        console.log('Sending admin notification...'); // Debug log
        const adminResult = await sendAdminNotification('created', shipmentWithId);
        emailResults.admin = adminResult?.success || false;
        console.log('Admin notification result:', adminResult);
      } catch (adminEmailError) {
        console.error('Admin email error:', adminEmailError);
        // Continue execution even if admin email fails
      }
    } else {
      console.log('Admin notification function not available');
    }
    
    if (typeof sendCustomerNotification === 'function') {
      try {
        console.log('Sending customer notification...'); // Debug log
        await new Promise(resolve => setTimeout(resolve, 1000)); // Shorter delay
        
        const customerResult = await sendCustomerNotification('created', shipmentWithId, 'both');
        emailResults.customer = customerResult?.success || false;
        console.log('Customer notification result:', customerResult);
      } catch (customerEmailError) {
        console.error('Customer email error:', customerEmailError);
        // Continue execution even if customer email fails
      }
    } else {
      console.log('Customer notification function not available');
    }

    console.log('Email results:', emailResults); // Debug log

    return NextResponse.json({ 
      message: "Shipment created successfully",
      trackingNumber,
      emailStatus: emailResults
    }, { status: 200 });

  } catch (error) {
    console.error("Detailed error creating shipment:", error);
    console.error("Error stack:", error.stack);
    
    // Return more specific error information
    let errorMessage = "Error creating shipment";
    let statusCode = 500;
    
    if (error.message.includes('Firebase')) {
      errorMessage = "Database connection error";
    } else if (error.message.includes('Validation')) {
      errorMessage = "Invalid data provided";
      statusCode = 400;
    } else if (error.message.includes('permission')) {
      errorMessage = "Permission denied";
      statusCode = 403;
    }
    
    return NextResponse.json({ 
      message: errorMessage,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        cause: error.cause
      } : undefined
    }, { status: statusCode });
  }
}
