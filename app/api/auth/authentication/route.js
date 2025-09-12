import { NextResponse } from "next/server";
import admin from '@/utils/admin';
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, password } = body;

    // First authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, name, password);
    
    try {
      // Then verify admin claims
      const adminAuth = admin.auth();
      const user = await adminAuth.getUser(userCredential.user.uid);
      const isAdmin = user.customClaims?.admin === true;

      if (!isAdmin) {
        return NextResponse.json({ 
          message: "Unauthorized access" 
        }, { status: 403 });
      }

      return NextResponse.json({ 
        message: "Login successful",
        user: userCredential.user.email 
      }, { status: 200 });

    } catch (adminError) {
      console.error("Admin verification error:", adminError);
      return NextResponse.json({ 
        message: "Server authentication error" 
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ 
      message: "Invalid credentials" 
    }, { status: 401 });
  }
}
