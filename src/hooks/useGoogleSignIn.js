import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

/**
 * Custom hook for Google Sign-In functionality
 * 
 * Provides:
 * - Google Sign-In logic with error handling
 * - Loading state management
 * - Navigation after successful sign-in
 * - User-friendly error messages
 * - Network status checking
 * 
 * @returns {Object} Hook methods and state
 */
export const useGoogleSignIn = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, loading, isOnline } = useAuth();
  
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  /**
   * Handles Google Sign-In with comprehensive error handling
   * @param {Object} options - Configuration options
   * @param {string} options.redirectTo - Where to redirect after successful sign-in
   * @param {boolean} options.showToast - Whether to show success/error toasts
   * @returns {Promise<boolean>} - True if successful
   */
  const handleGoogleSignIn = async ({ 
    redirectTo = '/student/dashboard', 
    showToast = true 
  } = {}) => {
    // Check network connectivity
    if (!isOnline) {
      if (showToast) {
        toast.error('No internet connection. Please check your network and try again.');
      }
      return false;
    }

    setIsGoogleLoading(true);

    try {
      console.log('🔍 Starting Google Sign-In process...');
      
      const user = await signInWithGoogle();
      
      console.log('✅ Google Sign-In successful:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      });
      
      if (showToast) {
        toast.success(`Welcome${user.displayName ? `, ${user.displayName}` : ''}!`);
      }
      
      // Navigate based on email verification status
      if (user.emailVerified) {
        navigate(redirectTo);
      } else {
        // Google accounts are typically pre-verified, but handle edge case
        navigate('/email-verification');
      }
      
      return true;
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      
      const errorMessage = getGoogleSignInErrorMessage(error);
      
      if (showToast) {
        toast.error(errorMessage);
      }
      
      return false;
    } finally {
      setIsGoogleLoading(false);
    }
  };

  /**
   * Gets user-friendly error messages for Google Sign-In errors
   * @param {Error} error - The error object from Firebase
   * @returns {string} - User-friendly error message
   */
  const getGoogleSignInErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Google Sign-in was cancelled. Please try again if you want to continue.';
      
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized for Google Sign-in. Please contact support.';
      
      case 'auth/operation-not-supported-in-this-environment':
        return 'Google Sign-in is not supported in this browser. Please try a different browser.';
      
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method. Please try signing in with email and password.';
      
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      
      case 'auth/operation-not-allowed':
        return 'Google Sign-in is not enabled. Please contact support.';
      
      case 'auth/invalid-credential':
        return 'Google Sign-in failed due to invalid credentials. Please try again.';
      
      default:
        return error.message || 'Failed to sign in with Google. Please try again.';
    }
  };

  /**
   * Checks if Google Sign-In is available in the current environment
   * @returns {boolean} - True if Google Sign-In is supported
   */
  const isGoogleSignInSupported = () => {
    // Check if we're in a supported environment
    if (typeof window === 'undefined') return false;
    
    // Check if pop-ups are likely to work
    try {
      const popup = window.open('', '_blank', 'width=1,height=1');
      if (popup) {
        popup.close();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return {
    // Main function
    handleGoogleSignIn,
    
    // State
    isGoogleLoading,
    isLoading: loading || isGoogleLoading,
    isOnline,
    
    // Utilities
    getGoogleSignInErrorMessage,
    isGoogleSignInSupported,
    
    // For testing/debugging
    testGoogleSignIn: () => handleGoogleSignIn({ 
      redirectTo: '/student/dashboard', 
      showToast: true 
    })
  };
};

export default useGoogleSignIn;