// OTP model for MongoDB (Mongoose)
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  identifier: { type: String, required: true }, // email or phone
  otp: { type: String, required: true },
  expires: { type: Date, required: true },
});

module.exports = mongoose.model('Otp', otpSchema);
