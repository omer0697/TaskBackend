// src/models/updateMenuScript.js

const mongoose = require('mongoose');
const { Restaurant, Menu } = require('./models');

async function updateMenu() {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Define the new menu items
    const newItems = [
      { name: 'Küçük Boy Peynirli Pizza', price: 50 },
      { name: 'Orta Boy Mantarlı Pizza', price: 100 },
      { name: 'Hamburger', price: 120 },
    ];

    // Find the "Voco Fast Food" restaurant
    const vocoRestaurant = await Restaurant.findOne({ name: 'Voco Fast Food' }).session(session);

    // Create new Menu items
    const menuItems = await Menu.create(newItems, { session });

    // Add the new menu items to the restaurant's menu
    vocoRestaurant.menu.push(...menuItems);

    // Save changes
    await vocoRestaurant.save({ session });

    // Commit the transaction
    await session.commitTransaction();
  } catch (error) {
    // An error occurred, abort the transaction
    await session.abortTransaction();
    console.error(error);
  } finally {
    // End the session
    session.endSession();
  }
}

// Call the function to update the menu
updateMenu();
