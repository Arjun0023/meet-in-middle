import React, { useState, useEffect } from 'react';
import './signup.css';
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const [formData, setformData ] = useState({email: " ", phoneNumber: " ", password: " "})
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        
    }
    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if(response.status === 201) {
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
    <div className="Signup-main">
        <h2>Signup</h2>
        <form onSubmit = {handleSignup}>
            <input
            type="email"
            name="email" 
            value={formData.email}






        </form>
      
    </div>
  );
}

export default Signup;
