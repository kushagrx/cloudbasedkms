import React from 'react';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Header />
        <UploadForm />
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