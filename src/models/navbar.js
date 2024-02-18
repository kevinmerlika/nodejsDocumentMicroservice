// navbar.model.js
const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance with MySQL connection
const sequelize = new Sequelize('softx', 'Kevin', 'Merlika12345', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Define User model
const Navbar = sequelize.define('Navbar', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: false // Disable timestamps
});
  
module.exports = Navbar;
