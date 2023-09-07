// LogoutButton.js
import React from 'react';
import styles from '../styles';

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear client-side authentication state 
    localStorage.removeItem('userToken');

    // Redirect to the home page 
    window.location.href = '/login';
  };

  return (
    <div style={styles.navRight}> 
    <button onClick={handleLogout} className="button nav">Logout</button>
    </div>
  );
};

export default LogoutButton;
