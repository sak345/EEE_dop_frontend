import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const userRole = localStorage.getItem('role'); // Assuming the role is stored in localStorage

    if (userRole !== 'admin') {
        return <Navigate to="/homepage?notAuthorized=true" />;
    }

    return children;
};

export default AdminRoute;