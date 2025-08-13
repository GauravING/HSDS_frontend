import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import LiveDetection from './components/LiveDetection';
import UploadDetection from './components/UploadDetection';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'; // ✅ Added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live" element={<LiveDetection />} />
        <Route path="/upload" element={<UploadDetection />} />
      </Routes>
    </Router>
  );
}

export default App;
