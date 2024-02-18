// user.controller.js
const Navbar = require('../models/navbar');

// Get all users
exports.getNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findAll();
    res.json(navbar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
