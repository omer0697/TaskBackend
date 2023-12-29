// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes');

// ... (other imports and configurations)

const app = express();

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

// ... (other configurations)

// Use restaurant routes
app.use('/restaurants', restaurantRoutes);

// ... (other routes and configurations)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
