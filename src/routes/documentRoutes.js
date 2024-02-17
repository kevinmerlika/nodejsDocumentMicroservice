const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const checkUserAuthentication = require('../middlewares/authMiddleware');
// GET all documents
router.post('/', checkUserAuthentication, documentController.getAllDocuments);


// POST create a new document
router.post('/create', documentController.createDocument);

router.post('/updateById/:id', documentController.updateDocument);

module.exports = router;
