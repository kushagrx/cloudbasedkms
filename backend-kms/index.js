const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
module.exports = upload;

// --- ROUTE to handle file upload ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Debugging
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// Start the server
app.listen(5000, () => {
  console.log('🚀 Server started on http://localhost:5000');
});