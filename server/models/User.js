// User model for MongoDB (Mongoose)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model('User', userSchema);
