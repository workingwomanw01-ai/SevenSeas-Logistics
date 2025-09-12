import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9taWVxdWFuIiwiYSI6ImNsd3h6bGx6NTEwZW4yaXNhbmwwYW9iY2YifQ.YH2bXNg9LMDO8DGnqC5WFA';

export default function RouteMap({ 
  originCoords, 
  destinationCoords, 
  onOriginUpdate, 
  onDestinationUpdate,
  currentLocation,
  onCurrentLocationUpdate,
  showCurrentLocation = false
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const originMarker = useRef(null);
  const destinationMarker = useRef(null);
  const currentLocationMarker = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);  // Function to draw route between two points
  const drawRoute = async (origin, destination) => {
    if (!origin || !destination || !map.current) return;

    // Calculate distance to pre-check if it should be air/sea route
    const distance = calculateDistance(origin, destination);
    
    // Check if route crosses major water bodies (like English Channel, Atlantic, etc.)
    const isLikelyCrossWater = checkIfCrossesWater(origin, destination);
    
    // If distance is very long or likely crosses water, go straight to air/sea route
    if (distance > 1000 || isLikelyCrossWater) {
      drawAirSeaRoute(origin, destination);
      return;
    }

    // Try different transportation modes in order of preference
    const transportModes = ['driving', 'walking', 'cycling'];
    let routeFound = false;

    for (const mode of transportModes) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          
          // Check if the route distance is unreasonably long compared to straight-line distance
          const routeDistance = data.routes[0].distance / 1000; // Convert to km
          const straightLineDistance = distance;
          
          // If route is more than 3x the straight line distance, it's likely going around water
          if (routeDistance > straightLineDistance * 3) {
            console.log(`Route too indirect (${routeDistance.toFixed(1)}km vs ${straightLineDistance.toFixed(1)}km), using air/sea route`);
            drawAirSeaRoute(origin, destination);
            return;
          }
          
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
          
          // Different colors for different transport modes
          const routeColors = {
            driving: '#3887be',
            walking: '#22c55e', 
            cycling: '#f59e0b'
          };
          
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': routeColors[mode] || '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });

          // Add route info popup
          addRouteInfo(route.coordinates, mode, data.routes[0]);
          routeFound = true;
          break;
        }
      } catch (error) {
        console.warn(`Failed to get ${mode} route:`, error);
        continue;
      }
    }

    // If no route found with any mode, draw a stylized air/sea route
    if (!routeFound) {
      drawAirSeaRoute(origin, destination);
    }
  };

  // Function to check if route likely crosses water
  const checkIfCrossesWater = (origin, destination) => {
    const [originLng, originLat] = origin;
    const [destLng, destLat] = destination;
    
    // Define known water crossing scenarios
    const waterCrossings = [
      // English Channel area
      { 
        condition: (oLng, oLat, dLng, dLat) => 
          (oLat > 50 && oLat < 52 && oLng > -2 && oLng < 2) && // Southern England/Northern France
          (dLat > 52 && dLat < 55 && dLng > -8 && dLng < -5) // Ireland
      },
      // Atlantic crossings
      {
        condition: (oLng, oLat, dLng, dLat) => 
          Math.abs(oLng - dLng) > 20 // Large longitude difference suggests ocean crossing
      },
      // Mediterranean crossings
      {
        condition: (oLng, oLat, dLng, dLat) => 
          (oLat > 35 && oLat < 45 && Math.abs(oLng - dLng) > 10) // Mediterranean region with significant distance
      }
    ];
    
    return waterCrossings.some(crossing => 
      crossing.condition(originLng, originLat, destLng, destLat)
    );
  };

  // Function to add route information
  const addRouteInfo = (coordinates, mode, routeData) => {
    if (!coordinates || coordinates.length === 0) return;

    // Get midpoint of route for popup
    const midIndex = Math.floor(coordinates.length / 2);
    const midPoint = coordinates[midIndex];

    const distance = routeData.distance ? (routeData.distance / 1000).toFixed(1) : 'Unknown';
    const duration = routeData.duration ? Math.round(routeData.duration / 60) : 'Unknown';

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'route-info-popup'
    })
      .setLngLat(midPoint)
      .setHTML(`
        <div style="font-size: 12px; padding: 5px;">
          <strong>Route Info</strong><br/>
          Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}<br/>
          Distance: ${distance} km<br/>
          Duration: ${duration} min
        </div>
      `)
      .addTo(map.current);
  };  // Function to draw air/sea route when no land route is available
  const drawAirSeaRoute = (origin, destination) => {
    if (!origin || !destination || !map.current) return;

    // Calculate distance to determine if it's likely an air or sea route
    const distance = calculateDistance(origin, destination);
    const isLongDistance = distance > 200; // Reduced threshold for better detection

    // Create a curved path for more realistic air/sea routes
    const midPoint = [
      (origin[0] + destination[0]) / 2,
      (origin[1] + destination[1]) / 2
    ];

    // Add some curvature to the route
    const curvature = Math.min(distance * 0.0001, 0.5); // Adjust curvature based on distance
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
      },
      properties: {
        routeType: isLongDistance ? 'air' : 'sea'
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
        'line-color': isLongDistance ? '#dc2626' : '#0ea5e9', // Red for air, blue for sea
        'line-width': 4,
        'line-opacity': 0.8,
        'line-dasharray': [2, 2] // Dashed line to indicate air/sea route
      }
    });    // Store route coordinates for current location positioning
    setRouteCoordinates(routeCoordinates);

    // Add route type indicator
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'route-info-popup'
    })
      .setLngLat(curvedMidPoint)
      .setHTML(`
        <div style="font-size: 12px; padding: 5px; text-align: center;">
          <strong>${isLongDistance ? '✈️ Air Route' : '🚢 Sea Route'}</strong><br/>
          Distance: ${distance.toFixed(0)} km<br/>
          <em>${isLongDistance ? 'Flight path' : 'Shipping route'}</em>
        </div>
      `)
      .addTo(map.current);
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
  // Function to add/update current location marker
  const updateCurrentLocationMarker = (coordinates) => {
    if (!coordinates || !map.current) return;

    // Remove existing current location marker and its popup
    if (currentLocationMarker.current) {
      currentLocationMarker.current.remove();
      currentLocationMarker.current = null;
    }

    // Remove any existing current location popups
    const existingPopups = document.querySelectorAll('.mapboxgl-popup');
    existingPopups.forEach(popup => {
      const popupContent = popup.querySelector('.mapboxgl-popup-content');
      if (popupContent && popupContent.innerHTML.includes('Current Location')) {
        popup.remove();
      }
    });

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
      cursor: pointer;
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
    }

    currentLocationMarker.current = new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .addTo(map.current);

    // Add popup for current location
    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat(coordinates)
      .setHTML('<div style="color: #3b82f6; font-weight: bold;">📍 Current Location</div>')
      .addTo(map.current);
  };

  useEffect(() => {
    if (map.current) return;

    console.log('Initializing route map with:', {
      originCoords,
      destinationCoords
    });

    // Determine initial center
    let initialCenter = [0, 0];
    let initialZoom = 2;

    if (originCoords && destinationCoords) {
      initialCenter = [
        (originCoords[0] + destinationCoords[0]) / 2,
        (originCoords[1] + destinationCoords[1]) / 2
      ];
      initialZoom = 8;
    } else if (originCoords) {
      initialCenter = originCoords;
      initialZoom = 10;
    } else if (destinationCoords) {
      initialCenter = destinationCoords;
      initialZoom = 10;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom
    });

    // Handle map clicks to set origin/destination
    map.current.on('click', (e) => {
      const newCoords = [e.lngLat.lng, e.lngLat.lat];
      
      if (!originCoords) {
        // Set origin first
        if (originMarker.current) {
          originMarker.current.remove();
        }
        originMarker.current = new mapboxgl.Marker({
          color: '#22c55e',
          draggable: true
        })
          .setLngLat(newCoords)
          .addTo(map.current);

        // Add popup for origin
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(newCoords)
          .setHTML('<div style="color: #22c55e; font-weight: bold;">Origin</div>')
          .addTo(map.current);
        
        originMarker.current.on('dragend', () => {
          const lngLat = originMarker.current.getLngLat();
          const draggedCoords = [lngLat.lng, lngLat.lat];
          onOriginUpdate && onOriginUpdate(draggedCoords);
          
          if (destinationCoords) {
            drawRoute(draggedCoords, destinationCoords);
          }
        });
        
        onOriginUpdate && onOriginUpdate(newCoords);
      } else if (!destinationCoords) {
        // Set destination second
        if (destinationMarker.current) {
          destinationMarker.current.remove();
        }
        destinationMarker.current = new mapboxgl.Marker({
          color: '#ef4444',
          draggable: true
        })
          .setLngLat(newCoords)
          .addTo(map.current);

        // Add popup for destination
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(newCoords)
          .setHTML('<div style="color: #ef4444; font-weight: bold;">Destination</div>')
          .addTo(map.current);
        
        destinationMarker.current.on('dragend', () => {
          const lngLat = destinationMarker.current.getLngLat();
          const draggedCoords = [lngLat.lng, lngLat.lat];
          onDestinationUpdate && onDestinationUpdate(draggedCoords);
          
          if (originCoords) {
            drawRoute(originCoords, draggedCoords);
          }
        });
        
        onDestinationUpdate && onDestinationUpdate(newCoords);
        
        if (originCoords) {
          drawRoute(originCoords, newCoords);
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

  // Update origin marker when coordinates change
  useEffect(() => {
    if (originCoords && map.current) {
      if (originMarker.current) {
        originMarker.current.setLngLat(originCoords);
      } else {
        originMarker.current = new mapboxgl.Marker({
          color: '#22c55e',
          draggable: true
        })
          .setLngLat(originCoords)
          .addTo(map.current);

        // Add popup for origin
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(originCoords)
          .setHTML('<div style="color: #22c55e; font-weight: bold;">Origin</div>')
          .addTo(map.current);

        originMarker.current.on('dragend', () => {
          const lngLat = originMarker.current.getLngLat();
          const draggedCoords = [lngLat.lng, lngLat.lat];
          onOriginUpdate && onOriginUpdate(draggedCoords);
          
          if (destinationCoords) {
            drawRoute(draggedCoords, destinationCoords);
          }
        });
      }
      
      if (destinationCoords) {
        drawRoute(originCoords, destinationCoords);
      }
    }
  }, [originCoords]);

  // Update destination marker when coordinates change
  useEffect(() => {
    if (destinationCoords && map.current) {
      if (destinationMarker.current) {
        destinationMarker.current.setLngLat(destinationCoords);
      } else {
        destinationMarker.current = new mapboxgl.Marker({
          color: '#ef4444',
          draggable: true
        })
          .setLngLat(destinationCoords)
          .addTo(map.current);

        // Add popup for destination
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(destinationCoords)
          .setHTML('<div style="color: #ef4444; font-weight: bold;">Destination</div>')
          .addTo(map.current);

        destinationMarker.current.on('dragend', () => {
          const lngLat = destinationMarker.current.getLngLat();
          const draggedCoords = [lngLat.lng, lngLat.lat];
          onDestinationUpdate && onDestinationUpdate(draggedCoords);
          
          if (originCoords) {
            drawRoute(originCoords, draggedCoords);
          }
        });
      }
      
      if (originCoords) {
        drawRoute(originCoords, destinationCoords);
      }
    }
  }, [destinationCoords]);
  // Update current location marker when current location changes
  useEffect(() => {
    if (currentLocation && showCurrentLocation && routeCoordinates && map.current) {
      let coordinates;
      
      if (typeof currentLocation === 'number') {
        // If currentLocation is a percentage (0-100)
        coordinates = calculatePositionAlongRoute(routeCoordinates, currentLocation);
      } else if (Array.isArray(currentLocation) && currentLocation.length === 2) {
        // If currentLocation is [lng, lat] coordinates
        coordinates = currentLocation;
      }
      
      if (coordinates) {
        updateCurrentLocationMarker(coordinates);
      }
    } else {
      // Remove current location marker if not showing
      if (currentLocationMarker.current) {
        currentLocationMarker.current.remove();
        currentLocationMarker.current = null;
      }
      
      // Remove any existing current location popups
      const existingPopups = document.querySelectorAll('.mapboxgl-popup');
      existingPopups.forEach(popup => {
        const popupContent = popup.querySelector('.mapboxgl-popup-content');
        if (popupContent && popupContent.innerHTML.includes('Current Location')) {
          popup.remove();
        }
      });
    }
  }, [currentLocation, showCurrentLocation, routeCoordinates]);

  // Add route click handler for setting current location
  useEffect(() => {
    if (!map.current || !showCurrentLocation) return;

    const handleRouteClick = (e) => {
      // Check if clicking on the route layer
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['route']
      });

      if (features.length > 0 && routeCoordinates && onCurrentLocationUpdate) {
        const clickedCoords = [e.lngLat.lng, e.lngLat.lat];
        
        // Find the closest point on the route to the clicked location
        let closestDistance = Infinity;
        let closestPercentage = 0;
        const totalDistance = calculateRouteDistance(routeCoordinates);
        let currentDistance = 0;

        for (let i = 0; i < routeCoordinates.length - 1; i++) {
          const segmentStart = routeCoordinates[i];
          const segmentEnd = routeCoordinates[i + 1];
          const segmentDistance = calculateDistance(segmentStart, segmentEnd);
          
          // Calculate distance from clicked point to this route segment
          const distanceToSegment = distanceToLineSegment(clickedCoords, segmentStart, segmentEnd);
          
          if (distanceToSegment < closestDistance) {
            closestDistance = distanceToSegment;
            // Calculate percentage along the route
            const segmentProgress = getProgressAlongSegment(clickedCoords, segmentStart, segmentEnd);
            closestPercentage = ((currentDistance + segmentDistance * segmentProgress) / totalDistance) * 100;
          }
          
          currentDistance += segmentDistance;
        }

        // Update current location with the calculated percentage
        onCurrentLocationUpdate(Math.round(closestPercentage));
      }
    };

    map.current.on('click', handleRouteClick);

    return () => {
      if (map.current) {
        map.current.off('click', handleRouteClick);
      }
    };
  }, [showCurrentLocation, routeCoordinates, onCurrentLocationUpdate]);

  // Helper function to calculate distance from point to line segment
  const distanceToLineSegment = (point, lineStart, lineEnd) => {
    const A = point[0] - lineStart[0];
    const B = point[1] - lineStart[1];
    const C = lineEnd[0] - lineStart[0];
    const D = lineEnd[1] - lineStart[1];

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = lineStart[0];
      yy = lineStart[1];
    } else if (param > 1) {
      xx = lineEnd[0];
      yy = lineEnd[1];
    } else {
      xx = lineStart[0] + param * C;
      yy = lineStart[1] + param * D;
    }

    const dx = point[0] - xx;
    const dy = point[1] - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Helper function to get progress along a segment
  const getProgressAlongSegment = (point, segmentStart, segmentEnd) => {
    const A = point[0] - segmentStart[0];
    const B = point[1] - segmentStart[1];
    const C = segmentEnd[0] - segmentStart[0];
    const D = segmentEnd[1] - segmentStart[1];

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    
    if (lenSq === 0) return 0;
    
    const param = dot / lenSq;
    return Math.max(0, Math.min(1, param));
  };

  // Fit map bounds when both coordinates are available
  useEffect(() => {
    if (originCoords && destinationCoords && map.current) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(originCoords)
        .extend(destinationCoords);
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
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
        {/* Instructions overlay */}
      <div className="absolute top-2 left-2 bg-white bg-opacity-90 p-2 rounded shadow text-sm max-w-xs">
        <div className="font-semibold mb-1">Instructions:</div>
        <div className="text-xs space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Click to set origin (green)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Click again to set destination (red)</span>
          </div>
          <div className="text-gray-600">Drag markers to adjust positions</div>
          <div className="text-xs text-gray-500 mt-1">
            <div>🚗 Blue: Driving route</div>
            <div>🚶 Green: Walking route</div>
            <div>🚲 Yellow: Cycling route</div>
            <div>✈️ Red dashed: Air route</div>
            <div>🚢 Blue dashed: Sea route</div>
          </div>
        </div>
      </div>
        {/* Current Location Control Panel */}
      {showCurrentLocation && routeCoordinates && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="font-semibold mb-3 text-sm">📍 Current Location Control</div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Position along route (%):
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={typeof currentLocation === 'number' ? currentLocation : 0}
                  onChange={(e) => {
                    const percentage = parseInt(e.target.value);
                    onCurrentLocationUpdate && onCurrentLocationUpdate(percentage);
                  }}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${typeof currentLocation === 'number' ? currentLocation : 0}%, #e5e7eb ${typeof currentLocation === 'number' ? currentLocation : 0}%, #e5e7eb 100%)`
                  }}
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={typeof currentLocation === 'number' ? currentLocation : 0}
                  onChange={(e) => {
                    const percentage = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                    onCurrentLocationUpdate && onCurrentLocationUpdate(percentage);
                  }}
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-600 space-y-1">
              <div>• Use slider or input to set position</div>
              <div>• Click on route to set location</div>
              {routeCoordinates && (
                <div className="text-xs text-blue-600 font-medium">
                  Route distance: {calculateRouteDistance(routeCoordinates).toFixed(1)} km
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => onCurrentLocationUpdate && onCurrentLocationUpdate(0)}
                className="flex-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
              >
                Start
              </button>
              <button
                onClick={() => onCurrentLocationUpdate && onCurrentLocationUpdate(50)}
                className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              >
                Middle
              </button>
              <button
                onClick={() => onCurrentLocationUpdate && onCurrentLocationUpdate(100)}
                className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                End
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear button */}
      {(originCoords || destinationCoords) && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => {
              // Remove markers
              if (originMarker.current) {
                originMarker.current.remove();
                originMarker.current = null;
              }
              if (destinationMarker.current) {
                destinationMarker.current.remove();
                destinationMarker.current = null;
              }
              if (currentLocationMarker.current) {
                currentLocationMarker.current.remove();
                currentLocationMarker.current = null;
              }
              
              // Remove route layer and source
              if (map.current && map.current.getSource('route')) {
                map.current.removeLayer('route');
                map.current.removeSource('route');
              }
              
              // Remove all popups
              const popups = document.getElementsByClassName('mapboxgl-popup');
              while (popups.length > 0) {
                popups[0].remove();
              }
              
              // Reset coordinates and current location
              onOriginUpdate && onOriginUpdate(null);
              onDestinationUpdate && onDestinationUpdate(null);
              onCurrentLocationUpdate && onCurrentLocationUpdate(null);
              setRouteCoordinates(null);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Clear Route
          </button>
        </div>
      )}
    </div>
  );
}
