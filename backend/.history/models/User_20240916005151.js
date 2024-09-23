const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,  // Regular expression for email validation
            'Please fill a valid email address'  // Custom error message if validation fails
        ]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true

    },
    otp: {
        type: String,
        required: true
    }


})