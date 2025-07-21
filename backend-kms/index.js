const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const File = require('./models/File');
const fs = require('fs');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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


app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileMeta = new File({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    await fileMeta.save();

    res.json({ message: '✅ File uploaded and saved to DB', file: req.file });
  } catch (err) {
    console.error('Error saving file to DB:', err);
    res.status(500).json({ error: 'Failed to save file to DB' });
  }
});


app.get('/api/files', (req, res) => {
  const uploadFolder = path.join(__dirname, 'uploads');
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read files' });
    }

    const fileList = files.map(filename => ({
      name: filename,
      url: `http://localhost:5000/uploads/${filename}`,
    }));

    res.json(fileList);
  });
});


app.listen(5000, () => {
  console.log('🚀 Server started on http://localhost:5000');
});