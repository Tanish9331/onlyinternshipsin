import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth 
} from '../firebase.js';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser
} from 'firebase/auth';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('Network connection restored');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('Network connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Force refresh user to get latest email verification status
        await user.reload();
        // Get the updated user object after reload
        const updatedUser = auth.currentUser;
        setUser(updatedUser || user);
      } else {
        setUser(null);
      }
      setLoading(false);
      setError(null);
    }, (error) => {
      console.error('Auth state change error:', error);
      setError(error.message);
      setLoading(false);
    });

    // Add global debug functions
    window.debugAuth = {
      testConnection: async () => {
        const { testFirebaseConnection } = await import('../firebase.js');
        return await testFirebaseConnection();
      },
      testAuthSetup: testAuthSetup,
      getAuthState: () => ({ user, loading, error, isOnline }),
      clearError: clearError,
      testLogin: async (email, password) => {
        try {
          console.log('🧪 Testing login with:', email);
          const result = await login(email, password);
          console.log('✅ Login test successful:', result);
          return result;
      } catch (error) {
          console.error('❌ Login test failed:', error);
          return error;
        }
      }
    };

    console.log('🔧 Auth debug functions available: window.debugAuth');

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Retry logic for network failures
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          console.log('Attempting login with email:', email);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('Login successful for user:', userCredential.user.email);
          
          // Check email verification
          if (!userCredential.user.emailVerified) {
            console.log('User email not verified');
            throw new Error('EMAIL_NOT_VERIFIED');
          }
          
          return userCredential.user;
        } catch (error) {
          attempts++;
          console.log(`Login attempt ${attempts} failed:`, error.code, error.message);
          
          // Handle specific error types
          if (error.code === 'auth/network-request-failed') {
            if (attempts < maxAttempts) {
              console.log(`Retrying login in ${attempts * 1000}ms...`);
              await new Promise(resolve => setTimeout(resolve, attempts * 1000));
              continue;
            }
          }
          
          // For invalid credential errors, don't retry
          if (error.code === 'auth/invalid-credential' || 
              error.code === 'auth/user-not-found' || 
              error.code === 'auth/wrong-password') {
            console.log('Invalid credentials detected, not retrying');
            throw error;
          }
          
          // For other errors, retry if we have attempts left
          if (attempts < maxAttempts) {
            console.log(`Retrying login in ${attempts * 1000}ms...`);
            await new Promise(resolve => setTimeout(resolve, attempts * 1000));
            continue;
          }
          
          throw error;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signup = async (email, password, fullName = null) => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name if provided
      if (fullName) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
      }

      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      return userCredential.user;
    } catch (error) {
      console.error('Signup error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      await updateProfile(user, profileData);
    } catch (error) {
      console.error('Profile update error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send email verification
  const sendVerification = async () => {
    try {
      setLoading(true);
      setError(null);
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Email verification error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent successfully');
      
    } catch (error) {
      console.error('Password reset error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Don't set error state for security - let component handle messaging
      // This prevents revealing whether an account exists or not
      throw error;
    } finally {
      setLoading(false);
    }
  };



  // Google sign in with enhanced configuration
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Initiating Google Sign-In...');
      
      // Configure Google Auth Provider
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account', // Always show account selection
        client_id: '464746808135-a4d18mle232elcqa8o40nk4fdmjaibd3.apps.googleusercontent.com'
      });
      
      // Use signInWithPopup for better UX (fallback to redirect if needed)
      let userCredential;
      try {
        userCredential = await signInWithPopup(auth, provider);
      } catch (popupError) {
        console.warn('Popup blocked or failed, trying redirect...', popupError);
        // If popup fails, could implement redirect flow here
        throw popupError;
      }
      
      console.log('✅ Google Sign-In successful');
      
      // Optional: Extract additional Google user info
      const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      const token = credential?.accessToken;
      const user = userCredential.user;
      
      console.log('Google user info:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      });
      
      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Don't set error state - let component handle specific messaging
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Link email with Google account
  const linkEmailWithGoogle = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);
    } catch (error) {
      console.error('Link email error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Re-authenticate user (for sensitive operations)
  const reauthenticate = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error('Re-authentication error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updateUserPassword = async (newPassword) => {
    try {
      setLoading(true);
      setError(null);
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Password update error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete user account
  const deleteUserAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteUser(user);
    } catch (error) {
      console.error('Delete account error:', error);
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Refresh user verification status
  const refreshUserVerification = async () => {
    try {
      if (user) {
        await user.reload();
        // Get the updated user object
        const updatedUser = auth.currentUser;
        if (updatedUser) {
          setUser(updatedUser);
          console.log('User verification status updated:', updatedUser.emailVerified);
          return updatedUser.emailVerified;
        }
      }
      return false;
    } catch (error) {
      console.error('Error refreshing user verification:', error);
      return false;
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/password-does-not-meet-requirements':
        return 'Password does not meet the required criteria. Please ensure your password contains at least one uppercase letter, one lowercase letter, one number, and one special character.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/operation-not-allowed':
        return 'This operation is not allowed.';
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection and try again.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-in was cancelled. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Google Sign-in was cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized for Google Sign-in. Please contact support.';
      case 'auth/operation-not-supported-in-this-environment':
        return 'Google Sign-in is not supported in this environment. Please try a different browser.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email but different sign-in credentials.';
      case 'auth/requires-recent-login':
        return 'This operation requires recent authentication. Please log in again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/email-not-verified':
      case 'EMAIL_NOT_VERIFIED':
        return 'Please verify your email address before accessing the dashboard. Check your inbox for the verification link.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  // Check if user is offline
  const isOffline = () => {
    return !navigator.onLine;
  };

  // Test authentication setup
  const testAuthSetup = async () => {
    try {
      console.log('🧪 Testing authentication setup...');
      
      // Import debug function
      const { debugAuthIssue, testFirebaseConnection } = await import('../firebase.js');
      
      // Test Firebase connection
      const connectionOk = await testFirebaseConnection();
      if (!connectionOk) {
        console.error('❌ Firebase connection failed');
        return false;
      }

      console.log('✅ Authentication setup test completed');
      return true;
    } catch (error) {
      console.error('❌ Authentication setup test failed:', error);
      return false;
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile: updateUserProfile,
    sendVerification,
    resetPassword,
    signInWithGoogle,
    linkEmailWithGoogle,
    reauthenticate,
    updatePassword: updateUserPassword,
    deleteAccount: deleteUserAccount,
    clearError,
    refreshUserVerification,
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false,
    isOnline: isOnline,
    testAuthSetup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 