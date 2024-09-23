import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapContainer = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  
  console.log(userLocation, '---------------userLocation');

  // Fetch the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error(error);
        },
        {
          enableHighAccuracy: true, // Enable high accuracy for better precision
          timeout: 5000, // Optional timeout for the location request
          maximumAge: 0 // Prevent returning a cached position
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      {/* Render error if geolocation is unavailable */}
      {error && <p>{error}</p>}

      {/* Only display the map if userLocation is available */}
      {userLocation ? (
        <APIProvider apiKey="AIzaSyC07FUPydZqWCczGNbWP_jhLSujSiNVJiU">
          <Map
            center={userLocation} // Center the map on user's location
            style={{ width: "100%", height: "100%" }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker position={userLocation} /> {/* Place the marker */}
          </Map>
        </APIProvider>
      ) : (
        <p>Loading map...</p> // Loading message until geolocation is fetched
      )}
    </div>
  );
};

export default MapContainer;
