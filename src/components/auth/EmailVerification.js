import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaEnvelope, FaCheckCircle, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const EmailVerification = () => {
  const navigate = useNavigate();
  const { user, sendVerification, logout, isEmailVerified, refreshUserVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Check if user is verified every 3 seconds
  useEffect(() => {
    if (!user) {
      navigate('/student/login');
      return;
    }

    if (isEmailVerified) {
      toast.success('Email verified successfully!');
      navigate('/student/dashboard');
      return;
    }

    const interval = setInterval(async () => {
      try {
        // Force refresh user to get latest verification status
        await refreshUserVerification();
      } catch (error) {
        console.error('Error refreshing user:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, isEmailVerified, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      await sendVerification();
      setCountdown(60); // 60 second cooldown
      toast.success('Verification email sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/student/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary-dark hover:text-accent-red transition-colors mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-center mb-6">
            <YugaYatraLogo className="w-16 h-16" showText={false} />
          </div>
          
          <h2 className="text-3xl font-bold text-primary-dark mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            We've sent a verification link to your email address
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center space-y-6">
            {/* Email Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FaEnvelope className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* User Email */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Verification email sent to:</p>
              <p className="font-semibold text-primary-dark">{user.email}</p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Next Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the verification link in the email</li>
                    <li>Return to this page - it will automatically redirect you</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Loading Indicator */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <FaSpinner className="w-4 h-4 animate-spin" />
              <span>Checking verification status...</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                disabled={isResending || countdown > 0}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isResending || countdown > 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isResending ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </span>
                ) : countdown > 0 ? (
                  `Resend in ${countdown}s`
                ) : (
                  'Resend Verification Email'
                )}
              </button>

              <button
                onClick={refreshUserVerification}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Check Verification Status
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-gray-500">
              <p>Didn't receive the email? Check your spam folder or try resending.</p>
              <p className="mt-1">This page will automatically redirect you once your email is verified.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 