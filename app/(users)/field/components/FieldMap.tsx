import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import { motion } from 'framer-motion';

type Coordinates = {
  lat: number;
  lng: number;
};

type FieldMapProps = {
  onCoordinatesChange: (newCoordinates: Coordinates[]) => void;
};

const containerStyle = {
  width: '100%',
  height: '500px',
};

const initialCenter = { lat: 20.5937, lng: 78.9629 }; // Centered on India

const FieldMap: React.FC<FieldMapProps> = ({ onCoordinatesChange }) => {
  const [markers, setMarkers] = useState<Coordinates[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newMarker = {
      lat: event.latLng?.lat() || 0,
      lng: event.latLng?.lng() || 0,
    };
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    onCoordinatesChange(updatedMarkers); // Update coordinates on parent component
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border border-green-700 p-4 rounded-lg shadow-lg "
      >
        <h2 className="text-2xl font-semibold text-center text-green-800">Set Up Your Field</h2>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={initialCenter}
          zoom={5}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          <Polygon
            paths={markers}
            options={{
              fillColor: 'rgba(34,139,34,0.3)',
              strokeColor: 'green',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
        <p className="mt-4 text-center text-green-700">
          Click on the map to mark the boundary points of your field.
        </p>
      </motion.div>
    </LoadScript>

  );
};

export default FieldMap;







// 'use client'
// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const FieldMap = () => {
//   useEffect(() => {
//     const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Example marker
//     const marker = L.marker([20.5937, 78.9629]).addTo(map);
    
//     return () => {
//       map.remove(); // Cleanup
//     };
//   }, []);

//   return <div id="map" style={{ height: '500px', width: '100%' }} />;
// };

// export default FieldMap;








// 'use client'
// import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder';
// import 'leaflet-routing-machine'; // If you want routing capabilities

// // Import custom CSS for marker icon if you want
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// // Custom icon for markers
// const markerIcon = new L.Icon({
//   iconUrl: '/images/marker-icon.png', // Add your marker icon path here
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: '/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// const FieldMap = () => {
//   const [map, setMap] = useState<L.Map | null>(null);

//   useEffect(() => {
//     const mapInstance = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

//     // Satellite view using a different tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(mapInstance);
    

//     // Marker to select coordinates
//     const marker = L.marker([20.5937, 78.9629], { icon: markerIcon }).addTo(mapInstance);
    
//     // Event to get clicked coordinates
//     mapInstance.on('click', (e) => {
//       const { lat, lng } = e.latlng;
//       marker.setLatLng([lat, lng]); // Move the marker to the clicked location
//       console.log(`Selected coordinates: Latitude: ${lat}, Longitude: ${lng}`);
//     });

//     setMap(mapInstance);

//     return () => {
//       mapInstance.remove(); // Cleanup
//     };
//   }, []);

//   return <div id="map" style={{ height: '500px', width: '100%' }} />;
// };

// export default FieldMap;
