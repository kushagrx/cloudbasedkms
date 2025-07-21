import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setUploadedFiles([selectedFile]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('⚠️ Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError('');
      setSummary('');

      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data?.summary;
      setSummary(result || '⚠️ No summary returned.');
      setFile(null);
      fetchUploadedFiles();

    } catch (err) {
      console.error(err);
      setError('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setUploadedFiles(response.data);
    } catch (err) {
      console.error('Error fetching uploaded files:', err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

return (
  <div style={styles.wrapper}>
    <h2 style={styles.title}>Upload a Document</h2>
    <input type="file" onChange={handleFileChange} />
    <button style={styles.button} onClick={handleSubmit} disabled={loading}>
      {loading ? 'Summarizing...' : 'Upload & Summarize'}
    </button>

    {error && <p style={styles.error}>{error}</p>}

    {summary && (
      <div style={styles.resultBox}>
        <h3>Summary:</h3>
        <p>{summary}</p>
      </div>
    )}

    {uploadedFiles.length > 0 && (
      <div style={styles.resultBox}>
        <h3>Uploaded Files:</h3>
        <ul>
          {uploadedFiles.map((file, index) => {
            const fileName = typeof file === 'string'
              ? file
              : file.originalname || file.name || `File ${index + 1}`;

            return (
              <li key={index}>
                <a
                  href={`http://localhost:5000/uploads/${fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fileName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </div>
);

};

const styles = {
  wrapper: {
    backgroundColor: '#f0f3f8',
    padding: 30,
    borderRadius: 10,
  },
  title: {
    marginBottom: 15,
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  button: {
    marginTop: 15,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  error: {
    color: 'red',
    marginTop: 10,
  }
};

export default UploadForm;