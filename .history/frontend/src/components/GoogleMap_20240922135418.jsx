import React, { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapContainer = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
    console.log(user)
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
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={userLocation} // Dynamically center the map on user's location
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider>
      ) : (
        <p>Loading map...</p> // Loading message until geolocation is fetched
      )}
    </div>
  );
};

export default MapContainer;
