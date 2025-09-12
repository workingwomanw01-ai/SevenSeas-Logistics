import { NextResponse } from "next/server";
import admin from '@/utils/admin';
import { sendAdminNotification, sendCustomerNotification } from '@/utils/emailService';

export async function POST(request) {
  try {
    const { trackingNumber, updatedData } = await request.json();
    
    // Get the document reference
    const shipmentsRef = admin.firestore().collection('shipments');
    const querySnapshot = await shipmentsRef.where('trackingNumber', '==', trackingNumber).get();
    
    if (querySnapshot.empty) {
      return NextResponse.json({ 
        message: "Shipment not found" 
      }, { status: 404 });
    }

    const docRef = querySnapshot.docs[0].ref;    // Get the previous data for comparison
    const previousDoc = await docRef.get();
    const previousData = previousDoc.data();
    
    // Handle custom timestamp and timezone
    let customTimestamp = admin.firestore.Timestamp.now();
    
    if (updatedData.customTimestampDate && updatedData.customTimestampTime) {
      try {
        const customDateTimeString = `${updatedData.customTimestampDate}T${updatedData.customTimestampTime}`;
        const customDate = new Date(customDateTimeString);
        
        // If timezone is specified, we need to adjust for it
        if (updatedData.timezone && updatedData.timezone !== 'UTC') {
          // For simplicity, we'll store the custom date as provided
          // In a production app, you might want to use a library like moment-timezone
          customTimestamp = admin.firestore.Timestamp.fromDate(customDate);
        } else {
          customTimestamp = admin.firestore.Timestamp.fromDate(customDate);
        }
      } catch (dateError) {
        console.error('Error parsing custom timestamp:', dateError);
        // Fall back to current timestamp if custom date parsing fails
        customTimestamp = admin.firestore.Timestamp.now();
      }
    }
    
    // Create timeline entry for status updates
    let timelineUpdate = {};
    
    // If status is being updated, add timeline entry
    if (updatedData.status && updatedData.status !== previousData.status) {
      const timelineEntry = {
        status: updatedData.status,
        timestamp: customTimestamp,
        location: updatedData.currentLocationDescription || updatedData.destination || 'Unknown',
        description: `Status updated to ${updatedData.status}`,
        updatedBy: 'admin', // Since this is coming from admin panel
        timezone: updatedData.timezone || previousData.timezone || 'UTC'
      };
      
      // Append to existing timeline or create new one
      const existingTimeline = previousData.statusTimeline || [];
      timelineUpdate.statusTimeline = [...existingTimeline, timelineEntry];
      
      // Update last status change timestamp
      timelineUpdate.lastStatusUpdate = customTimestamp;
    }
    
    // Update the document
    const updatePayload = {      ...updatedData,
      ...timelineUpdate,
      updatedAt: customTimestamp,
      timezone: updatedData.timezone || previousData.timezone || 'UTC',
      customTimestampUsed: !!(updatedData.customTimestampDate && updatedData.customTimestampTime)
    };
    
    await docRef.update(updatePayload);

    // Get the updated data
    const updatedDoc = await docRef.get();
    const shipmentData = { 
      id: updatedDoc.id, 
      ...updatedDoc.data() 
    };    // Send email notifications sequentially to prevent connection conflicts
    try {
      const adminResult = await sendAdminNotification('updated', shipmentData, previousData);
      console.log('Admin notification result:', adminResult);
      
      // Add small delay before sending customer notifications
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const customerResult = await sendCustomerNotification('updated', shipmentData, 'both');
      console.log('Customer notification result:', customerResult);
      
      console.log('Email notifications sent:', { 
        admin: adminResult.success, 
        customer: customerResult.success 
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }    return NextResponse.json({ 
      message: "Shipment updated successfully",
      shipmentData,
      timelineUpdated: !!timelineUpdate.statusTimeline
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating shipment:", error);
    return NextResponse.json({ 
      message: "Error updating shipment",
      error: error.message
    }, { status: 500 });
  }
}
