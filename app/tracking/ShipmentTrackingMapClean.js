'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9taWVxdWFuIiwiYSI6ImNsd3h6bGx6NTEwZW4yaXNhbmwwYW9iY2YifQ.YH2bXNg9LMDO8DGnqC5WFA';

export default function ShipmentTrackingMap({
  currentLocation, 
  originCoords, 
  destinationCoords,
  currentLocationPercentage,
  shipmentStatus = 'In Transit'
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const currentMarker = useRef(null);
  const originMarker = useRef(null);
  const destinationMarker = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  // Function to draw route between two points
  const drawRoute = async (origin, destination) => {
    console.log('drawRoute called with:', { origin, destination });
    if (!origin || !destination || !map.current) {
      console.log('drawRoute early return:', { origin: !!origin, destination: !!destination, map: !!map.current });
      return;
    }

    // Try different transportation modes in order of preference
    const transportModes = ['driving', 'walking', 'cycling'];
    let routeFound = false;

    for (const mode of transportModes) {
      try {
        console.log(`Trying ${mode} route...`);
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        
        const data = await response.json();
        console.log(`${mode} route response:`, data);
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          console.log(`${mode} route found with ${route.coordinates.length} coordinates`);
          
          // Remove existing route if any
          if (map.current.getSource('route')) {
            map.current.removeLayer('route');
            map.current.removeSource('route');
          }
          
          // Add route source and layer
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: { transportMode: mode },
              geometry: route
            }
          });
          
          // Store route coordinates for current location positioning
          setRouteCoordinates(route.coordinates);
          
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 4,
              'line-opacity': 0.6
            }
          });

          console.log(`Successfully added ${mode} route to map`);
          routeFound = true;
          break;
        }
      } catch (error) {
        console.warn(`Failed to get ${mode} route:`, error);
        continue;
      }
    }    // If no route found with any mode, draw a stylized air/sea route
    if (!routeFound) {
      console.log('No driving/walking/cycling route found, drawing air/sea route');
      drawAirSeaRoute(origin, destination);
    }    // After drawing route (either real or air/sea), fit bounds to show both points
    setTimeout(() => {
      fitMapToBounds(origin, destination);
    }, 100);
  };
  // Function to draw air/sea route when no land route is available
  const drawAirSeaRoute = (origin, destination) => {
    console.log('drawAirSeaRoute called with:', { origin, destination });
    if (!origin || !destination || !map.current) {
      console.log('drawAirSeaRoute early return:', { origin: !!origin, destination: !!destination, map: !!map.current });
      return;
    }

    // Calculate distance to determine if it's likely an air or sea route
    const distance = calculateDistance(origin, destination);
    const isLongDistance = distance > 500; // km

    console.log('Air/sea route details:', { distance, isLongDistance });

    // Create a curved path for more realistic air/sea routes
    const midPoint = [
      (origin[0] + destination[0]) / 2,
      (origin[1] + destination[1]) / 2
    ];

    // Add some curvature to the route
    const curvature = Math.min(distance * 0.0001, 0.5);
    const curvedMidPoint = [
      midPoint[0],
      midPoint[1] + curvature
    ];

    const routeCoordinates = [origin, curvedMidPoint, destination];

    const routeGeoJSON = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates
      }
    };

    // Remove existing route if any
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    map.current.addSource('route', {
      type: 'geojson',
      data: routeGeoJSON
    });

    // Store route coordinates for current location positioning
    setRouteCoordinates(routeCoordinates);

    // Style the route differently for air vs sea
    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': isLongDistance ? '#dc2626' : '#0ea5e9',
        'line-width': 4,
        'line-opacity': 0.6,
        'line-dasharray': [3, 3]
      }    });    console.log('Successfully added air/sea route to map');
    
    // Fit bounds after drawing air/sea route with a small delay
    setTimeout(() => {
      fitMapToBounds(origin, destination);
    }, 100);
  };
  // Helper function to fit map bounds to show origin and destination
  const fitMapToBounds = (origin, destination) => {
    if (!origin || !destination || !map.current) return;

    const bounds = new mapboxgl.LngLatBounds()
      .extend(origin)
      .extend(destination);

    // Also include current location if it exists
    if (currentLocation) {
      bounds.extend(currentLocation);
    }

    // Calculate distance to determine appropriate padding and max zoom
    const distance = calculateDistance(origin, destination);
    let padding = 50;
    let maxZoom = 12;

    // Adjust padding and zoom based on distance and screen size
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      padding = 40;
      if (distance < 100) {
        maxZoom = 9;
        padding = 50;
      } else if (distance < 500) {
        maxZoom = 7;
        padding = 45;
      } else if (distance < 1000) {
        maxZoom = 5;
        padding = 40;
      } else {
        maxZoom = 4;
        padding = 35;
      }
    } else {
      if (distance < 100) {
        maxZoom = 11;
        padding = 80;
      } else if (distance < 500) {
        maxZoom = 9;
        padding = 70;
      } else if (distance < 1000) {
        maxZoom = 7;
        padding = 60;
      } else {
        maxZoom = 5;
        padding = 50;
      }
    }

    // Use a timeout to ensure the route is drawn before fitting bounds
    setTimeout(() => {
      map.current.fitBounds(bounds, {
        padding: padding,
        maxZoom: maxZoom,
        duration: 1000
      });
    }, 200);
  };

  // Helper function to calculate distance between two points
  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
    const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Function to calculate position along route based on percentage (0-100)
  const calculatePositionAlongRoute = (routeCoords, percentage) => {
    if (!routeCoords || routeCoords.length < 2) return null;
    
    const targetPercentage = Math.max(0, Math.min(100, percentage)) / 100;
    const totalDistance = calculateRouteDistance(routeCoords);
    const targetDistance = totalDistance * targetPercentage;
    
    let currentDistance = 0;
    
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const segmentDistance = calculateDistance(routeCoords[i], routeCoords[i + 1]);
      
      if (currentDistance + segmentDistance >= targetDistance) {
        // Position is within this segment
        const segmentProgress = (targetDistance - currentDistance) / segmentDistance;
        const lat = routeCoords[i][1] + (routeCoords[i + 1][1] - routeCoords[i][1]) * segmentProgress;
        const lng = routeCoords[i][0] + (routeCoords[i + 1][0] - routeCoords[i][0]) * segmentProgress;
        return [lng, lat];
      }
      
      currentDistance += segmentDistance;
    }
    
    // Return end point if percentage is 100 or calculation goes beyond route
    return routeCoords[routeCoords.length - 1];
  };

  // Function to calculate total route distance
  const calculateRouteDistance = (routeCoords) => {
    if (!routeCoords || routeCoords.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 0; i < routeCoords.length - 1; i++) {
      totalDistance += calculateDistance(routeCoords[i], routeCoords[i + 1]);
    }
    return totalDistance;
  };

  useEffect(() => {
    if (map.current) return;

    console.log('Initializing tracking map with:', {
      currentLocation,
      originCoords,
      destinationCoords
    });

    // Determine initial center and zoom
    let initialCenter = currentLocation || [0, 0];
    let initialZoom = 8; // Lower default zoom for better mobile view

    if (originCoords && destinationCoords) {
      initialCenter = [
        (originCoords[0] + destinationCoords[0]) / 2,
        (originCoords[1] + destinationCoords[1]) / 2
      ];
      // Calculate distance for appropriate initial zoom - adjusted for mobile
      const distance = calculateDistance(originCoords, destinationCoords);
      if (distance < 50) initialZoom = 8;       // Short distance routes
      else if (distance < 200) initialZoom = 6;  // Medium distance routes
      else if (distance < 1000) initialZoom = 4; // Long distance routes
      else initialZoom = 2;                      // Very long distance routes
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom
    });    map.current.on('load', () => {
      // Clear any existing popups that might be cached
      const existingPopups = document.querySelectorAll('.mapboxgl-popup');
      existingPopups.forEach(popup => popup.remove());

      // Add origin marker if available
      if (originCoords) {originMarker.current = new mapboxgl.Marker({
          color: '#22c55e'
        })
          .setLngLat(originCoords)
          .addTo(map.current);

        // Add popup that shows on click only
        const originPopup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: true,
          closeOnClick: false 
        })
          .setLngLat(originCoords)
          .setHTML('<div style="color: #22c55e; font-weight: bold;">📦 Origin</div>');
        
        // Add click event to show popup
        originMarker.current.getElement().addEventListener('click', () => {
          originPopup.addTo(map.current);
        });
      }

      // Add destination marker if available
      if (destinationCoords) {        destinationMarker.current = new mapboxgl.Marker({
          color: '#ef4444'
        })
          .setLngLat(destinationCoords)
          .addTo(map.current);

        // Add popup that shows on click only
        const destinationPopup = new mapboxgl.Popup({ 
          offset: 25,
          closeButton: true,
          closeOnClick: false 
        })
          .setLngLat(destinationCoords)
          .setHTML('<div style="color: #ef4444; font-weight: bold;">🎯 Destination</div>');
        
        // Add click event to show popup
        destinationMarker.current.getElement().addEventListener('click', () => {
          destinationPopup.addTo(map.current);
        });
      }

      // Add current location marker if available
      if (currentLocation) {
        // Create custom marker element for current location
        const el = document.createElement('div');
        el.className = 'current-location-marker';
        el.style.cssText = `
          background-color: #3b82f6;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          animation: pulse 2s infinite;
        `;

        // Add CSS animation
        if (!document.getElementById('pulse-animation')) {
          const style = document.createElement('style');
          style.id = 'pulse-animation';
          style.textContent = `
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
              100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
          `;
          document.head.appendChild(style);
        }        currentMarker.current = new mapboxgl.Marker(el)
          .setLngLat(currentLocation)
          .addTo(map.current);      }      // Draw route if origin and destination are available
      if (originCoords && destinationCoords) {
        console.log('Drawing route with coordinates:', { originCoords, destinationCoords });
        drawRoute(originCoords, destinationCoords);
        // fitMapToBounds is now called within drawRoute
      } else {
        console.log('Route not drawn - missing coordinates:', { originCoords, destinationCoords });
        
        // If only current location, center on it with appropriate zoom for mobile
        if (currentLocation) {
          const isMobile = window.innerWidth < 768;
          map.current.setCenter(currentLocation);
          map.current.setZoom(isMobile ? 10 : 12);
        }
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Fix for map not rendering properly
    setTimeout(() => {
      map.current.resize();
    }, 0);

  }, []);

  // Update current location when it changes
  useEffect(() => {
    if (currentLocation && currentMarker.current && map.current) {
      currentMarker.current.setLngLat(currentLocation);
      
      // Only animate to location if it's significantly different or if it's the first update
      const currentCenter = map.current.getCenter();
      const distance = calculateDistance([currentCenter.lng, currentCenter.lat], currentLocation);
      
      // Only move view if location has changed significantly (more than 10km) or current zoom is very low
      if (distance > 10 || map.current.getZoom() < 4) {
        map.current.flyTo({
          center: currentLocation,
          zoom: Math.max(map.current.getZoom(), 8), // Don't zoom out, only zoom in if needed but lower max
          duration: 1000
        });
      }
    }
  }, [currentLocation]);

  // Update current location based on route progress percentage
  useEffect(() => {
    console.log('Route progress effect:', {
      currentLocationPercentage,
      hasRouteCoordinates: !!routeCoordinates,
      hasOrigin: !!originCoords,
      hasDestination: !!destinationCoords,
      routeLength: routeCoordinates?.length
    });

    if (typeof currentLocationPercentage === 'number' && routeCoordinates && originCoords && destinationCoords && map.current) {
      const calculatedPosition = calculatePositionAlongRoute(routeCoordinates, currentLocationPercentage);
      
      console.log('Calculated position from percentage:', {
        percentage: currentLocationPercentage,
        calculatedPosition,
        routeDistance: calculateRouteDistance(routeCoordinates)
      });
        if (calculatedPosition) {
        // Remove existing current location marker
        if (currentMarker.current) {
          currentMarker.current.remove();
          currentMarker.current = null;
        }

        // Clear any existing popups to prevent duplicates
        const existingPopups = document.querySelectorAll('.mapboxgl-popup');
        existingPopups.forEach(popup => popup.remove());

        // Create custom marker element for current location
        const el = document.createElement('div');
        el.className = 'current-location-marker';
        el.style.cssText = `
          background-color: #3b82f6;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          animation: pulse 2s infinite;
        `;

        // Add CSS animation if not already present
        if (!document.getElementById('pulse-animation')) {
          const style = document.createElement('style');
          style.id = 'pulse-animation';
          style.textContent = `
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
              100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
          `;
          document.head.appendChild(style);
        }        currentMarker.current = new mapboxgl.Marker(el)
          .setLngLat(calculatedPosition)
          .addTo(map.current);

        // Animate to new location
        map.current.flyTo({
          center: calculatedPosition,
          zoom: 8,
          duration: 1000
        });
      }
    }  }, [currentLocationPercentage, routeCoordinates, originCoords, destinationCoords, shipmentStatus]);
  // Effect to draw route when coordinates are updated
  useEffect(() => {
    if (originCoords && destinationCoords && map.current) {
      // Add a small delay to ensure map is fully loaded
      setTimeout(() => {
        console.log('Drawing route from coordinates effect');
        drawRoute(originCoords, destinationCoords);
      }, 100);
    } else if (map.current && (!originCoords || !destinationCoords)) {
      console.log('Route not drawn - missing coordinates:', {
        originCoords: !!originCoords,
        destinationCoords: !!destinationCoords
      });
    }
  }, [originCoords, destinationCoords]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        style={{ 
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '400px'
        }} 
      />
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded shadow text-xs">
        <div className="font-semibold mb-1">Legend:</div>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Origin</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Destination</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Current Location</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-1 bg-blue-600 mr-2"></div>
            <span>Route</span>
          </div>
        </div>
      </div>
    </div>
  );
}
