// user.model.js
const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance with MySQL connection
const sequelize = new Sequelize('softx', 'Kevin', 'Merlika12345', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Define User model
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false // Disable timestamps
  });
  
module.exports = User;
