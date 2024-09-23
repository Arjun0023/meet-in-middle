import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

const MapContainer = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [secondLocation, setSecondLocation] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedType, setSelectedType] = useState("all"); // To filter places by type
  const [showOverlay, setShowOverlay] = useState(false); // Toggle the overlay
console.log(selectedType,"---------SelectedType")
console.log(selectedPlace,"============PLace")
  // Fetch the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle the location selection from autocomplete
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSecondLocation(location);
      }
    }
  };

  // Set autocomplete reference
  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // Calculate midpoint between two coordinates
  const calculateMidpoint = () => {
    if (userLocation && secondLocation) {
      const lat = (userLocation.lat + secondLocation.lat) / 2;
      const lng = (userLocation.lng + secondLocation.lng) / 2;
      setMidpoint({ lat, lng });
      searchNearbyPlaces({ lat, lng });
    }
  };

  // Function to search nearby places based on the selected type
  const searchNearbyPlaces = (location, placeType = "restaurant") => {
    const map = new window.google.maps.Map(document.createElement("div"));
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: 2000, // 2km radius
      type: placeType, // Dynamic based on user selection
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        setShowOverlay(true); // Show the overlay after fetching places
      } else {
        console.error("Places search failed: ", status);
      }
    });
  };
  // Filter places based on the selected type
  const filteredPlaces =
    selectedType === "all"
      ? places
      : places.filter((place) => place.types.includes(selectedType));
      console.log(filteredPlaces,"---------=========")
  const handleFilterClick = (type) => {
    setSelectedType(type);
    searchNearbyPlaces(midpoint, type);
  };

  const mapStyles = { width: "100%", height: "400px" };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC07FUPydZqWCczGNbWP_jhLSujSiNVJiU"
      libraries={["places"]}
    >
      <div>
        {error && <p>{error}</p>}
        <div>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Enter a second location"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </Autocomplete>
          <button
            onClick={calculateMidpoint}
            style={{ marginTop: "10px", padding: "10px" }}
          >
            Submit
          </button>
        </div>

        {/* Only render the map when userLocation is available */}
        {userLocation ? (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={midpoint || userLocation}
          >
            {userLocation && <Marker position={userLocation} />}
            {secondLocation && <Marker position={secondLocation} />}
            {midpoint && <Marker position={midpoint} />}
            {filteredPlaces.map((place, index) => (
              <Marker
                key={index}
                position={place.geometry.location}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.geometry.location}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h6>{selectedPlace.name}</h6>
                  <p>{selectedPlace.vicinity}</p>
                  <p>Rating: {selectedPlace.rating || "N/A"}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}

        {/* Overlay for displaying the places */}
        {showOverlay && (
          <div className="overlay">
            <div className="filter-buttons">
              <button onClick={() => handleFilterClick("all")}>All</button>
              <button onClick={() => handleFilterClick("restaurant")}>
                Restaurants
              </button>
              <button onClick={() => handleFilterClick("cafe")}>Cafes</button>
              <button onClick={() => handleFilterClick("shopping_mall")}>
                Malls
              </button>
              <button onClick={() => handleFilterClick("park")}>Parks</button>
              <button onClick={() => handleFilterClick("lodging")}>Hotels</button>
            </div>
            <div className="places-list">
              {filteredPlaces.map((place, index) => (
                <div key={index} className="place-card">
                  <h5>{place.name}</h5>
                  <p>{place.vicinity}</p>
                  <p>Rating: {place.rating || "N/A"}</p>
                  {place.photos && place.photos.length > 0 && (
                    <img
                      src={place.photos[0].getUrl()}
                      alt={place.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default MapContainer;
