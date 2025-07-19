const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: String,
  storedName: String,
  path: String,
  size: Number,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', fileSchema);