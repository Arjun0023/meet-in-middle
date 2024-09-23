const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendOtp = async(phoneNumber, otp) => {
    try{
        await client.messages.create({
        body: `otp is ${otp}`, 
        
        })
    }
}