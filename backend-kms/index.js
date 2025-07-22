const express = require('express');
const multer = require('multer');
const cors = require('cors');
const File = require('./models/File');
const fs = require('fs');
const path = require('path');
const summarizeRoute = require("./routes/summarize");
app.use("/summarize", summarizeRoute);


app.post('/summarize', async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) return res.status(400).json({ error: 'Missing filename' });

  try {
    const filePath = path.join(__dirname, 'uploads', fileName);
    const content = fs.readFileSync(filePath, 'utf-8');

    const prompt = `Summarize the following text in bullet points:\n\n${content}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Summarization failed' });
  }
});

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


app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Read file content as text
    const filePath = path.join(__dirname, 'uploads', file.filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Summarize using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes documents.' },
        { role: 'user', content: `Please summarize this document:\n\n${fileContent}` },
      ],
      temperature: 0.5,
    });

    const summary = response.choices[0].message.content;

    // Return summary and uploaded file info
    res.json({
      message: 'File uploaded and summarized successfully',
      summary,
      uploadedFile: {
        originalname: file.originalname,
        filename: file.filename,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize the file' });
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