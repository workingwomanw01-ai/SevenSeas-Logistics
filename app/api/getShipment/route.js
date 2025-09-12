import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Mock tracking data for demo purposes
const mockTrackingData = {  "LT123456789": {
    trackingNumber: "LT123456789",
    status: "In Transit",
    sender: "John Doe Logistics",
    receiver: "Jane Smith Corp",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    currentLocationDescription: "Distribution Center - Chicago, IL",
    currentLocationPercentage: 66,
    originLatitude: 34.0522,
    originLongitude: -118.2437,
    destinationLatitude: 40.7128,
    destinationLongitude: -74.0060,
    latitude: 41.8781,
    longitude: -87.6298,
    shipmentType: "Express Air Freight",
    weight: "25.5 kg",
    carrier: "LogiTech Express",
    estimatedDeliveryDate: "2025-06-16",
    featuredImage: "https://i.imgur.com/placeholder.jpg", // Test image
    createdAt: "2025-06-12T09:15:00Z",
    statusTimeline: [
      {
        status: "Pending",
        timestamp: new Date("2025-06-12T09:15:00Z"),
        location: "Los Angeles, CA",
        description: "Shipment created and received for processing",
        updatedBy: "system"
      },
      {
        status: "Processing",
        timestamp: new Date("2025-06-12T10:30:00Z"),
        location: "Los Angeles, CA",
        description: "Package being prepared for shipment",
        updatedBy: "warehouse"
      },
      {
        status: "In Transit",
        timestamp: new Date("2025-06-12T14:30:00Z"),
        location: "LAX Airport, CA",
        description: "Package loaded onto aircraft and departed",
        updatedBy: "system"
      },
      {
        status: "In Transit",
        timestamp: new Date("2025-06-14T08:20:00Z"),
        location: "Chicago, IL",
        description: "Package arrived at distribution center",
        updatedBy: "system"
      }
    ]
  },
  "LT987654321": {
    trackingNumber: "LT987654321",
    status: "Delivered",
    sender: "Shanghai Exports Ltd",
    receiver: "Boston Imports Inc",
    origin: "Shanghai, China",
    destination: "Boston, MA",
    currentLocationDescription: "Delivered",
    currentLocationPercentage: 100,
    originLatitude: 31.2304,
    originLongitude: 121.4737,
    destinationLatitude: 42.3601,
    destinationLongitude: -71.0589,
    latitude: 42.3601,
    longitude: -71.0589,
    shipmentType: "Ocean Container Freight",
    weight: "1,250 kg",
    carrier: "Global Seas Shipping",
    estimatedDeliveryDate: "2025-06-10",
    createdAt: "2025-05-15T10:00:00Z",
    deliveredAt: "2025-06-10T15:45:00Z",
    statusTimeline: [
      {
        status: "Pending",
        timestamp: new Date("2025-05-15T10:00:00Z"),
        location: "Shanghai, China",
        description: "Shipment created and received for processing",
        updatedBy: "system"
      },
      {
        status: "Processing",
        timestamp: new Date("2025-05-15T14:00:00Z"),
        location: "Shanghai Port, China",
        description: "Container loaded at port of origin",
        updatedBy: "port_authority"
      },
      {
        status: "In Transit",
        timestamp: new Date("2025-05-16T18:00:00Z"),
        location: "Shanghai, China",
        description: "Vessel MV Pacific Glory departed Shanghai",
        updatedBy: "system"
      },
      {
        status: "In Transit",
        timestamp: new Date("2025-06-05T08:30:00Z"),
        location: "Los Angeles, CA",
        description: "Container arrived at destination port",
        updatedBy: "system"
      },
      {
        status: "In Transit",
        timestamp: new Date("2025-06-07T14:15:00Z"),
        location: "Los Angeles, CA",
        description: "Container cleared customs inspection",
        updatedBy: "customs"
      },
      {
        status: "Out for Delivery",
        timestamp: new Date("2025-06-10T09:00:00Z"),
        location: "Boston, MA",
        description: "Container loaded for final delivery",
        updatedBy: "delivery_team"
      },
      {
        status: "Delivered",
        timestamp: new Date("2025-06-10T15:45:00Z"),
        location: "Boston, MA",
        description: "Container delivered to consignee warehouse",
        updatedBy: "delivery_team"
      }
    ]
  }
};

export async function POST(request) {
  try {
    const { trackingNumber } = await request.json();
    const shipmentsRef = collection(db, "shipments");
    const q = query(shipmentsRef, where("trackingNumber", "==", trackingNumber));
    const querySnapshot = await getDocs(q);
    
    let shipmentData;
    
    if (querySnapshot.empty) {
      // Check if this is a mock tracking number
      if (mockTrackingData[trackingNumber]) {
        console.log('Using mock data for tracking number:', trackingNumber);
        shipmentData = mockTrackingData[trackingNumber];
        
        // Ensure coordinates are in the correct format
        const coordinates = [
          Number(shipmentData.longitude),
          Number(shipmentData.latitude)
        ];
        
        shipmentData.currentPosition = coordinates;
          return NextResponse.json({ 
          message: "Shipment found",
          shipmentData,
          source: 'mock'
        }, { status: 200 });
      } else {
        return NextResponse.json({ 
          message: "Shipment not found",
          error: "No shipment found with the provided tracking number"
        }, { status: 404 });
      }}    const data = querySnapshot.docs[0].data();
    
    console.log('Raw data from DB:', {
      latitude: data.latitude,
      longitude: data.longitude,
      featuredImage: data.featuredImage,
      hasImage: !!data.featuredImage,
      allFields: Object.keys(data),
      type: {
        lat: typeof data.latitude,
        lng: typeof data.longitude
      }
    });
    
    // Ensure coordinates are in the correct order for Mapbox [longitude, latitude]
    const coordinates = [
      Number(data.longitude),
      Number(data.latitude)
    ];

    console.log('Coordinate validation:', {
      original: { lat: data.latitude, lng: data.longitude },
      processed: coordinates,
      validation: {
        isValid: coordinates.every(coord => !isNaN(coord)),
        inRange: coordinates[0] >= -180 && coordinates[0] <= 180 && 
                coordinates[1] >= -90 && coordinates[1] <= 90
      }
    });
    
    shipmentData = {
      id: querySnapshot.docs[0].id,
      ...data,
      currentPosition: coordinates
    };

    console.log('Final shipment data:', {
      coords: shipmentData.currentPosition,
      trackingNumber: shipmentData.trackingNumber
    });

    return NextResponse.json({ 
      message: "Shipment found",
      shipmentData 
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching shipment:", error);
    return NextResponse.json({ 
      message: "Error fetching shipment",
      error: error.message
    }, { status: 500 });
  }
}
