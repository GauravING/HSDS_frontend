import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './EnhancedStylishLoginForm.css';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedStylishLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const fromSignup = location.state?.fromSignup || false;
  const signupEmail = location.state?.email || '';

  useEffect(() => {
    if (fromSignup) {
      setShowSuccess(true);
      setFormData(prev => ({ ...prev, email: signupEmail }));
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [fromSignup, signupEmail]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateForm();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        // Simulate API call
        console.log("Login submitted with data:", formData);
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/dashboard');
      } catch (err) {
        setErrors({ form: "Login failed. Please check your credentials." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`enhanced-login-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-form-container">
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FiCheck className="success-icon" />
                Account created successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <span className="icon"><FiMail /></span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? 'input-error' : ''}
                disabled={isLoading}
              />
              {touched.email && errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <span className="icon"><FiLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'input-error' : ''}
                disabled={isLoading}
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {touched.password && errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/create-account">Sign up here</Link>
          </p>
        </div>

        <div className="login-info">
          <motion.div 
            className="info-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Welcome Back!</h2>
            <p>Access your safety dashboard and continue monitoring helmet compliance with our advanced AI-powered platform.</p>
            
            <div className="features">
              <div className="feature">
                <span className="icon">🛡️</span>
                <div>
                  <h3>Secure Access</h3>
                  <p>Enterprise-grade security for your data</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">📊</span>
                <div>
                  <h3>Real-time Analytics</h3>
                  <p>Live monitoring and detailed reports</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">🚀</span>
                <div>
                  <h3>Instant Access</h3>
                  <p>Quick login to your personalized dashboard</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedStylishLoginForm;