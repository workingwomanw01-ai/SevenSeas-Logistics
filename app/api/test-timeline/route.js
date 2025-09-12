import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { trackingNumber, newStatus, location, description } = await request.json();
    
    // Test the updateShipment endpoint
    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/updateShipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackingNumber,
        updatedData: {
          status: newStatus,
          currentLocationDescription: location || `Updated to ${newStatus}`,
          lastUpdated: new Date().toISOString()
        }
      }),
    });

    if (updateResponse.ok) {
      const result = await updateResponse.json();
      return NextResponse.json({ 
        success: true,
        message: "Timeline test completed successfully",
        result: result,
        timelineUpdated: result.timelineUpdated
      });
    } else {
      const error = await updateResponse.json();
      return NextResponse.json({ 
        success: false,
        message: "Failed to update shipment",
        error: error
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Timeline test error:", error);
    return NextResponse.json({ 
      success: false,
      message: "Error testing timeline functionality",
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Timeline Test Endpoint",
    usage: "POST with { trackingNumber, newStatus, location?, description? }"
  });
}
