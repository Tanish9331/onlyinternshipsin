import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { isAuthenticated, user, loading, isEmailVerified } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-primary-dark">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  // Check email verification for students (not admins)
  if (userType === 'student' && !isEmailVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  // Check if user has required role (if specified)
  if (userType) {
    // For now, we'll use a simple role check based on user properties
    // You can extend this based on your user data structure
    const userRole = user?.displayName?.includes('Admin') ? 'admin' : 'student';
    
    if (userRole !== userType) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 