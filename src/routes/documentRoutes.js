const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// GET all documents
router.get('/', documentController.getAllDocuments);

// POST create a new document
router.post('/', documentController.createDocument);

router.post('/updateById/:id', documentController.updateDocument);

module.exports = router;
