// src/controllers/restaurantController.js or src/routes/restaurantRoutes.js

const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models/models');

router.get('/nearest-restaurants', async (req, res) => {
  try {
    const targetCoordinates = [39.93, 32.85];

    // Find the five nearest restaurants with "lahmacun" in the description
    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: targetCoordinates,
          },
        },
      },
      description: { $regex: /lahmacun/i }, // Case-insensitive search for "lahmacun" in description
    })
      .limit(5)
      .exec();

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get paginated restaurants sorted by average rating
router.get('/restaurants', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size if not provided
  
      const skip = (page - 1) * pageSize;
  
      const restaurants = await Restaurant.aggregate([
        {
          $addFields: {
            averageRating: { $avg: '$ratings.rating' },
          },
        },
        {
          $sort: { averageRating: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
  
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

module.exports = router;
