import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function GET() {
  try {
    const shipmentsRef = collection(db, "shipments");
    const q = query(shipmentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const shipments = [];
    querySnapshot.forEach((doc) => {
      shipments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return NextResponse.json({ 
      shipments,
      count: shipments.length
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json({ 
      message: "Error fetching shipments",
      error: error.message
    }, { status: 500 });
  }
}
