import { NextResponse } from "next/server";
import admin from '@/utils/admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json({ 
        message: "UID is required",
        isAdmin: false 
      }, { status: 400 });
    }

    // Verify admin claims using Firebase Admin SDK
    const adminAuth = admin.auth();
    const user = await adminAuth.getUser(uid);
    const isAdmin = user.customClaims?.admin === true;

    return NextResponse.json({ 
      isAdmin,
      message: isAdmin ? "Admin verified" : "Not an admin"
    }, { status: 200 });

  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json({ 
      message: "Admin verification failed",
      isAdmin: false 
    }, { status: 500 });
  }
}
