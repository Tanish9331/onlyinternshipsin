import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowLeft, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

/**
 * ForgotPassword Component
 * 
 * Provides a secure password reset interface that:
 * - Validates email format before submission
 * - Uses Firebase Auth's sendPasswordResetEmail
 * - Shows neutral feedback messages for security
 * - Includes proper accessibility features
 * - Handles loading states and errors gracefully
 */
const ForgotPassword = () => {
  const { resetPassword, loading } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  // Validation state for accessibility
  const [touched, setTouched] = useState(false);

  /**
   * Validates email format using standard regex
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  /**
   * Handles real-time email validation
   * Updates error state for accessibility
   */
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (touched && newEmail.trim()) {
      if (!validateEmail(newEmail)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  /**
   * Handles form submission
   * - Validates email format
   * - Calls Firebase password reset
   * - Shows neutral success message for security
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    
    // Client-side email validation
    if (!email.trim()) {
      setEmailError('Email address is required');
      // Focus the email input for accessibility
      document.getElementById('reset-email')?.focus();
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      document.getElementById('reset-email')?.focus();
      return;
    }
    
    setEmailError('');
    
    try {
      await resetPassword(email.trim());
      setIsSubmitted(true);
      
      // Neutral success message that doesn't reveal account existence
      toast.success('If an account with this email exists, you will receive a password reset link shortly.');
      
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Show neutral error message for security
      // Don't reveal whether the account exists or not
      toast.error('Unable to send reset email. Please try again in a few minutes.');
    }
  };

  /**
   * Handles input blur for validation timing
   */
  const handleEmailBlur = () => {
    setTouched(true);
    if (email.trim() && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  // Show success state after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <YugaYatraLogo className="w-16 h-16" showText={false} />
            </div>
            
            <h2 className="text-3xl font-bold text-primary-dark mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600">
              If an account with this email exists, you will receive a password reset link shortly.
            </p>
          </div>

          {/* Success Message Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FaPaperPlane className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Reset Email Sent
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Check your email inbox and spam folder for the password reset link.
                  The link will expire in 24 hours.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/student/login"
                  className="btn-primary w-full flex justify-center items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Login
                </Link>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                    setTouched(false);
                    setEmailError('');
                  }}
                  className="w-full px-4 py-2 text-primary-dark hover:text-accent-red transition-colors text-sm"
                >
                  Send to Different Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main forgot password form
  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            to="/student/login" 
            className="inline-flex items-center text-primary-dark hover:text-accent-red transition-colors mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
          
          <div className="flex justify-center mb-6">
            <YugaYatraLogo className="w-16 h-16" showText={false} />
          </div>
          
          <h2 className="text-3xl font-bold text-primary-dark mb-2">
            Reset Your Password
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email Input */}
            <div>
              <label 
                htmlFor="reset-email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`input-field pl-10 ${
                    emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your email address"
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  disabled={loading}
                />
              </div>
              
              {/* Email Validation Error */}
              {emailError && (
                <div 
                  id="email-error" 
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {emailError}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !!emailError}
              className="btn-primary w-full flex justify-center items-center"
              aria-describedby="submit-help"
            >
              {loading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Sending Reset Email...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Reset Email
                </>
              )}
            </button>
            
            {/* Help Text */}
            <p 
              id="submit-help" 
              className="text-sm text-gray-500 text-center"
            >
              You will receive an email with instructions to reset your password.
            </p>
          </form>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                to="/student/login"
                className="text-primary-dark hover:text-accent-red font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;