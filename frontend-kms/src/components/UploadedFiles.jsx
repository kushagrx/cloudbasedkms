// src/components/UploadedFiles.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/files')
      .then(res => {
        setFiles(res.data);
      })
      .catch(err => {
        console.error('Error fetching files:', err);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
        <h2>Uploaded Files</h2>
<ul>
  {files.map((file, index) => (
    <li key={index}>
      <a href={file.url} target="_blank" rel="noopener noreferrer">
        {file.name}
      </a>
    </li>
  ))}
</ul>

    </div>
  );
};

export default UploadedFiles;