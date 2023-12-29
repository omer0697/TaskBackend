// src/models/userAggregation.js

const mongoose = require('mongoose');
const { Review, User } = require('./models');

async function getLast20MaleUsers() {
  try {
    const last20MaleUsers = await Review.aggregate([
      // ... (the aggregation query for the first 20 male users)
    ]);

    console.log(last20MaleUsers);
    // Process the result as needed
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

async function getNext20MaleUsers() {
  try {
    const next20MaleUsers = await Review.aggregate([
      // ... (the aggregation query for the next 20 male users)
    ]);

    console.log(next20MaleUsers);
    // Process the result as needed
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

module.exports = { getLast20MaleUsers, getNext20MaleUsers };
