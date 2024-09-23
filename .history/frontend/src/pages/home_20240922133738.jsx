import React from "react";
import './home.css';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to my website</h1>
      
      {/* Add the map here */}
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{width: '100%', height: '500px'}}  {/* Adjust height as per your need */}
          defaultCenter={{lat: 22.54992, lng: 0}}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
};

export default Home;
