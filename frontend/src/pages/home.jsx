import React from "react";
import './home.css' ;
import MapContainer from "../components/GoogleMap";



const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Meet in the middle</h1>
            <MapContainer/>
        </div>
        );
}

export default Home;