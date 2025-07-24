const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { execFile } = require('child_process');

mongoose.connect('mongodb://localhost:27017/kms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

function summarizeTextWithPython(text) {
  return new Promise((resolve, reject) => {
    const python = execFile(
      "python", 
      ["summarize.py"], 
      { cwd: __dirname }
    );

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
      }
      try {
        const result = JSON.parse(output);
        resolve(result.summary);
      } catch (err) {
        reject(new Error("Failed to parse summary from Python output"));
      }
    });

    python.stdin.write(JSON.stringify({ text }));
    python.stdin.end();
  });
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf8');
    const summary = await summarizeTextWithPython(fileContent); // Call Python summarizer
    res.json({ fileName: req.file.filename, summary });
  } catch (err) {
    console.error("Failed to upload or summarize file:", err);
    res.status(500).json({ error: 'Failed to upload or summarize' });
  }
});

app.get('/files', (req, res) => {
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