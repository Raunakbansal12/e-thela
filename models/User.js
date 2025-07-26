const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Will be hashed
  role: {
    type: String,
    required: true,
    enum: ['STREET_VENDOR', 'SUPPLIER', 'CUSTOMER'],
  },
  profilePicture: { type: String }, // URL
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  languagePreference: { type: String }, // e.g., 'en', 'hi', 'mr'
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema); 