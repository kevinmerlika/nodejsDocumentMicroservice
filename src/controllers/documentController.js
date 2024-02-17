const Document = require('../models/documents');


//Get all documents
exports.getAllDocuments = async (req, res) => {
    try {
      const documents = await Document.find();
      res.json(documents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Create new doc
  exports.createDocument = async (req, res) => {
    try {
      const newDocument = new Document(req.body);
      await newDocument.save();
      res.status(201).json(newDocument);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // UpdateDocById
  exports.updateDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedDocument = await Document.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json(updatedDocument);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Function to delete a document by ID
  exports.deleteDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedDocument = await Document.findByIdAndDelete(id);
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };