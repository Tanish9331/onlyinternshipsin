import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../contexts/TestContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const TestInitializer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { testStarted, questions, startTest, loading } = useTest();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeTest = async () => {
      // Check if user is logged in
      if (!user) {
        navigate('/student/login');
        return;
      }

      // Check if profile is complete
      if (!user.profileComplete) {
        toast.error('Please complete your profile first');
        navigate('/student/dashboard');
        return;
      }

      // If test is already started, proceed to test interface
      if (testStarted && questions.length > 0) {
        navigate('/student/test');
        return;
      }

      // Start the test
      try {
        setInitializing(true);
        const success = await startTest();
        
        if (success) {
          // Wait a moment for the test to be fully initialized
          setTimeout(() => {
            navigate('/student/test');
          }, 500);
        } else {
          navigate('/student/dashboard');
        }
      } catch (error) {
        console.error('Test initialization error:', error);
        toast.error('Failed to initialize test. Please try again.');
        navigate('/student/dashboard');
      } finally {
        setInitializing(false);
      }
    };

    initializeTest();
  }, [user, testStarted, questions, startTest, navigate]);

  if (initializing || loading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <YugaYatraLogo className="w-16 h-16 mx-auto mb-6" showText={true} />
          <div className="spinner mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary-dark mb-2">Initializing Test</h2>
          <p className="text-gray-600 mb-4">Please wait while we prepare your assessment...</p>
          <div className="flex items-center justify-center text-primary-dark">
            <FaSpinner className="animate-spin mr-2" />
            <span className="text-sm">Loading questions...</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TestInitializer; 