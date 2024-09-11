import React from 'react'

import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const jwt = localStorage.getItem("Token")
    return jwt ? children : < Navigate to='/?loginRequired=true' />
}

export default PrivateRoute