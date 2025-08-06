import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { TestProvider } from './contexts/TestContext';

// Components
import HomePage from './components/HomePage';
import StudentLogin from './components/auth/StudentLogin';
import AdminLogin from './components/auth/AdminLogin';
import ForgotPassword from './components/auth/ForgotPassword';
import EmailVerification from './components/auth/EmailVerification';
import StudentDashboard from './components/student/StudentDashboard';
import StudentProfile from './components/student/StudentProfile';
import StudentPerformance from './components/student/StudentPerformance';
import AdminDashboard from './components/admin/AdminDashboard';
import TestInterface from './components/test/TestInterface';
import TestResults from './components/test/TestResults';
import TestInitializer from './components/test/TestInitializer';
import TestDebug from './components/test/TestDebug';
import TermsAgreement from './components/common/TermsAgreement';
import TermsAndConditions from './components/common/TermsAndConditions';
import PaymentPage from './components/payment/PaymentPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import DevTools from './components/common/DevTools';

// Styles
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TestProvider>
          {/* Main App Content */}
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              <Route path="/terms" element={<TermsAgreement />} />
              <Route path="/terms-conditions" element={<TermsAndConditions />} />
              
              {/* Protected Student Routes */}
              <Route 
                path="/student/dashboard" 
                element={
                  <ProtectedRoute userType="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/profile" 
                element={
                  <ProtectedRoute userType="student">
                    <StudentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/performance" 
                element={
                  <ProtectedRoute userType="student">
                    <StudentPerformance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/payment" 
                element={
                  <ProtectedRoute userType="student">
                    <PaymentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/test-init" 
                element={
                  <ProtectedRoute userType="student">
                    <TestInitializer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/test" 
                element={
                  <ProtectedRoute userType="student">
                    <TestInterface />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/results" 
                element={
                  <ProtectedRoute userType="student">
                    <TestResults />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student/test-debug" 
                element={
                  <ProtectedRoute userType="student">
                    <TestDebug />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            
            {/* DevTools - Always Available */}
            <DevTools />
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#2C3E50',
                  color: '#fff',
                  fontFamily: 'Poppins, sans-serif',
                },
                success: {
                  iconTheme: {
                    primary: '#27AE60',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#E74C3C',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </TestProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 