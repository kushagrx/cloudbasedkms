import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) return setStatus("No file selected.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('✅ File uploaded successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setStatus('❌ Upload failed.');
    }
  };

  const summarizeFile = async (file) => {
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const fileText = reader.result;

      const res = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fileText }),
      });

      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to summarize.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file.');
    };

    reader.readAsText(file);
  } catch (err) {
    setError('Server error during summarization.');
  }
};

  return (
    <div>
      <h2>Upload a File</h2>
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        if (file) summarizeFile(file);
      }}/>
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default FileUpload;