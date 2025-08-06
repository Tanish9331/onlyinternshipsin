import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for managing forgot password functionality
 * 
 * Provides:
 * - Email validation
 * - Form state management
 * - Error handling
 * - Loading states
 * - Submission logic
 * 
 * @returns {Object} Hook methods and state
 */
export const useForgotPassword = () => {
  const { resetPassword, loading } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
   * Handles email input changes with real-time validation
   * @param {string} newEmail - New email value
   */
  const handleEmailChange = (newEmail) => {
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
   * Handles email input blur for validation timing
   */
  const handleEmailBlur = () => {
    setTouched(true);
    if (email.trim() && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  /**
   * Validates form before submission
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    setTouched(true);
    
    if (!email.trim()) {
      setEmailError('Email address is required');
      return false;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  /**
   * Submits the forgot password request
   * @returns {Promise<boolean>} - True if successful
   */
  const submitForgotPassword = async () => {
    if (!validateForm()) {
      return false;
    }
    
    try {
      await resetPassword(email.trim());
      setIsSubmitted(true);
      return true;
    } catch (error) {
      // Error is handled by the component for security reasons
      throw error;
    }
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setEmail('');
    setEmailError('');
    setTouched(false);
    setIsSubmitted(false);
  };

  /**
   * Goes back to the form from success state
   */
  const goBackToForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setTouched(false);
    setEmailError('');
  };

  return {
    // State
    email,
    emailError,
    touched,
    isSubmitted,
    loading,
    
    // Validation
    validateEmail,
    isFormValid: !emailError && email.trim() && validateEmail(email),
    
    // Handlers
    handleEmailChange,
    handleEmailBlur,
    submitForgotPassword,
    resetForm,
    goBackToForm,
    
    // Utilities
    focusEmailInput: () => document.getElementById('reset-email')?.focus()
  };
};

export default useForgotPassword;