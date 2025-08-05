import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowLeft, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login, signup, loading, error, clearError, isOnline, testAuthSetup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (!isOnline) {
      toast.error('No internet connection. Please check your network and try again.');
      return;
    }
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log('🔍 Starting authentication process...');
      console.log('Email:', email);
      console.log('Password length:', password.length);
      console.log('Mode:', isSignup ? 'Signup' : 'Login');
      
      if (isSignup) {
        console.log('Creating new account...');
        await signup(email, password, fullName);
        toast.success('Account created successfully! Please check your email for verification.');
        navigate('/email-verification');
      } else {
        console.log('Attempting login...');
        await login(email, password);
        toast.success('Login successful!');
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle email verification error specifically
      if (error.message === 'EMAIL_NOT_VERIFIED') {
        toast.error('Email not verified. Please check your inbox and click the verification link.');
        navigate('/email-verification');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearError();
  };

  const testFirebaseConnection = async () => {
    try {
      console.log('🧪 Testing Firebase connection...');
      const result = await testAuthSetup();
      if (result) {
        toast.success('Firebase connection test successful!');
      } else {
        toast.error('Firebase connection test failed!');
      }
    } catch (error) {
      console.error('Firebase test error:', error);
      toast.error('Firebase test failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary-dark hover:text-accent-red transition-colors mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          {/* Network Status Indicator */}
          {!isOnline && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600 flex items-center justify-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                No internet connection
              </p>
            </div>
          )}
          
          <div className="flex justify-center mb-6">
            <YugaYatraLogo className="w-16 h-16" showText={false} />
          </div>
          
          <h2 className="text-3xl font-bold text-primary-dark mb-2">
            {isSignup ? 'Create Account' : 'Student Login'}
          </h2>
          <p className="text-gray-600">
            {isSignup ? 'Sign up to start your internship journey' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Debug Button - Only in development */}
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={testFirebaseConnection}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
              >
                🔧 Test Firebase Connection
              </button>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <div className="spinner mr-2"></div>
              ) : (
                <FaLock className="mr-2" />
              )}
              {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleMode}
                className="ml-1 text-primary-dark hover:text-accent-red font-medium"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Forgot Password Link */}
          {!isSignup && (
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-dark hover:text-accent-red"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin; 