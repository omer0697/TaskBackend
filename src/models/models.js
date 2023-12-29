// src/models/models.js

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  gender: String,
  profilePicture: String,
  addresses: [{
    street: String,
    city: String,
    district: String,
    // Add other address fields as needed
  }]
});

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  logo: String,
  address: {
    city: String,
    district: String,
    fullAddress: String
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  features: [String],
  type: String,
  branches: [{
    // Define branch-specific fields
  }],
  menu: [{
    name: String,
    price: Number,
    content: String,
    image: String
  }]
});

// Add 2dsphere index for geospatial queries
restaurantSchema.index({ location: '2dsphere' });

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  orderDetails: [{
    // Define order details fields
  }],
  orderDate: Date,
  deliveryAddress: {
    // Reference to one of the user's addresses
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User.addresses'
  },
  status: String
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  comment: String,
  rating: Number,
  date: Date
});

// Create models
const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);

// Export the models
module.exports = { User, Restaurant, Order, Review };
