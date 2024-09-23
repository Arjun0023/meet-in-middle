import React, { useState, useEffect } from 'react';
import './otpVerification.css';
import {useNavigate, use} from "react-router-dom";

const OtpVerification = () => {
    const [otp, setOtp ] = useState({""})
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e) => {
        setformData({...formData, [e.target.name] : e.target.value})
    }
    const handleOtpVerification = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/verifyOtp', {
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
        <div className="otpVerification-main">
            <h2>verifyOtp</h2>
            <form onSubmit = {handleOtpVerification}>
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
                    Verify OTP
                </button>
    
            </form>
          
        </div>
      );
    }
    
    export default OtpVerification;
