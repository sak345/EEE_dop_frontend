// LogoutButton.js
import React, { useEffect } from 'react'
import styles from '../styles'
import { googleLogout } from '@react-oauth/google';



const LogoutButton = () => {
  const handleLogout = () => {
    // Clear client-side authentication state
    googleLogout();
    localStorage.removeItem('Token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    localStorage.removeItem('picture')

    // Redirect to the home page
    window.location.href = '/?logout=true'
  }

  return (
    <div style={styles.navRight}>
      <button onClick={handleLogout} className='button nav'>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
