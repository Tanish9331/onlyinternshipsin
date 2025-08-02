import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { sendOTP, verifyOTP, loading } = useAuth();
  
  const [email, setEmail] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Skip OTP and directly authenticate user
    const user = {
      id: 'student_' + Date.now(),
      email,
      name: 'Student User',
      phone: '',
      college: '',
      profileComplete: false,
    };
    
    const token = 'student_token_' + Date.now();
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', 'student');
    localStorage.setItem('userData', JSON.stringify(user));
    
    toast.success('Login successful! Redirecting to test...');
    
    // Redirect directly to test page
    navigate('/student/test');
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
          
          <div className="flex justify-center mb-6">
            <YugaYatraLogo className="w-16 h-16" showText={false} />
          </div>
          
          <h2 className="text-3xl font-bold text-primary-dark mb-2">
            Student Login
          </h2>
          <p className="text-gray-600">
            Enter your email to start your test
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSendOTP} className="space-y-6">
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <div className="spinner mr-2"></div>
              ) : (
                <FaEnvelope className="mr-2" />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Don't have an account?
              </p>
              <button
                type="button"
                onClick={() => {
                  toast('Registration is automatic! Just enter your email above to get started.');
                }}
                className="text-gold-600 hover:text-gold-700 text-sm font-medium transition-colors underline"
              >
                New User? Get Started
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <span className="text-primary-dark font-medium">
              Quick access to your internship test
            </span>
          </p>
        </div>

        {/* Info Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 mb-2">Ready to Test!</h3>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Enter any valid email to get started</li>
            <li>• Take the internship assessment test</li>
            <li>• Get your results and certificates instantly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin; 