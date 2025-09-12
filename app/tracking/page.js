"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Eye, Radar, Zap, Globe, Shield, Plane, Ship, Navigation } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamic imports for map components
const ShipmentTrackingMap = dynamic(() => import('./ShipmentTrackingMapClean'), {
  ssr: false,
  loading: () => (<div className="w-full h-[500px] bg-gradient-to-br from-red-50 to-orange-100 animate-pulse rounded-xl flex items-center justify-center border border-orange-200">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-red-600 font-medium">Loading interactive map...</p>
      </div>
    </div>
  )
})

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('delivered')) {
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: '✓' };
    } else if (statusLower.includes('transit') || statusLower.includes('shipping')) {
      return { bg: 'bg-[#c9a96e]/20', text: 'text-[#8b1538]', border: 'border-[#c9a96e]', icon: '🚛' };
    } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: '⏳' };
    } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: '✗' };
    } else {
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: '📦' };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 ${config.bg} ${config.text} ${config.border} font-semibold text-lg shadow-sm`}>
      <span className="mr-2 text-xl">{config.icon}</span>
      <span className="uppercase tracking-wide">{status}</span>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ title, children, icon, gradient = false }) => (
  <div className={`${gradient ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-white'} rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-8`}>
    <div className="flex items-center mb-4">
      {icon && <span className="text-2xl mr-3">{icon}</span>}
      <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-1">{title}</h2>
    </div>
    {children}
  </div>
);

// Info Row Component
const InfoRow = ({ label, value, highlight = false }) => (  <div className={`flex flex-col py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${highlight ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}>
    <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{label}:</span>
    <span className={`text-gray-900 mt-1 ${highlight ? 'font-bold text-orange-800' : ''}`}>{value || 'N/A'}</span>
  </div>
);

// Safe Date Formatter Helper
const formatDate = (date) => {
  if (!date) return 'N/A';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'N/A';
    
    return dateObj.toLocaleDateString();
  } catch (error) {
    return 'N/A';
  }
};

const formatTime = (date) => {
  if (!date) return 'N/A';
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'N/A';
    
    return dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } catch (error) {
    return 'N/A';
  }
};

const formatDateTime = (date) => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  
  if (formattedDate === 'N/A' || formattedTime === 'N/A') {
    return 'Date not available';
  }
  
  return `${formattedDate} at ${formattedTime}`;
};

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#f4f1e8] via-[#c9a96e]/20 to-[#b8965a]/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b1538] font-medium text-lg">Loading tracking page...</p>
        </div>
      </div>
    }>
      <TrackingPageContent />
    </Suspense>
  )
}

function TrackingPageContent() {
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [animationStep, setAnimationStep] = useState(0)
  const [showMap, setShowMap] = useState(false)
  const [shipmentData, setShipmentData] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const printRef = useRef()
    // Check for tracking number in URL parameters and auto-search
  useEffect(() => {
    const urlTrackingNumber = searchParams.get('trackingNumber')
    if (urlTrackingNumber && urlTrackingNumber.trim()) {
      console.log('URL Parameter detected:', urlTrackingNumber);
      setTrackingNumber(urlTrackingNumber.trim())      // Auto-submit the search using the same logic as handleTrackingSubmit
      const searchForm = async (retryCount = 0) => {
        console.log('Starting URL auto-search for:', urlTrackingNumber.trim(), 'Retry:', retryCount);
        setIsLoading(true)
        setError("")
        setTrackingResult(null)
        setShipmentData(null)

        try {
          const res = await fetch('/api/getShipment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackingNumber: urlTrackingNumber.trim() }),
          })

          console.log('URL Auto-search - Response status:', res.status);
          
          if (res.status === 200) {
            const data = await res.json()
            console.log('URL Auto-search - Full response:', data);
            console.log('URL Auto-search - Raw shipment data received:', data.shipmentData);
            console.log('URL Auto-search - Data source:', data.source);
            
            if (!data.shipmentData) {
              console.error('URL Auto-search - No shipmentData in response:', data);
              setError("Invalid response format from server. Please try again.");
              return;
            }
            
            setShipmentData(data.shipmentData);
            
            // Extract origin coordinates - always store as [lng, lat] for Mapbox
            let originCoords = null;
            if (data.shipmentData.originLatitude && data.shipmentData.originLongitude) {
              const lng = parseFloat(data.shipmentData.originLongitude);
              const lat = parseFloat(data.shipmentData.originLatitude);
              console.log('URL Auto-search - Origin coords parsed:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
              if (!isNaN(lng) && !isNaN(lat)) {
                originCoords = [lng, lat]; // [lng, lat] format for Mapbox
              }
            }

            // Extract destination coordinates - always store as [lng, lat] for Mapbox
            let destinationCoords = null;
            if (data.shipmentData.destinationLatitude && data.shipmentData.destinationLongitude) {
              const lng = parseFloat(data.shipmentData.destinationLongitude);
              const lat = parseFloat(data.shipmentData.destinationLatitude);
              if (!isNaN(lng) && !isNaN(lat)) {
                destinationCoords = [lng, lat];
                console.log('URL Auto-search - Destination coords parsed:', { lat, lng, valid: true });
              }
            }
            
            // Extract current position coordinates
            let currentPosition = null;
            if (data.shipmentData.currentPosition && Array.isArray(data.shipmentData.currentPosition)) {
              const [lng, lat] = data.shipmentData.currentPosition;
              console.log('URL Auto-search - Current position from array:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
              if (!isNaN(lng) && !isNaN(lat)) {
                currentPosition = [lng, lat];
              }
            } else if (data.shipmentData.latitude && data.shipmentData.longitude) {
              const lng = parseFloat(data.shipmentData.longitude);
              const lat = parseFloat(data.shipmentData.latitude);
              console.log('URL Auto-search - Current position from lat/lng fields:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
              if (!isNaN(lng) && !isNaN(lat)) {
                currentPosition = [lng, lat];
              }
            }
            
            // Use current position or calculate from route progress
            if (!currentPosition && originCoords && destinationCoords && data.shipmentData.currentLocationPercentage) {
              const progress = parseFloat(data.shipmentData.currentLocationPercentage) / 100;
              currentPosition = [
                originCoords[0] + (destinationCoords[0] - originCoords[0]) * progress,
                originCoords[1] + (destinationCoords[1] - originCoords[1]) * progress
              ];
              console.log('URL Auto-search - Calculated current position from percentage:', { 
                progress: data.shipmentData.currentLocationPercentage, 
                calculatedPosition: currentPosition 
              });
            }
            
            console.log('URL Auto-search - Final coordinates for map:', {
              originCoords,
              destinationCoords,
              currentPosition
            });
            
            // Set coordinates for map display
            if (currentPosition) {
              setCoordinates(currentPosition);
            } else if (originCoords) {
              setCoordinates(originCoords);
            } else if (destinationCoords) {
              setCoordinates(destinationCoords);
            }
            
            setTrackingResult(data.shipmentData)
          } else if (res.status === 404) {
            const errorData = await res.json()
            console.log('URL Auto-search - 404 response:', errorData);
            setError(errorData.error || errorData.message || "Shipment not found. Please check your tracking number.")
          } else {
            const errorData = await res.json()
            console.log('URL Auto-search - Error response:', errorData);
            setError(errorData.error || errorData.message || "Error fetching shipment data. Please try again.")
          }        } catch (error) {
          console.error('URL Auto-search - Network/Parse error:', error);
          
          // Retry once if this is the first attempt and it's a network error
          if (retryCount === 0 && (error.name === 'TypeError' || error.message.includes('fetch'))) {
            console.log('Retrying URL auto-search due to network error...');
            setTimeout(() => searchForm(1), 1000); // Retry after 1 second
            return;
          }
          
          setError("Network error occurred. Please check your connection and try again.")
        } finally {
          setIsLoading(false)
        }
      }
        // Add a small delay to ensure the component is fully mounted and API is ready
      const delayedSearch = () => {
        setTimeout(searchForm, 200); // Increased delay to 200ms
      };
      
      delayedSearch();
    }
  }, [searchParams])
  // Mock tracking data - in a real app, this would come from an API
  const mockTrackingData = {
    "LT123456789": {
      status: "In Transit",
      statusCode: "in_transit", 
      estimatedDelivery: "2025-06-16",
      currentLocation: "Distribution Center - Chicago, IL",
      trackingNumber: "LT123456789",
      service: "Express Air Freight",
      serviceIcon: "plane",
      origin: "Los Angeles, CA",
      destination: "New York, NY",
      weight: "25.5 kg",
      dimensions: "60 x 40 x 30 cm",
      priority: "High",      carrier: "LogiTech Express",
      estimatedSpeed: "850 km/h",
      co2Saved: "12.3 kg",
      // Add origin and destination coordinates for route mapping
      originLatitude: 34.0522,    // Los Angeles
      originLongitude: -118.2437,
      destinationLatitude: 40.7128, // New York
      destinationLongitude: -74.0060,route: {
        coordinates: [
          { lat: 34.0522, lng: -118.2437, city: "Los Angeles, CA" },
          { lat: 33.4484, lng: -112.0740, city: "Phoenix, AZ" },
          { lat: 41.8781, lng: -87.6298, city: "Chicago, IL" },
          { lat: 40.7128, lng: -74.0060, city: "New York, NY" }
        ],
        currentPosition: 2
      },
      // Add current location coordinates and percentage for map display
      latitude: 41.8781,  // Chicago coordinates (current position)
      longitude: -87.6298,
      currentLocationPercentage: 66, // 66% of the way from LA to NY (at Chicago)
      timeline: [
        {
          status: "Package Received",
          location: "Los Angeles, CA",
          date: "2025-06-12",
          time: "09:15 AM",
          completed: true,
          description: "Package received at origin facility",
          icon: "package",
          milestone: true
        },
        {
          status: "Security Scan",
          location: "Los Angeles, CA",
          date: "2025-06-12",
          time: "10:30 AM",
          completed: true,
          description: "Package cleared security screening",
          icon: "shield"
        },
        {
          status: "Loading for Air Transport",
          location: "LAX Airport, CA",
          date: "2025-06-12",
          time: "02:30 PM",
          completed: true,
          description: "Package loaded onto aircraft LG-847",
          icon: "plane",
          milestone: true
        },
        {
          status: "In Flight",
          location: "35,000 ft above Arizona",
          date: "2025-06-13",
          time: "11:45 AM",
          completed: true,
          description: "Aircraft en route to Chicago hub",
          icon: "radar"
        },
        {
          status: "Arrived at Hub",
          location: "Chicago, IL",
          date: "2025-06-14",
          time: "08:20 AM",
          completed: true,
          description: "Package processed at distribution center",
          icon: "truck",
          milestone: true
        },
        {
          status: "Final Mile Preparation",
          location: "New York, NY",
          date: "2025-06-16",
          time: "Expected 6:00 AM",
          completed: false,
          description: "Package prepared for final delivery",
          icon: "package"
        },
        {
          status: "Out for Delivery",
          location: "New York, NY",
          date: "2025-06-16",
          time: "Expected 9:00 AM",
          completed: false,
          description: "Package out for delivery",
          icon: "truck",
          milestone: true
        },
        {
          status: "Delivered",
          location: "New York, NY",
          date: "2025-06-16",
          time: "Expected 2:00 PM",
          completed: false,
          description: "Package delivered to recipient",
          icon: "checkCircle",
          milestone: true
        }
      ]
    },
    "LT987654321": {
      status: "Delivered",
      statusCode: "delivered",
      estimatedDelivery: "2025-06-10",
      currentLocation: "Boston, MA",
      trackingNumber: "LT987654321",
      service: "Ocean Container Freight",
      serviceIcon: "ship",
      origin: "Shanghai, China",
      destination: "Boston, MA",
      weight: "1,250 kg",
      dimensions: "Container 20ft",
      priority: "Standard",      carrier: "Global Seas Shipping",
      estimatedSpeed: "28 knots",
      co2Saved: "245.7 kg",
      // Add origin and destination coordinates for route mapping
      originLatitude: 31.2304,    // Shanghai
      originLongitude: 121.4737,
      destinationLatitude: 42.3601, // Boston
      destinationLongitude: -71.0589,
      route: {
        coordinates: [
          { lat: 31.2304, lng: 121.4737, city: "Shanghai, China" },
          { lat: 35.6762, lng: 139.6503, city: "Tokyo Bay, Japan" },
          { lat: 34.0522, lng: -118.2437, city: "Los Angeles, CA" },
          { lat: 42.3601, lng: -71.0589, city: "Boston, MA" }        ],
        currentPosition: 3
      },
      // Add current location coordinates and percentage for map display
      latitude: 42.3601,  // Boston coordinates (delivered)
      longitude: -71.0589,
      currentLocationPercentage: 100, // 100% - delivered
      timeline: [
        {
          status: "Container Loaded",
          location: "Shanghai Port, China",
          date: "2025-05-15",
          time: "10:00 AM",
          completed: true,
          description: "Container loaded at port of origin",
          icon: "ship",
          milestone: true
        },
        {
          status: "Departed Port",
          location: "Shanghai, China",
          date: "2025-05-16",
          time: "06:00 PM",
          completed: true,
          description: "Vessel MV Pacific Glory departed Shanghai",
          icon: "navigation"
        },
        {
          status: "Ocean Transit",
          location: "Pacific Ocean",
          date: "2025-05-25",
          time: "12:00 PM",
          completed: true,
          description: "Container crossing Pacific Ocean",
          icon: "globe"
        },
        {
          status: "Port Arrival",
          location: "Los Angeles, CA",
          date: "2025-06-05",
          time: "08:30 AM",
          completed: true,
          description: "Container arrived at destination port",
          icon: "ship",
          milestone: true
        },
        {
          status: "Customs Processing",
          location: "Los Angeles, CA",
          date: "2025-06-07",
          time: "02:15 PM",
          completed: true,
          description: "Container cleared customs inspection",
          icon: "shield"
        },
        {
          status: "Rail Transport",
          location: "Cross-country rail",
          date: "2025-06-08",
          time: "09:00 AM",
          completed: true,
          description: "Container loaded for transcontinental rail",
          icon: "truck"
        },
        {
          status: "Final Delivery",
          location: "Boston, MA",
          date: "2025-06-10",
          time: "03:45 PM",
          completed: true,
          description: "Container delivered to consignee warehouse",
          icon: "checkCircle",
          milestone: true
        }
      ]
    }
  }
  // Animation effect for loading
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 4)      }, 500)
      return () => clearInterval(interval)
    }
  }, [isLoading])
  
  const handleTrackingSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setTrackingResult(null)
    setShipmentData(null)

    try {
      console.log('Manual form submit - Tracking number:', trackingNumber);
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber }),
      });        if (res.status === 200) {
        const data = await res.json();
        console.log('Manual form submit - Raw shipment data received:', data.shipmentData);
        console.log('Manual form submit - Data source:', data.source);
        setShipmentData(data.shipmentData);
        
        // Extract origin coordinates - always store as [lng, lat] for Mapbox
        let originCoords = null;
        if (data.shipmentData.originLatitude && data.shipmentData.originLongitude) {
          const lng = parseFloat(data.shipmentData.originLongitude);
          const lat = parseFloat(data.shipmentData.originLatitude);
          console.log('Origin coords parsed:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
          if (!isNaN(lng) && !isNaN(lat)) {
            originCoords = [lng, lat]; // [lng, lat] format for Mapbox
          }
        } else {
          console.log('Origin coordinates missing:', {
            originLatitude: data.shipmentData.originLatitude,
            originLongitude: data.shipmentData.originLongitude,
            availableFields: Object.keys(data.shipmentData)
          });
        }          // Extract destination coordinates - always store as [lng, lat] for Mapbox
        let destinationCoords = null;
        if (data.shipmentData.destinationLatitude && data.shipmentData.destinationLongitude) {
          const lng = parseFloat(data.shipmentData.destinationLongitude);
          const lat = parseFloat(data.shipmentData.destinationLatitude);
          if (!isNaN(lng) && !isNaN(lat)) {
            destinationCoords = [lng, lat];
            console.log('Destination coords parsed:', { lat, lng, valid: true });
          } else {
            console.log('Destination coordinates invalid after parsing:', { lat, lng, originalLat: data.shipmentData.destinationLatitude, originalLng: data.shipmentData.destinationLongitude });
          }
        } else {
          console.log('Destination coordinates missing:', {
            destinationLatitude: data.shipmentData.destinationLatitude,
            destinationLongitude: data.shipmentData.destinationLongitude,
            availableFields: Object.keys(data.shipmentData)
          });
        }
        
        // Extract current position coordinates
        let currentPosition = null;
        if (data.shipmentData.currentPosition && Array.isArray(data.shipmentData.currentPosition)) {
          const [lng, lat] = data.shipmentData.currentPosition;
          console.log('Current position from array:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
          if (!isNaN(lng) && !isNaN(lat)) {
            currentPosition = [lng, lat];
          }
        } else if (data.shipmentData.latitude && data.shipmentData.longitude) {
          const lng = parseFloat(data.shipmentData.longitude);
          const lat = parseFloat(data.shipmentData.latitude);
          console.log('Current position from lat/lng fields:', { lat, lng, valid: !isNaN(lng) && !isNaN(lat) });
          if (!isNaN(lng) && !isNaN(lat)) {
            currentPosition = [lng, lat];
          }
        } else {
          console.log('Current position coordinates missing:', {
            currentPosition: data.shipmentData.currentPosition,
            latitude: data.shipmentData.latitude,
            longitude: data.shipmentData.longitude,
            availableFields: Object.keys(data.shipmentData)
          });
        }
        
        // Use current position or calculate from route progress
        if (!currentPosition && originCoords && destinationCoords && data.shipmentData.currentLocationPercentage) {
          const progress = parseFloat(data.shipmentData.currentLocationPercentage) / 100;
          currentPosition = [
            originCoords[0] + (destinationCoords[0] - originCoords[0]) * progress,
            originCoords[1] + (destinationCoords[1] - originCoords[1]) * progress
          ];
          console.log('Calculated current position from percentage:', { 
            progress: data.shipmentData.currentLocationPercentage, 
            calculatedPosition: currentPosition 
          });
        }
        
        console.log('Final coordinates for map:', {
          originCoords,
          destinationCoords,
          currentPosition
        });
        
        // Set coordinates for map display
        if (currentPosition) {
          setCoordinates(currentPosition);
        } else if (originCoords) {
          setCoordinates(originCoords);
        }        // Create a tracking result for compatibility with existing UI
        setTrackingResult({
          status: data.shipmentData.status,
          statusCode: data.shipmentData.status?.toLowerCase().replace(' ', '_'),
          estimatedDelivery: data.shipmentData.estimatedDeliveryDate,
          currentLocation: data.shipmentData.currentLocationDescription || `${data.shipmentData.status}`,
          trackingNumber: data.shipmentData.trackingNumber,
          service: data.shipmentData.shipmentType || "Standard Shipping",
          serviceIcon: "truck",
          origin: data.shipmentData.origin,
          destination: data.shipmentData.destination,
          weight: data.shipmentData.weight,
          carrier: data.shipmentData.carrier,
          // Add coordinates for map display
          originCoords: originCoords,
          destinationCoords: destinationCoords,
          currentPosition: currentPosition,
          currentLocationPercentage: data.shipmentData.currentLocationPercentage || 0,
          // Add timeline and route data
          timeline: [
            {
              status: "Package received",
              time: data.shipmentData.createdAt || new Date().toISOString(),
              location: data.shipmentData.origin,
              description: "Package has been received and is being processed",
              completed: true
            },
            {
              status: "In transit",
              time: data.shipmentData.departureTime || new Date().toISOString(),
              location: data.shipmentData.currentLocationDescription || "In transit",
              description: "Package is on its way to destination",
              completed: data.shipmentData.status !== "Pending"
            },
            {
              status: "Out for delivery",
              time: data.shipmentData.estimatedDeliveryDate,
              location: data.shipmentData.destination,
              description: "Package is out for delivery",
              completed: data.shipmentData.status === "Delivered"
            },
            {
              status: "Delivered",
              time: data.shipmentData.estimatedDeliveryDate,
              location: data.shipmentData.destination,
              description: "Package has been delivered successfully",
              completed: data.shipmentData.status === "Delivered"
            }
          ],
          route: {
            coordinates: [
              { city: data.shipmentData.origin, lat: data.shipmentData.originLatitude, lng: data.shipmentData.originLongitude },
              { city: data.shipmentData.destination, lat: data.shipmentData.destinationLatitude, lng: data.shipmentData.destinationLongitude }
            ].filter(coord => coord.lat && coord.lng), // Only include coordinates that exist
            currentPosition: Math.floor((data.shipmentData.currentLocationPercentage || 0) / 50) // Convert percentage to route position
          }
        });
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Tracking number not found. Please check the number and try again.");
      }
    } catch (error) {
      setError("Error fetching shipment data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  const getServiceIcon = (serviceIcon) => {
    switch (serviceIcon) {
      case "plane":
        return <Plane className="w-8 h-8 text-orange-500" />
      case "ship":
        return <Ship className="w-8 h-8 text-cyan-500" />
      case "truck":
        return <Truck className="w-8 h-8 text-green-500" />
      default:
        return <Package className="w-8 h-8 text-gray-500" />
    }
  }
  const getTimelineIcon = (iconType, completed) => {
    const baseClasses = `w-5 h-5 ${completed ? 'text-white' : 'text-gray-400'}`
    
    switch (iconType) {
      case "package":
        return <Package className={baseClasses} />
      case "plane":
        return <Plane className={baseClasses} />
      case "ship":
        return <Ship className={baseClasses} />
      case "truck":
        return <Truck className={baseClasses} />
      case "shield":
        return <Shield className={baseClasses} />
      case "radar":
        return <Radar className={baseClasses} />
      case "globe":
        return <Globe className={baseClasses} />
      case "navigation":
        return <Navigation className={baseClasses} />
      case "checkCircle":
        return <CheckCircle className={baseClasses} />
      case "clock":
        return <Clock className={baseClasses} />
      case "edit":
        return <span className={`text-sm ${completed ? 'text-white' : 'text-gray-400'}`}>✏️</span>
      case "alertCircle":
        return <span className={`text-sm ${completed ? 'text-white' : 'text-gray-400'}`}>⚠️</span>
      default:
        return <Clock className={baseClasses} />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Standard":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  
  const getStatusColor = (statusCode) => {
    switch (statusCode) {
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200"
      case "in_transit":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }
  const RouteMap = ({ route, currentPosition }) => {
    // Safety check for route data
    if (!route || !route.coordinates || !Array.isArray(route.coordinates)) {
      return null;
    }

    return (
      <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">        {/* <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-orange-600" />
          Live Route Tracking
        </h4> */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            {route.coordinates.map((coord, index) => (
              <div key={index} className="flex flex-col items-center relative">                <div className={`w-4 h-4 rounded-full border-2 ${
                  index <= currentPosition 
                    ? 'bg-orange-600 border-orange-600' 
                    : 'bg-white border-gray-300'
                }`}>
                  {index === currentPosition && (
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-orange-600 rounded-full animate-ping opacity-30"></div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center max-w-20">{coord.city}</p>
                {index < route.coordinates.length - 1 && (                  <div className={`absolute top-2 left-6 h-px w-16 ${
                    index < currentPosition ? 'bg-orange-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              <Radar className="w-4 h-4 mr-2" />
              Currently at: {route.coordinates[currentPosition]?.city}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f1e8] via-[#c9a96e]/10 to-[#b8965a]/10">
      {/* Animated Hero Section */}        <div className="relative bg-gradient-to-r from-[#8b1538] via-[#6b1129] to-[#8b1538] py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white rounded-full animate-pulse delay-700"></div>
        </div>
          {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/images/step-03.jpg')"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">            <div className="relative">
              <Radar className="w-16 h-16 text-[#c9a96e] animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 w-16 h-16 border-4 border-[#c9a96e] rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Smart Tracking
              </h1>              <p className="text-xl text-gray-100">
                Real-time visibility into your shipment's journey
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Enhanced Tracking Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a96e]/20 to-[#b8965a]/20 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#c9a96e]/20 to-[#b8965a]/20 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h2>
              <p className="text-gray-600">Enter your tracking number for real-time updates and detailed journey insights</p>
            </div>
            
            <form onSubmit={handleTrackingSubmit} className="space-y-6">
              <div>
                <label htmlFor="tracking-number" className="block text-sm font-semibold text-gray-700 mb-3">
                  Tracking Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="tracking-number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number (e.g., LT123456789)"
                    className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c9a96e] focus:border-[#c9a96e] text-lg transition-all duration-200"
                    required
                  />
                  <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8b1538] to-[#6b1129] hover:from-[#6b1129] hover:to-[#8b1538] disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 bg-white rounded-full animate-bounce ${animationStep === 0 ? 'opacity-100' : 'opacity-30'}`}></div>
                      <div className={`w-2 h-2 bg-white rounded-full animate-bounce delay-150 ${animationStep === 1 ? 'opacity-100' : 'opacity-30'}`}></div>
                      <div className={`w-2 h-2 bg-white rounded-full animate-bounce delay-300 ${animationStep === 2 ? 'opacity-100' : 'opacity-30'}`}></div>
                    </div>
                    <span>Scanning Global Network...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Radar className="w-5 h-5" />
                    <span>Track Shipment</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 animate-shake">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}        {/* Enhanced Tracking Results */}
        {trackingResult && (
          <div className="space-y-8" ref={printRef}>
            {/* Print Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Shipment Details</h2>
              <button 
                onClick={() => {
                  const printContent = printRef.current.innerHTML;
                  const originalContent = document.body.innerHTML;
                  document.body.innerHTML = printContent;
                  window.print();
                  document.body.innerHTML = originalContent;
                  window.location.reload();
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
              >
                <span className="text-lg">🖨️</span>
                Print Track Result
              </button>
            </div>

            {/* Status Banner */}
            <div className="bg-gradient-to-r from-[#8b1538] to-[#6b1129] rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between text-white">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Tracking Status</h2>
                  <p className="text-gray-200">Tracking Number: <span className="font-mono font-bold">{trackingNumber}</span></p>
                </div>
                <StatusBadge status={shipmentData?.status} />
              </div>
            </div>

            {shipmentData && (
              <>
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  <InfoCard title="Shipper Information" icon="📤">
                    <div className="space-y-4">
                      <InfoRow label="Name" value={shipmentData.sender} />
                      <InfoRow label="Address" value={shipmentData.senderAddress} />
                      <InfoRow label="Phone" value={shipmentData.senderNumber} />
                      <InfoRow label="Email" value={shipmentData.senderEmail} />
                    </div>
                  </InfoCard>

                  <InfoCard title="Receiver Information" icon="📥">
                    <div className="space-y-4">
                      <InfoRow label="Name" value={shipmentData.receiver} />
                      <InfoRow label="Email" value={shipmentData.receiverEmail} />
                      <InfoRow label="Phone" value={shipmentData.receiverNumber} />
                      <InfoRow label="Address" value={shipmentData.receiverAddress} />
                    </div>
                  </InfoCard>
                </div>

                {/* Shipment Details */}
                <InfoCard title="Detailed Shipment Information" icon="📋" gradient={true}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: "Origin", value: shipmentData.origin, highlight: true },
                      { label: "Destination", value: shipmentData.destination, highlight: true },
                      { label: "Package Type", value: shipmentData.packages },
                      { label: "Carrier", value: shipmentData.carrier },
                      { label: "Shipment Type", value: shipmentData.shipmentType },
                      { label: "Weight", value: shipmentData.weight },
                      { label: "Shipment Mode", value: shipmentData.mode },
                      { label: "Carrier Reference No.", value: shipmentData.carrierReferenceNo },
                      { label: "Product", value: shipmentData.product },
                      { label: "Quantity", value: shipmentData.quantity },
                      { label: "Payment Mode", value: shipmentData.paymentMethod },
                      { label: "Total Freight", value: shipmentData.totalFreight, highlight: true },
                      { label: "Expected Delivery Date", value: shipmentData.estimatedDeliveryDate, highlight: true },
                      { label: "Departure Time", value: shipmentData.departureTime },
                      { label: "Pickup Date", value: shipmentData.pickupDate },
                      { label: "Pickup Time", value: shipmentData.pickupTime },
                      { label: "Comments", value: shipmentData.comments }
                    ].map(({ label, value, highlight }) => (
                      <InfoRow key={label} label={label} value={value} highlight={highlight} />
                    ))}
                  </div>
                </InfoCard>

                {/* Package Details */}
                <InfoCard title="Package Specifications" icon="📦">
                  {shipmentData.productQuantity > 0 ||
                  shipmentData.productType != "" ||
                  shipmentData.description != "" ||
                  shipmentData.length != "" ||
                  shipmentData.width != "" ||
                  shipmentData.productWeight != "" ||
                  shipmentData.height != "" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoRow label="Quantity" value={shipmentData.productQuantity} />
                      <InfoRow label="Piece Type" value={shipmentData.productType} />
                      <div className="md:col-span-2">
                        <InfoRow label="Description" value={shipmentData.description?.toUpperCase()} />
                      </div>
                      {shipmentData.length && <InfoRow label="Length (inches)" value={shipmentData.length} highlight={true} />}
                      {shipmentData.width && <InfoRow label="Width (inches)" value={shipmentData.width} highlight={true} />}
                      {shipmentData.height && <InfoRow label="Height (inches)" value={shipmentData.height} highlight={true} />}
                      {shipmentData.productWeight && <InfoRow label="Weight (lbs)" value={shipmentData.productWeight} highlight={true} />}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <span className="text-4xl mb-4 block">📭</span>
                      <p className="text-lg">No package specifications available</p>
                    </div>
                  )}                </InfoCard>                {/* Featured Image */}
                {(shipmentData.featuredImage || shipmentData.image || shipmentData.shipmentImage) && (
                  <InfoCard title="Shipment Image" icon="📷">
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={shipmentData.featuredImage || shipmentData.image || shipmentData.shipmentImage} 
                          alt="Shipment featured image" 
                          className="w-full max-w-2xl mx-auto h-auto max-h-96 object-cover rounded-lg border border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                          onClick={() => setShowImageModal(true)}
                          onLoad={() => console.log('Featured image loaded successfully')}
                          onError={(e) => {
                            console.error('Featured image failed to load:', e);
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <div className="hidden text-center py-8 text-gray-500">
                          <span className="text-4xl mb-4 block">🖼️</span>
                          <p className="text-lg">Image could not be loaded</p>
                          <p className="text-sm mt-2">URL: {shipmentData.featuredImage || shipmentData.image || shipmentData.shipmentImage}</p>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="bg-white rounded-full p-2 shadow-lg">
                            <Eye className="w-6 h-6 text-gray-700" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">Shipment documentation image</p>
                        <button
                          onClick={() => setShowImageModal(true)}
                          className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto"
                        >
                          <Eye className="w-4 h-4" />
                          Click to view full size
                        </button>
                      </div>
                    </div>
                  </InfoCard>)}
                                  {/* Debug Info - Temporary */}
                {/* <InfoCard title="Debug Info" icon="🐛">
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <p><strong>Has featuredImage:</strong> {shipmentData.featuredImage ? '✅ Yes' : '❌ No'}</p>
                        <p><strong>Image URL Length:</strong> {shipmentData.featuredImage?.length || 0}</p>
                        <p><strong>Image Type:</strong> {typeof shipmentData.featuredImage}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p><strong>Tracking Number:</strong> {shipmentData.trackingNumber}</p>
                        <p><strong>Data Keys:</strong> {Object.keys(shipmentData).length}</p>
                        <p><strong>Has Image Key:</strong> {Object.keys(shipmentData).includes('featuredImage') ? '✅' : '❌'}</p>
                      </div>
                    </div>
                    {shipmentData.featuredImage && (
                      <div className="bg-yellow-50 p-3 rounded">
                        <p><strong>Image URL:</strong></p>
                        <p className="break-all text-xs bg-white p-2 rounded border">{shipmentData.featuredImage}</p>
                        <div className="mt-2">
                          <img 
                            src={shipmentData.featuredImage} 
                            alt="Debug test" 
                            className="h-20 w-auto rounded border"
                            onLoad={() => console.log('Debug image loaded successfully')}
                            onError={(e) => {
                              console.error('Debug image failed to load:', e);
                              e.target.style.border = '2px solid red';
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <details>
                      <summary className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800">
                        View Raw Shipment Data
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                        {JSON.stringify(shipmentData, null, 2)}
                      </pre>
                    </details>
                  </div>
                </InfoCard> */}

                {/* Tracking Map */}<InfoCard title="Live Tracking & Route" icon="🗺️">
                  {(() => {
                    console.log('Map rendering check:', {
                      coordinates,
                      isArray: Array.isArray(coordinates),
                      length: coordinates?.length,
                      validCoords: coordinates && Array.isArray(coordinates) && coordinates.length === 2 && 
                                   !isNaN(coordinates[0]) && !isNaN(coordinates[1]),
                      originCoords: shipmentData.originLongitude && shipmentData.originLatitude 
                        ? [parseFloat(shipmentData.originLongitude), parseFloat(shipmentData.originLatitude)]
                        : null,
                      destinationCoords: shipmentData.destinationLongitude && shipmentData.destinationLatitude 
                        ? [parseFloat(shipmentData.destinationLongitude), parseFloat(shipmentData.destinationLatitude)]
                        : null,
                      currentLocationPercentage: shipmentData.currentLocationPercentage
                    });
                    return null;
                  })()}
                  {coordinates && Array.isArray(coordinates) && coordinates.length === 2 && 
                   !isNaN(coordinates[0]) && !isNaN(coordinates[1]) ? (
                    <div className="space-y-6">
                      <div className="w-full h-[500px] relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                        <ShipmentTrackingMap 
                          currentLocation={coordinates}
                          currentLocationPercentage={shipmentData.currentLocationPercentage}
                          originCoords={
                            shipmentData.originLongitude && shipmentData.originLatitude 
                              ? [parseFloat(shipmentData.originLongitude), parseFloat(shipmentData.originLatitude)]
                              : null
                          }
                          destinationCoords={
                            shipmentData.destinationLongitude && shipmentData.destinationLatitude 
                              ? [parseFloat(shipmentData.destinationLongitude), parseFloat(shipmentData.destinationLatitude)]
                              : null
                          }
                          shipmentStatus={shipmentData.status}                        />
                      </div>
                      
                      {/* Route Legend */}
                      {shipmentData.originLongitude && shipmentData.originLatitude && 
                       shipmentData.destinationLongitude && shipmentData.destinationLatitude ? (
                        <div className="bg-gradient-to-r from-[#f4f1e8] to-[#c9a96e]/10 p-6 rounded-xl border border-[#c9a96e]/30">
                          <h3 className="font-bold text-lg mb-4 text-gray-800">Route Overview</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 shadow-sm"></div>
                              <div>
                                <span className="font-semibold text-green-800">Origin</span>
                                <p className="text-sm text-gray-600">{shipmentData.senderAddress || 'Starting point'}</p>
                              </div>
                            </div>
                            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                              <div className="w-4 h-4 bg-[#c9a96e] rounded-full mr-3 animate-pulse shadow-sm"></div>
                              <div>
                                <span className="font-semibold text-[#8b1538]">Current Location</span>
                                <p className="text-sm text-gray-600">
                                  {shipmentData.currentLocationDescription || 
                                   shipmentData.currentLocation || 
                                   `${shipmentData.currentLocationPercentage || 0}% to destination` ||
                                   'In Transit'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                              <div className="w-4 h-4 bg-[#8b1538] rounded-full mr-3 shadow-sm"></div>
                              <div>
                                <span className="font-semibold text-[#8b1538]">Destination</span>
                                <p className="text-sm text-gray-600">{shipmentData.receiverAddress || 'Final destination'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-yellow-50 to-[#c9a96e]/10 p-6 rounded-xl border border-yellow-200">
                          <h3 className="font-bold text-lg mb-2 text-yellow-800">⚠️ Route Information Incomplete</h3>
                          <p className="text-yellow-700 mb-3">
                            Complete route cannot be displayed because some location coordinates are missing from this shipment.
                          </p>
                          <div className="text-sm text-yellow-600">
                            <p><strong>Available:</strong></p>
                            <ul className="list-disc ml-5 space-y-1">
                              {shipmentData.originLongitude && shipmentData.originLatitude && (
                                <li>✅ Origin coordinates</li>
                              )}
                              {(!shipmentData.originLongitude || !shipmentData.originLatitude) && (
                                <li>❌ Origin coordinates missing</li>
                              )}
                              {shipmentData.destinationLongitude && shipmentData.destinationLatitude && (
                                <li>✅ Destination coordinates</li>
                              )}
                              {(!shipmentData.destinationLongitude || !shipmentData.destinationLatitude) && (
                                <li>❌ Destination coordinates missing</li>
                              )}
                              <li>📍 Current location tracking available</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-[#c9a96e]/5 rounded-xl border-2 border-dashed border-gray-300">
                      <span className="text-6xl mb-4 block">🗺️</span>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Location Tracking Unavailable</h3>
                      <p className="text-gray-600 mb-4">No valid tracking coordinates available for this shipment</p>
                      <div className="text-xs text-gray-500 bg-white p-3 rounded-lg inline-block">
                        Coordinates: {coordinates ? JSON.stringify(coordinates) : 'undefined'}
                      </div>
                    </div>
                  )}
                </InfoCard>                {/* UPS-Style Shipment Timeline */}
                <InfoCard title="Shipment Timeline & Updates" icon="📅">
                  {(() => {                    // Enhanced timeline that works with both mock data and real Firebase data
                    const createUPSStyleTimeline = (shipmentData) => {
                      const timeline = [];
                      
                      console.log('🔍 Creating timeline for shipment:', {
                        trackingNumber: shipmentData.trackingNumber,
                        hasStatusTimeline: !!(shipmentData.statusTimeline && Array.isArray(shipmentData.statusTimeline)),
                        statusTimelineLength: shipmentData.statusTimeline?.length || 0,
                        currentStatus: shipmentData.status,
                        hasUpdateHistory: !!(shipmentData.updateHistory && Array.isArray(shipmentData.updateHistory)),
                        allKeys: Object.keys(shipmentData)
                      });
                        // Safe date formatter
                      const formatSafeDate = (dateValue) => {
                        if (!dateValue) return null;
                        
                        try {
                          let dateObj;
                          
                          // Handle Firestore timestamp objects with seconds and nanoseconds
                          if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
                            // Convert Firestore timestamp: {seconds: number, nanoseconds: number}
                            dateObj = new Date(dateValue.seconds * 1000 + dateValue.nanoseconds / 1000000);
                          }
                          // Handle Firestore timestamp objects with toDate method
                          else if (dateValue.toDate && typeof dateValue.toDate === 'function') {
                            dateObj = dateValue.toDate();
                          }
                          // Handle regular date strings/numbers
                          else {
                            dateObj = new Date(dateValue);
                          }
                          
                          if (isNaN(dateObj.getTime())) {
                            console.log('❌ Invalid date created from:', dateValue);
                            return null;
                          }
                          
                          console.log('✅ Successfully parsed date:', {
                            input: dateValue,
                            output: dateObj,
                            formatted: dateObj.toISOString()
                          });
                          
                          return dateObj;
                        } catch (error) {
                          console.log('❌ Error parsing date:', error, 'Input:', dateValue);
                          return null;
                        }
                      };

                      // Helper function to get icon for status
                      const getStatusIcon = (status) => {
                        const statusLower = status?.toLowerCase() || '';
                        if (statusLower.includes('delivered')) return 'checkCircle';
                        if (statusLower.includes('out for delivery')) return 'truck';
                        if (statusLower.includes('transit') || statusLower.includes('shipping')) return 'truck';
                        if (statusLower.includes('departed') || statusLower.includes('shipped')) return 'plane';
                        if (statusLower.includes('received') || statusLower.includes('processing')) return 'package';
                        return 'package';
                      };

                      // 1. Shipment Created (always first if we have created date)
                      const createdDate = formatSafeDate(shipmentData.createdAt);
                      if (createdDate) {
                        timeline.push({
                          status: 'Shipment Created',
                          date: createdDate,
                          location: shipmentData.origin || 'Origin',
                          description: 'Shipment information received and processed',
                          icon: 'package',
                          completed: true,
                          isSystemGenerated: true,
                          id: 'created-' + createdDate.getTime()
                        });
                      }

                      // 2. Handle different types of timeline data
                        // First priority: Use statusTimeline if available (this should be your main timeline)
                      if (shipmentData.statusTimeline && Array.isArray(shipmentData.statusTimeline) && shipmentData.statusTimeline.length > 0) {
                        console.log('📊 Using statusTimeline array, length:', shipmentData.statusTimeline.length);
                        console.log('📊 Full statusTimeline data:', shipmentData.statusTimeline);
                        
                        shipmentData.statusTimeline.forEach((entry, index) => {
                          console.log(`🔍 Processing timeline entry ${index + 1}:`, {
                            status: entry.status,
                            timestamp: entry.timestamp,
                            location: entry.location,
                            description: entry.description,
                            updatedBy: entry.updatedBy
                          });
                          
                          const entryDate = formatSafeDate(entry.timestamp);
                          if (entryDate) {
                            const timelineEntry = {
                              status: entry.status,
                              date: entryDate,
                              location: entry.location || entry.currentLocation || shipmentData.currentLocationDescription || 'Unknown Location',
                              description: entry.description || entry.notes || `Status updated to ${entry.status}`,
                              icon: getStatusIcon(entry.status),
                              completed: true,
                              updatedBy: entry.updatedBy || entry.user || 'system',
                              isActualUpdate: true,
                              updateType: entry.updateType || 'status_change',
                              id: entry.id || `timeline-${index}-${entryDate.getTime()}`
                            };
                            
                            console.log(`✅ Added timeline entry:`, timelineEntry);
                            timeline.push(timelineEntry);
                          } else {
                            console.log(`❌ Skipped entry ${index + 1} - invalid date:`, entry.timestamp);
                          }
                        });
                        
                        console.log('📊 Total timeline entries from statusTimeline:', timeline.length);
                      }
                      
                      // Second priority: Use updateHistory if available (historical edits)
                      else if (shipmentData.updateHistory && Array.isArray(shipmentData.updateHistory) && shipmentData.updateHistory.length > 0) {
                        console.log('📋 Using updateHistory array, length:', shipmentData.updateHistory.length);
                        
                        shipmentData.updateHistory.forEach((historyEntry, index) => {
                          const historyDate = formatSafeDate(historyEntry.timestamp || historyEntry.updatedAt || historyEntry.createdAt);
                          if (historyDate) {
                            timeline.push({
                              status: historyEntry.status || historyEntry.action || 'Status Updated',
                              date: historyDate,
                              location: historyEntry.location || shipmentData.currentLocation || shipmentData.origin || 'System',
                              description: historyEntry.description || historyEntry.changes || historyEntry.notes || 'Shipment information was updated',
                              icon: getStatusIcon(historyEntry.status),
                              completed: true,
                              updatedBy: historyEntry.updatedBy || historyEntry.user || historyEntry.adminId || 'admin',
                              isActualUpdate: true,
                              updateType: historyEntry.updateType || 'status_change',
                              changes: historyEntry.changedFields || [],
                              id: historyEntry.id || `history-${index}-${historyDate.getTime()}`
                            });
                          }
                        });
                      }
                      
                      // Third priority: Create basic timeline from current status and available dates
                      else {
                        console.log('🔄 Creating basic timeline from current shipment data');
                        
                        // Add basic status updates based on available timestamps
                        const statusUpdates = [];
                        
                        // Check for pickup/departure information
                        const pickupDate = formatSafeDate(shipmentData.pickupDate || shipmentData.departureTime);
                        if (pickupDate) {
                          statusUpdates.push({
                            status: 'Picked Up',
                            date: pickupDate,
                            location: shipmentData.origin || 'Origin',
                            description: 'Package picked up and accepted into logistics network',
                            icon: 'package',
                            completed: true,
                            isActualUpdate: true,
                            id: 'pickup-' + pickupDate.getTime()
                          });
                        }
                        
                        // Add last updated as current status
                        const lastUpdated = formatSafeDate(shipmentData.updatedAt || shipmentData.lastStatusUpdate);
                        if (lastUpdated && shipmentData.status) {
                          statusUpdates.push({
                            status: shipmentData.status,
                            date: lastUpdated,
                            location: shipmentData.currentLocationDescription || shipmentData.currentLocation || 'In Transit',
                            description: `Current status: ${shipmentData.status}`,
                            icon: getStatusIcon(shipmentData.status),
                            completed: true,
                            isActualUpdate: true,
                            id: 'current-' + lastUpdated.getTime()
                          });
                        }
                        
                        // Add to timeline
                        timeline.push(...statusUpdates);
                      }

                      // 3. Add delivery attempts (if any)
                      if (shipmentData.deliveryAttempts && Array.isArray(shipmentData.deliveryAttempts)) {
                        shipmentData.deliveryAttempts.forEach((attempt, index) => {
                          const attemptDate = formatSafeDate(attempt.timestamp);
                          if (attemptDate) {
                            timeline.push({
                              status: `Delivery Attempt ${attempt.attemptNumber || index + 1}`,
                              date: attemptDate,
                              location: attempt.location || shipmentData.destination || 'Delivery Address',
                              description: attempt.reason || attempt.notes || 'Delivery attempted',
                              icon: attempt.successful ? 'checkCircle' : 'alertCircle',
                              completed: true,
                              isDeliveryAttempt: true,
                              successful: attempt.successful || false,
                              id: `delivery-${index}-${attemptDate.getTime()}`
                            });
                          }
                        });
                      }

                      // 4. Add tracking events (if different from status timeline)
                      if (shipmentData.trackingEvents && Array.isArray(shipmentData.trackingEvents)) {
                        shipmentData.trackingEvents.forEach((event, index) => {
                          const eventDate = formatSafeDate(event.timestamp);
                          if (eventDate) {
                            // Avoid duplicates by checking if similar entry already exists
                            const isDuplicate = timeline.some(item => 
                              Math.abs(item.date.getTime() - eventDate.getTime()) < 60000 && // Within 1 minute
                              item.status === event.eventType
                            );
                            
                            if (!isDuplicate) {
                              timeline.push({
                                status: event.eventType || event.event || 'Tracking Update',
                                date: eventDate,
                                location: event.location || event.city || 'Unknown Location',
                                description: event.description || event.details || 'Tracking event recorded',
                                icon: getStatusIcon(event.eventType),
                                completed: true,
                                isTrackingEvent: true,
                                id: `tracking-${index}-${eventDate.getTime()}`
                              });
                            }
                          }
                        });
                      }

                      // 5. Show expected delivery only if not delivered yet
                      const isDelivered = shipmentData.status?.toLowerCase().includes('delivered');
                      if (!isDelivered) {
                        const deliveryDate = formatSafeDate(shipmentData.estimatedDeliveryDate);
                        if (deliveryDate && deliveryDate > new Date()) {
                          timeline.push({
                            status: 'Expected Delivery',
                            date: deliveryDate,
                            location: shipmentData.destination || 'Destination',
                            description: 'Estimated delivery date',
                            icon: 'clock',
                            completed: false,
                            isExpected: true,
                            id: 'expected-delivery'
                          });
                        }
                      }

                      // Remove duplicates based on ID and sort by date
                      const uniqueTimeline = timeline.filter((item, index, self) => 
                        index === self.findIndex(t => t.id === item.id)
                      );
                      
                      const sortedTimeline = uniqueTimeline.sort((a, b) => a.date - b.date);
                      
                      console.log('✅ Final timeline created:', {
                        totalEntries: sortedTimeline.length,
                        timelineEntries: sortedTimeline.map(t => ({
                          status: t.status,
                          date: t.date,
                          isActualUpdate: t.isActualUpdate,
                          id: t.id
                        }))
                      });
                      
                      return sortedTimeline;
                    };const timeline = createUPSStyleTimeline(shipmentData);
                    
                    return (
                      <div className="space-y-6">
                        {/* Current Status Banner */}
                        <div className="bg-gradient-to-r from-[#c9a96e]/10 to-[#b8965a]/10 rounded-xl p-6 border border-[#c9a96e]/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">Current Status</h4>
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-[#c9a96e] rounded-full animate-pulse"></div>
                                <span className="font-bold text-xl text-gray-800">{shipmentData.status}</span>
                              </div>
                              {shipmentData.currentLocationDescription && (
                                <p className="text-gray-600 mt-1 ml-7">{shipmentData.currentLocationDescription}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* UPS-Style Timeline */}
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Navigation className="w-5 h-5 mr-2 text-[#c9a96e]" />
                            Package Journey Timeline
                          </h4>
                          
                          {timeline.length > 0 ? (
                            <div className="space-y-4">                              {timeline.map((event, index) => (
                                <div key={event.id || index} className="flex items-start space-x-4">
                                  {/* Timeline Icon */}
                                  <div className="flex-shrink-0 relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                      event.completed 
                                        ? event.isActualUpdate
                                          ? "bg-[#8b1538] border-[#8b1538] text-white shadow-lg"
                                          : event.isInformationUpdate
                                            ? "bg-[#c9a96e] border-[#c9a96e] text-white shadow-lg"
                                            : event.isDeliveryAttempt
                                              ? event.successful
                                                ? "bg-green-500 border-green-500 text-white shadow-lg"
                                                : "bg-orange-500 border-orange-500 text-white shadow-lg"
                                              : event.isTrackingEvent
                                                ? "bg-purple-500 border-purple-500 text-white shadow-lg"
                                                : "bg-gray-500 border-gray-500 text-white"
                                        : "bg-gray-100 border-gray-300 text-gray-400"
                                    }`}>
                                      {getTimelineIcon(event.icon, event.completed)}
                                    </div>
                                    
                                    {/* Connecting Line */}
                                    {index < timeline.length - 1 && (
                                      <div className={`w-px h-12 ml-5 mt-2 ${
                                        event.completed ? "bg-[#c9a96e]" : "bg-gray-200"
                                      }`} />
                                    )}

                                    {/* Special badges for different types of updates */}
                                    {event.isActualUpdate && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8b1538] rounded-full border-2 border-white">
                                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                      </div>
                                    )}
                                    {event.isInformationUpdate && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a96e] rounded-full border-2 border-white">
                                        <span className="text-xs text-white font-bold">i</span>
                                      </div>
                                    )}
                                    {event.isDeliveryAttempt && (
                                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                        event.successful ? 'bg-green-600' : 'bg-orange-600'
                                      }`}>
                                        <span className="text-xs text-white font-bold">{event.successful ? '✓' : '!'}</span>
                                      </div>
                                    )}
                                    {event.isTrackingEvent && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full border-2 border-white">
                                        <span className="text-xs text-white font-bold">📍</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Timeline Content */}
                                  <div className={`flex-1 min-w-0 p-4 rounded-lg border-l-4 ${
                                    event.isActualUpdate
                                      ? "bg-[#8b1538]/5 border-[#8b1538]/30"
                                      : event.isInformationUpdate
                                        ? "bg-[#c9a96e]/10 border-[#c9a96e]/30"
                                        : event.isDeliveryAttempt
                                          ? event.successful
                                            ? "bg-green-50 border-green-300"
                                            : "bg-orange-50 border-orange-300"
                                          : event.isTrackingEvent
                                            ? "bg-purple-50 border-purple-300"
                                            : event.isExpected 
                                              ? "bg-blue-50 border-blue-300" 
                                              : event.completed 
                                                ? "bg-gray-50 border-gray-300" 
                                                : "bg-gray-50 border-gray-200"
                                  }`}>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                      <h4 className={`font-bold text-lg flex items-center flex-wrap gap-2 ${
                                        event.completed ? "text-gray-900" : "text-gray-500"
                                      }`}>
                                        {event.status}
                                        {event.isActualUpdate && (
                                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                            ✓ Status Update
                                          </span>
                                        )}
                                        {event.isInformationUpdate && (
                                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                            📝 Info Updated
                                          </span>
                                        )}
                                        {event.isDeliveryAttempt && (
                                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            event.successful 
                                              ? 'bg-green-100 text-green-800' 
                                              : 'bg-orange-100 text-orange-800'
                                          }`}>
                                            {event.successful ? '✅ Delivered' : '📦 Attempt'}
                                          </span>
                                        )}
                                        {event.isTrackingEvent && (
                                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                                            📍 Tracking
                                          </span>
                                        )}
                                        {event.isExpected && (
                                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                            Expected
                                          </span>
                                        )}
                                        {event.isSystemGenerated && (
                                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                            System
                                         
                                          </span>
                                        )}
                                      </h4>
                                      <div className={`text-sm font-medium ${
                                        event.completed ? "text-gray-600" : "text-gray-400"
                                      }`}>
                                        {event.isExpected ? formatDate(event.date) : formatDateTime(event.date)}
                                      </div>
                                    </div>
                                    
                                    <div className={`flex items-center mb-2 ${
                                      event.completed ? "text-gray-700" : "text-gray-400"
                                    }`}>
                                      <MapPin className="w-4 h-4 mr-2" />
                                      <span className="font-medium">{event.location}</span>
                                    </div>
                                    
                                    <p className={`text-sm ${
                                      event.completed ? "text-gray-600" : "text-gray-400"
                                    }`}>
                                      {event.description}
                                    </p>

                                    {/* Show changed fields for information updates */}
                                    {event.isInformationUpdate && event.changes && event.changes.length > 0 && (
                                      <div className="mt-2 p-2 bg-blue-100 rounded-lg">
                                        <p className="text-xs font-medium text-blue-800 mb-1">Fields Updated:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {event.changes.map((field, i) => (
                                            <span key={i} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                                              {field}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* {event.updatedBy && (
                                      <div className="mt-2 flex items-center text-xs text-blue-600">
                                        <span className="mr-1">👤</span>
                                        Updated by: {event.updatedBy}
                                      </div>
                                    )} */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <h3 className="text-lg font-medium mb-2">No Timeline Available</h3>
                              <p>Timeline updates will appear here as your shipment progresses</p>
                            </div>
                          )}
                        </div>     
                                           {/* Enhanced Timeline Information */}

                        
                      </div>
                    );
                  })()}
                </InfoCard>
              </>
            )}

            {/* Premium Status Overview */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#c9a96e]/10 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                    <div className="bg-gradient-to-br from-[#c9a96e]/20 to-[#b8965a]/20 p-4 rounded-2xl">
                      {getServiceIcon(trackingResult.serviceIcon)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{trackingResult.status}</h2>
                      <p className="text-gray-600 text-lg mb-4 max-w-2xl">
                        Tracking #{trackingResult.trackingNumber} - {trackingResult.service}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Carrier: {trackingResult.carrier}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end space-y-3">
                    <div className={`px-6 py-3 rounded-full font-semibold border-2 ${getStatusColor(trackingResult.statusCode)}`}>
                      {trackingResult.status}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(trackingResult.priority)}`}>
                      {trackingResult.priority} Priority
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[#c9a96e]/10 to-[#b8965a]/10 rounded-xl p-4 border border-[#c9a96e]/30">
                    <p className="text-sm font-medium text-[#8b1538] mb-1">Service Type</p>
                    <p className="text-lg font-bold text-[#8b1538]">{trackingResult.service}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-1">Current Location</p>
                    <p className="text-lg font-bold text-green-900">{trackingResult.currentLocation}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm font-medium text-purple-700 mb-1">Est. Delivery</p>
                    <p className="text-lg font-bold text-purple-900">
                      {formatDate(trackingResult.estimatedDelivery)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#c9a96e]/10 to-[#b8965a]/10 rounded-xl p-4 border border-[#c9a96e]/30">
                    <p className="text-sm font-medium text-[#8b1538] mb-1">Package Weight</p>
                    <p className="text-lg font-bold text-[#8b1538]">{trackingResult.weight}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-500">Origin</p>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">{trackingResult.origin}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-500">Destination</p>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">{trackingResult.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Environmental Impact
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-green-700 font-medium">CO₂ Saved vs Road</p>
                      <p className="text-2xl font-bold text-green-900">{trackingResult.co2Saved}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Transport Speed</p>
                      <p className="text-2xl font-bold text-green-900">{trackingResult.estimatedSpeed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Eco-Friendly Route</p>
                      <p className="text-lg font-bold text-green-900">✓ Optimized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Route Map */}
            {/* <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Live Route Tracking</h3>                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showMap ? 'Hide' : 'Show'} Map View</span>
                </button>
              </div>
              {showMap && trackingResult.route && <RouteMap route={trackingResult.route} currentPosition={trackingResult.route.currentPosition} />}
            </div> */}

            {/* Enhanced Timeline */}
            {/* <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                Detailed Journey Timeline
              </h3>              <div className="space-y-8">
                {trackingResult.timeline && Array.isArray(trackingResult.timeline) && trackingResult.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0 relative">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                        event.completed 
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-300 shadow-lg" 
                          : "bg-gray-100 border-gray-300"
                      } ${event.milestone ? 'ring-4 ring-blue-100' : ''}`}>
                        {getTimelineIcon(event.icon, event.completed)}
                      </div>
                      {index < trackingResult.timeline.length - 1 && (
                        <div className={`w-px h-20 ml-6 mt-2 ${
                        }`}>
                          {event.status}
                          {event.milestone && <span className="ml-2 text-yellow-600">★</span>}
                        </h4>                        <div className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                          event.completed ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                        }`}>
                          {event.date} {event.time !== "Expected" && String(event.time || '').includes("Expected") ? event.time : `at ${event.time}`}
                        </div>
                      </div>
                      <p className={`text-lg font-medium mb-2 ${
                        event.completed ? "text-blue-700" : "text-gray-500"
                      }`}>
                        📍 {event.location}
                      </p>
                      <p className={`text-sm ${
                        event.completed ? "text-gray-600" : "text-gray-400"
                      }`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>           
            {/* Premium Package Details */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Package className="w-6 h-6 mr-3 text-purple-600" />
                Comprehensive Package Details
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-4">Physical Specifications</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Dimensions</p>
                      <p className="text-lg font-bold text-purple-900">{trackingResult.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-700">Weight</p>
                      <p className="text-lg font-bold text-purple-900">{trackingResult.weight}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-4">Service Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-indigo-700">Service Type</p>
                      <p className="text-lg font-bold text-indigo-900">{trackingResult.service}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-indigo-700">Priority Level</p>
                      <p className="text-lg font-bold text-indigo-900">{trackingResult.priority}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#c9a96e]/10 to-[#b8965a]/10 rounded-xl p-6 border border-[#c9a96e]/30">
                  <h4 className="font-semibold text-[#8b1538] mb-4">Tracking Info</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-[#8b1538] mb-1">Tracking Number</p>
                      <p className="text-lg font-bold text-[#8b1538] font-mono text-sm">{trackingResult.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#8b1538] mb-1">Carrier</p>
                      <p className="text-lg font-bold text-[#8b1538]">{trackingResult.carrier}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Support Section */}
            {/* <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 rounded-3xl p-8 text-white relative overflow-hidden">
              
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-24 h-24 border border-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 border border-white rounded-full animate-pulse delay-500"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <Eye className="w-8 h-8 text-cyan-300" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3">Need Assistance?</h4>
                      <p className="text-cyan-100 text-lg mb-4 max-w-2xl">
                        Our 24/7 expert support team is ready to help with any questions about your shipment. 
                        Get instant support via multiple channels.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href="/contact"
                          className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Shield className="w-5 h-5" />
                          <span>Contact Support</span>
                        </a>
                        <a
                          href="tel:+15551234567"
                          className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Zap className="w-5 h-5" />
                          <span>Call Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h5 className="text-white font-bold mb-3">Quick Actions</h5>
                    <div className="space-y-2">
                      <button className="w-full text-left text-cyan-100 hover:text-white transition-colors text-sm">
                        📧 Email Updates
                      </button>
                      <button className="w-full text-left text-cyan-100 hover:text-white transition-colors text-sm">
                        📱 SMS Notifications
                      </button>
                      <button className="w-full text-left text-cyan-100 hover:text-white transition-colors text-sm">
                        🔄 Change Delivery Address
                      </button>
                      <button className="w-full text-left text-cyan-100 hover:text-white transition-colors text-sm">
                        📅 Schedule Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && shipmentData?.featuredImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={shipmentData.featuredImage} 
              alt="Shipment featured image - Full size" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
            >
              <span className="text-xl">×</span>
            </button>
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
              <p className="text-sm text-center">
                Shipment Image - Tracking #{shipmentData.trackingNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
           