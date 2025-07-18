import React from 'react';
import icon from '../assets/icon.png'; // put any book emoji/image as icon.png

const Header = () => {
  return (
    <div style={styles.header}>
      <img src={icon} alt="Book Icon" style={styles.icon} />
      <h1 style={styles.title}>Knowledge Management System</h1>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  }
};

export default Header;