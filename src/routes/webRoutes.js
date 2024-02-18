const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// GET all documents
router.get('/', webController.getNavbar);

module.exports = router;
