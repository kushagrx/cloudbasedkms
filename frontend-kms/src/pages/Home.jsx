import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import UploadedFiles from '../components/UploadedFiles';

const Home = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = () => {
    axios.get('http://localhost:5000/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Header />
        <UploadForm fetchFiles={fetchFiles} />
        <UploadedFiles files={files} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: 800,
  }
};

export default Home;