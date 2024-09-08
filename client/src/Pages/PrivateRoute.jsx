import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Assuming 'token' is the key in localStorage for authentication
  const isAuthenticated = !!localStorage.getItem('token'); // Checks if token exists

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

