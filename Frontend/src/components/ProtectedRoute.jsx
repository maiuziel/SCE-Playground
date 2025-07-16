// frontend/src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../store/StoreContext.jsx';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(StoreContext);

  if (!token) {
    
    return <Navigate to="/signin" replace />;
  }

  return children;
}
