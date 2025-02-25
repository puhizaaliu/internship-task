const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  steeringType: {
    type: String,
    enum: ['manual', 'automatic'], // Ensures the value is either 'manual' or 'automatic'
    required: true
  },
  numberOfSeats: {
    type: Number,
    required: true,
    min: 1 // Ensures at least 1 seat
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
