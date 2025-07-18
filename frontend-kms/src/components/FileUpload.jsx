import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ setSummary, setFileName }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setSummary(res.data.summary);
      setFileName(res.data.fileName);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="card">
      <h3>Upload a Document</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Summarize</button>
    </div>
  );
}

export default FileUpload;