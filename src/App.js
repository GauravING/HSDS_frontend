import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load components for better performance
const Landing = lazy(() => import('./components/ResponsiveLandingEnhanced'));
const Dashboard = lazy(() => import('./components/EnhancedDashboard'));
const LiveDetection = lazy(() => import('./components/EnhancedLiveDetection'));
const UploadDetection = lazy(() => import('./components/EnhancedUploadDetection'));
const RegisterForm = lazy(() => import('./components/EnhancedSignupForm'));
const LoginForm = lazy(() => import('./components/EnhancedStylishLoginForm'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create-account" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live" element={<LiveDetection />} />
            <Route path="/upload" element={<UploadDetection />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
