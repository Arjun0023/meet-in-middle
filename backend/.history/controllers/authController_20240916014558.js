const User = require('../models/User');
const generateOtp = require('../utils/otpGenerator');
const sendOtp = require('../utils/sendOtp');
const bcrypt = require('bcryptjs');
const jwt = 