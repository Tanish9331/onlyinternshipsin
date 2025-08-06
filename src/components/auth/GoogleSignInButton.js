import React from 'react';
import { FaGoogle } from 'react-icons/fa';

/**
 * GoogleSignInButton Component
 * 
 * A reusable, accessible Google Sign-In button that:
 * - Follows Google's brand guidelines
 * - Supports loading states
 * - Is keyboard accessible
 * - Works on mobile and desktop
 * - Provides proper ARIA attributes
 */
const GoogleSignInButton = ({ 
  onClick, 
  loading = false, 
  disabled = false, 
  fullWidth = true,
  children = "Continue with Google"
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : 'inline-flex'}
        flex items-center justify-center
        px-4 py-3
        border border-gray-300
        rounded-lg
        bg-white
        text-gray-700
        font-medium
        text-sm
        shadow-sm
        hover:bg-gray-50
        hover:border-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-white
        disabled:hover:border-gray-300
        transition-all
        duration-200
        ${loading ? 'cursor-wait' : 'cursor-pointer'}
      `}
      aria-label={loading ? 'Signing in with Google...' : 'Sign in with Google'}
      aria-describedby="google-signin-help"
    >
      {loading ? (
        <>
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
          <span>Signing in...</span>
        </>
      ) : (
        <>
          {/* Google Icon */}
          <FaGoogle 
            className="h-5 w-5 mr-3 text-red-500" 
            aria-hidden="true" 
          />
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

/**
 * GoogleSignInSection Component
 * 
 * Complete Google Sign-In section with:
 * - Divider line
 * - Sign-in button
 * - Help text
 * - Accessibility features
 */
export const GoogleSignInSection = ({ 
  onGoogleSignIn, 
  loading = false, 
  disabled = false,
  showDivider = true 
}) => {
  return (
    <div className="space-y-4">
      {/* Divider */}
      {showDivider && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
      )}

      {/* Google Sign-In Button */}
      <GoogleSignInButton
        onClick={onGoogleSignIn}
        loading={loading}
        disabled={disabled}
        fullWidth={true}
      />

      {/* Help Text */}
      <p 
        id="google-signin-help" 
        className="text-xs text-gray-500 text-center"
      >
        By signing in with Google, you agree to our{' '}
        <a 
          href="/terms-conditions" 
          className="text-primary-dark hover:text-accent-red underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        {' '}and{' '}
        <a 
          href="/privacy-policy" 
          className="text-primary-dark hover:text-accent-red underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default GoogleSignInButton;