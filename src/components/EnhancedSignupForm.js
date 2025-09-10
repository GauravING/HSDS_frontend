import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/EnhancedSignupForm.css';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';

const EnhancedSignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true });
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        // Simulate API call
        console.log("Form submitted with data:", formData);
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/login', { state: { fromSignup: true, email: formData.email } });
      } catch (err) {
        setErrors({ form: "Signup failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`enhanced-signup ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-header">
            <h1>Create an Account</h1>
            <p>Join the community and start your journey with us.</p>
          </div>
          
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <span className="icon"><FiUser /></span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.fullName && errors.fullName ? 'input-error' : ''}
              />
              {touched.fullName && errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

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
              />
              {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="input-group">
              <span className="icon"><FiLock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'input-error' : ''}
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="input-group">
              <span className="icon"><FiLock /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {touched.confirmPassword && errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="signup-right">
          <div className="signup-info">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>
                <span className="icon">🛡️</span>
                <div>
                  <h3>Advanced AI Detection</h3>
                  <p>State-of-the-art algorithms for accurate safety compliance</p>
                </div>
              </li>
              <li>
                <span className="icon">📊</span>
                <div>
                  <h3>Real-time Analytics</h3>
                  <p>Comprehensive insights and reporting dashboard</p>
                </div>
              </li>
              <li>
                <span className="icon">🔒</span>
                <div>
                  <h3>Enterprise Security</h3>
                  <p>Bank-level encryption and data protection</p>
                </div>
              </li>
              <li>
                <span className="icon">🚀</span>
                <div>
                  <h3>Instant Setup</h3>
                  <p>Get started in minutes with our intuitive platform</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSignupForm;