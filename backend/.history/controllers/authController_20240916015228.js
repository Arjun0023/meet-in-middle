const User = require('../models/User');
const generateOtp = require('../utils/otpGenerator');
const sendOtp = require('../utils/sendOtp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res)=> {
    const {email, phoneNumber, password} = req.body;
     
    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message})
    }

    
}