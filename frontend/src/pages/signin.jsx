import React, { useState, useEffect } from 'react';
import './signin.css';
import {useNavigate} from "react-router-dom";


const Signin = () => {
    const [formData, setformData ] = useState({email: " ", password: " "})
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setformData({...formData, [e.target.name] : e.target.value})
    }
    const handleSignin = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if(response.status === 200) {
                    localStorage.setItem("token", data.token); 
                    alert(data.message);
                    navigate('/home', {state:{ email: formData.email}});
                    }
                    else{
                        alert(data.message);
                    }
                    }
                    catch(error) {
                        console.error(error)

                };
    };

    return (
        <div className="signin-container">
            <div className="left-section">
                <div className="quote-box">
                    <p>"There's always room at the top for the best."</p>
                    <span>- John Henry Patterson</span>
                </div>
            </div>
            <div className="right-section">
                <div className="Signin-main">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignin}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                        <button type="Submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;