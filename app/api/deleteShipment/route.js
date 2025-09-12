import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export async function DELETE(request) {
  try {
    const { trackingNumber } = await request.json();
    
    if (!trackingNumber) {
      return NextResponse.json({ 
        message: "Tracking number is required"
      }, { status: 400 });
    }

    const shipmentsRef = collection(db, "shipments");
    const q = query(shipmentsRef, where("trackingNumber", "==", trackingNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json({ 
        message: "Shipment not found"
      }, { status: 404 });
    }

    // Delete the shipment
    const shipmentDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, "shipments", shipmentDoc.id));

    return NextResponse.json({ 
      message: "Shipment deleted successfully",
      trackingNumber
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting shipment:", error);
    return NextResponse.json({ 
      message: "Error deleting shipment",
      error: error.message
    }, { status: 500 });
  }
}
