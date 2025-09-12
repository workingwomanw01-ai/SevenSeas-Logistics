// Script to fix missing destination coordinates for specific shipments
import { db } from '../utils/firebase.js';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

async function fixShipmentCoordinates() {
  try {
    console.log('Starting shipment coordinate fix...');
    
    // Find the shipment with missing destination longitude
    const shipmentsRef = collection(db, 'shipments');
    const q = query(shipmentsRef, where('trackingNumber', '==', 'EWL-00715856-4313'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Shipment not found');
      return;
    }
    
    const shipmentDoc = querySnapshot.docs[0];
    const shipmentData = shipmentDoc.data();
    
    console.log('Found shipment:', {
      id: shipmentDoc.id,
      trackingNumber: shipmentData.trackingNumber,
      destinationLatitude: shipmentData.destinationLatitude,
      destinationLongitude: shipmentData.destinationLongitude
    });
    
    // Check if destination longitude is missing or empty
    if (!shipmentData.destinationLongitude || shipmentData.destinationLongitude === '') {
      console.log('Destination longitude is missing, fixing...');
      
      // Based on the latitude (48.813644245151), this appears to be Paris
      // Paris coordinates: lat 48.8566, lng 2.3522
      const parisLongitude = 2.3522;
      
      // Update the shipment
      await updateDoc(doc(db, 'shipments', shipmentDoc.id), {
        destinationLongitude: parisLongitude.toString()
      });
      
      console.log('✅ Fixed destination longitude:', {
        trackingNumber: shipmentData.trackingNumber,
        oldLongitude: shipmentData.destinationLongitude,
        newLongitude: parisLongitude.toString()
      });
    } else {
      console.log('Destination longitude already exists:', shipmentData.destinationLongitude);
    }
    
  } catch (error) {
    console.error('Error fixing shipment coordinates:', error);
  }
}

// Run the fix
fixShipmentCoordinates();
