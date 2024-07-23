import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './pages/LoginandRegist/auth.service';

const ProtectedRoute = ({ children }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || !currentUser.roles.includes("ROLE_ADMIN")) {
    return (
      <div>
        <p>You can't access control</p>
        <button onClick={() => window.location.href = '/'}>Back to Home</button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
