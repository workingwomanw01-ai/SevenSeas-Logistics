import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const adminEmail = "admin@certifiedfreightlogistic.com";
const adminPassword = "admin123456";

async function createAdminUser() {
  try {
    // Create user
    const userRecord = await admin.auth().createUser({
      email: adminEmail,
      password: adminPassword,
      emailVerified: true,
    });

    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true
    });

    console.log("Admin user created successfully:", userRecord.email);
    console.log("Admin claims set for user");
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('Admin user already exists');
    } else {
      console.error("Error creating admin user:", error);
    }
    process.exit(1);
  }
}

createAdminUser();
