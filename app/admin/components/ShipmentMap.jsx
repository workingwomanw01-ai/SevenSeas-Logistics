import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaG9taWVxdWFuIiwiYSI6ImNsd3h6bGx6NTEwZW4yaXNhbmwwYW9iY2YifQ.YH2bXNg9LMDO8DGnqC5WFA';

export default function ShipmentMap({ 
  initialLocation, 
  onLocationUpdate, 
  originCoords, 
  destinationCoords, 
  onOriginUpdate, 
  onDestinationUpdate,
  mode = 'single' // 'single' for current behavior, 'route' for origin-destination
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const originMarker = useRef(null);
  const destinationMarker = useRef(null);
    const [coordinates, setCoordinates] = useState(initialLocation);
  const [routeSource, setRouteSource] = useState(null);
  // Function to draw route between two points
  const drawRoute = async (origin, destination) => {
    if (!origin || !destination || !map.current) return;

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

  // Function to draw air/sea route when no land route is available
  const drawAirSeaRoute = (origin, destination) => {
    if (!origin || !destination || !map.current) return;

    // Calculate distance to determine if it's likely an air or sea route
    const distance = calculateDistance(origin, destination);
    const isLongDistance = distance > 500; // km

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
    });
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
  useEffect(() => {
    if (map.current) return;

    console.log('Initializing map with mode:', mode, {
      initialLocation,
      originCoords,
      destinationCoords
    });

    // Determine initial center based on mode
    let initialCenter = coordinates || [0, 0];
    if (mode === 'route' && originCoords && destinationCoords) {
      // Center between origin and destination
      initialCenter = [
        (originCoords[0] + destinationCoords[0]) / 2,
        (originCoords[1] + destinationCoords[1]) / 2
      ];
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: mode === 'route' ? 8 : 12
    });

    if (mode === 'single') {
      // Single marker mode (current behavior)
      marker.current = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat(coordinates)
        .addTo(map.current);

      marker.current.on('dragend', () => {
        const lngLat = marker.current.getLngLat();
        const newCoords = [lngLat.lng, lngLat.lat];
        console.log('Marker dragged to:', newCoords);
        setCoordinates(newCoords);
        onLocationUpdate(newCoords);
      });

      map.current.on('click', (e) => {
        const newCoords = [e.lngLat.lng, e.lngLat.lat];
        console.log('Map clicked at:', newCoords);
        marker.current.setLngLat(newCoords);
        setCoordinates(newCoords);
        onLocationUpdate(newCoords);
      });
    } else if (mode === 'route') {
      // Origin and destination markers mode
      if (originCoords) {
        originMarker.current = new mapboxgl.Marker({
          color: '#22c55e', // Green for origin
          draggable: true
        })
          .setLngLat(originCoords)
          .addTo(map.current);

        originMarker.current.on('dragend', () => {
          const lngLat = originMarker.current.getLngLat();
          const newCoords = [lngLat.lng, lngLat.lat];
          onOriginUpdate && onOriginUpdate(newCoords);
          
          if (destinationCoords) {
            drawRoute(newCoords, destinationCoords);
          }
        });
      }

      if (destinationCoords) {
        destinationMarker.current = new mapboxgl.Marker({
          color: '#ef4444', // Red for destination
          draggable: true
        })
          .setLngLat(destinationCoords)
          .addTo(map.current);

        destinationMarker.current.on('dragend', () => {
          const lngLat = destinationMarker.current.getLngLat();
          const newCoords = [lngLat.lng, lngLat.lat];
          onDestinationUpdate && onDestinationUpdate(newCoords);
          
          if (originCoords) {
            drawRoute(originCoords, newCoords);
          }
        });
      }

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
          
          onDestinationUpdate && onDestinationUpdate(newCoords);
          
          if (originCoords) {
            drawRoute(originCoords, newCoords);
          }
        }
      });

      // Draw initial route if both coordinates exist
      if (originCoords && destinationCoords) {
        map.current.on('load', () => {
          drawRoute(originCoords, destinationCoords);
        });
      }
    }

    // Add search control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false
    });
    
    map.current.addControl(geocoder);
    
    geocoder.on('result', (e) => {
      const coords = e.result.center;
      
      if (mode === 'single') {
        marker.current.setLngLat(coords);
        setCoordinates(coords);
        onLocationUpdate(coords);
      } else if (mode === 'route') {
        // In route mode, set as origin if not set, otherwise as destination
        if (!originCoords) {
          if (originMarker.current) {
            originMarker.current.remove();
          }
          originMarker.current = new mapboxgl.Marker({
            color: '#22c55e',
            draggable: true
          })
            .setLngLat(coords)
            .addTo(map.current);
          
          onOriginUpdate && onOriginUpdate(coords);
        } else {
          if (destinationMarker.current) {
            destinationMarker.current.remove();
          }
          destinationMarker.current = new mapboxgl.Marker({
            color: '#ef4444',
            draggable: true
          })
            .setLngLat(coords)
            .addTo(map.current);
          
          onDestinationUpdate && onDestinationUpdate(coords);
          
          if (originCoords) {
            drawRoute(originCoords, coords);
          }
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
  useEffect(() => {
    if (mode === 'single' && initialLocation && marker.current && map.current) {
      marker.current.setLngLat(initialLocation);
      map.current.flyTo({
        center: initialLocation,
        zoom: 12
      });
    }
  }, [initialLocation, mode]);

  // Update origin marker when coordinates change
  useEffect(() => {
    if (mode === 'route' && originCoords && originMarker.current && map.current) {
      originMarker.current.setLngLat(originCoords);
      
      if (destinationCoords) {
        drawRoute(originCoords, destinationCoords);
      }
    }
  }, [originCoords, mode]);

  // Update destination marker when coordinates change
  useEffect(() => {
    if (mode === 'route' && destinationCoords && destinationMarker.current && map.current) {
      destinationMarker.current.setLngLat(destinationCoords);
      
      if (originCoords) {
        drawRoute(originCoords, destinationCoords);
      }
    }
  }, [destinationCoords, mode]);

  // Fit map bounds when both coordinates are available
  useEffect(() => {
    if (mode === 'route' && originCoords && destinationCoords && map.current) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(originCoords)
        .extend(destinationCoords);
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    }
  }, [originCoords, destinationCoords, mode]);

  return (
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
  );
}
