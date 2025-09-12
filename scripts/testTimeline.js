// Test script to simulate timeline updates
const testTimelineUpdate = async () => {
  const trackingNumber = 'LT123456789'; // Use a test tracking number
  
  const statusUpdates = [
    {
      status: 'Package Received',
      currentLocationDescription: 'Warehouse - Los Angeles, CA',
      description: 'Package received at origin facility'
    },
    {
      status: 'In Transit', 
      currentLocationDescription: 'Distribution Center - Phoenix, AZ',
      description: 'Package departed from origin, heading to destination'
    },
    {
      status: 'Out for Delivery',
      currentLocationDescription: 'Local Facility - New York, NY', 
      description: 'Package is out for final delivery'
    },
    {
      status: 'Delivered',
      currentLocationDescription: '123 Main St, New York, NY',
      description: 'Package successfully delivered'
    }
  ];

  for (let i = 0; i < statusUpdates.length; i++) {
    const update = statusUpdates[i];
    
    try {
      const response = await fetch('/api/updateShipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingNumber: trackingNumber,
          updatedData: update
        })
      });

      const result = await response.json();
      console.log(`Update ${i + 1}:`, result);
      
      // Wait 2 seconds between updates to simulate real-world timing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error in update ${i + 1}:`, error);
    }
  }
};

// To run this test, paste this into browser console on the admin page
console.log('Timeline test script loaded. Run testTimelineUpdate() to test.');
