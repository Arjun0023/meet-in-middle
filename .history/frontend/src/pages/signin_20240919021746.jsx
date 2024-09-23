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
            const response = await fetch('http://localhost:5001/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if(response.status === 200) {
                    localStorage.
                    alert(data.message);
                    navigate('/otp-verification', {state:{ email: formData.email}});
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
        <div className="Signin-main">
            <h2>Signin</h2>
            <form onSubmit = {handleSignin}>
                <input
                type="email"
                name="email" 
                value={formData.email}
                onChange = {handleInputChange}
                placeholder="Email"
                /> 
               
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange = {handleInputChange}
                placeholder="Password"
                />
                <button type="Submit">
                    Signin
                </button>
    
            </form>
          
        </div>
      );
    }
    
    export default Signin;
