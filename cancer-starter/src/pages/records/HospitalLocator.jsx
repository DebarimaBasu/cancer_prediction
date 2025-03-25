import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // New Delhi

const HospitalLocator = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.warn("Using default location: New Delhi");
        setLocation(defaultLocation);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=cancer+hospital+near+${location.lat},${location.lng}`
        );
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [location]);

  return (
  
    <div >
    <h1 className="text-2xl font-bold text-center text-white mb-4">
 Check Nearby Hospitals Location 
</h1>


     
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]}>
            <Popup>You are here</Popup>
          </Marker>
          {hospitals.map((hospital, index) => (
            <Marker key={index} position={[hospital.lat, hospital.lon]}>
              <Popup>
                <h3>{hospital.display_name}</h3>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${hospital.lat}&mlon=${hospital.lon}&zoom=14`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default HospitalLocator;
