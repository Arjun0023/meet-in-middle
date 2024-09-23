import React from "react";
import './home.css' ;
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';


const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to my website</h1>
        </div>
        );
}

export default Home;