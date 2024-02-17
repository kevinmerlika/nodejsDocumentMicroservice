// authMiddleware.js
const User = require('../models/user'); // Import the User model

const checkUserAuthentication = async (req, res, next) => {
    try {
      // Assuming the user ID is sent in the request body
      const { userId } = req.body;
      console.log(req.body);
  
      // Check if the user exists in the database
      const user = await User.findByPk(userId);
      if (user) {
        // If user exists, proceed to the next middleware
        next();
      } else {
        // If user does not exist, send a 401 Unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      // If an error occurs, send a 500 Internal Server Error response
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = checkUserAuthentication;
