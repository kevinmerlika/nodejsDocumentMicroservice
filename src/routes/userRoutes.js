const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all documents
router.get('/', userController.getAllUsers);

module.exports = router;
