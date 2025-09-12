import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const invoiceData = await request.json();
    
    // Validate required fields
    if (!invoiceData.shipmentId || !invoiceData.invoiceNumber) {
      return NextResponse.json(
        { error: "Shipment ID and invoice number are required" },
        { status: 400 }
      );
    }

    // Add timestamp and prepare invoice data
    const invoice = {
      ...invoiceData,
      createdAt: serverTimestamp(),
      status: 'generated'
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, "invoices"), invoice);

    return NextResponse.json(
      { 
        message: "Invoice saved successfully",
        invoiceId: docRef.id,
        invoiceNumber: invoiceData.invoiceNumber
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error saving invoice:", error);
    return NextResponse.json(
      { 
        error: "Failed to save invoice",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shipmentId = searchParams.get('shipmentId');
    
    if (!shipmentId) {
      return NextResponse.json(
        { error: "Shipment ID is required" },
        { status: 400 }
      );
    }

    // You can implement logic to fetch invoices for a specific shipment
    // For now, return a simple response
    return NextResponse.json(
      { message: "Invoice fetch functionality can be implemented here" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch invoices",
        details: error.message
      },
      { status: 500 }
    );
  }
}
