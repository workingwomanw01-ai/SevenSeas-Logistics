import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function POST(request) {
  try {
    const { trackingNumber } = await request.json();
    const shipmentsRef = collection(db, "shipments");
    const q = query(shipmentsRef, where("trackingNumber", "==", trackingNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json({ message: "Shipment not found" }, { status: 404 });
    }

    const data = querySnapshot.docs[0].data();
    
    return NextResponse.json({ 
      message: "Shipment status retrieved",
      status: data.status,
      shipmentData: data
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching shipment status:", error);
    return NextResponse.json({ 
      message: "Error fetching shipment status",
      error: error.message
    }, { status: 500 });
  }
}
