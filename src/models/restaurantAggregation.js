// src/models/restaurantAggregation.js

const mongoose = require('mongoose');
const { Restaurant } = require('./models');

async function findQualifiedRestaurants() {
  try {
    const qualifiedRestaurants = await Restaurant.aggregate([
      // ... (the aggregation query)
    ]);

    console.log(qualifiedRestaurants);
    // Process the result as needed
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

module.exports = { findQualifiedRestaurants };
