import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/EnhancedSignupForm.css'; // Make sure this path is correct
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// We only import the bank icon now. The GIF is removed.
import brandIcon from '../assets/bank.png';

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
  
  const navigate = useNavigate();

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
    } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
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
    if (validateForm()) {
      setIsLoading(true);
      try {
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
    <div className="signup-page-wrapper">
      <div className="form-container">
        <div className="form-header">
          <img src={brandIcon} alt="Brand Icon" className="brand-icon" />
          <h1>Create Your Account</h1>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            {/* The FiUser (men icon) is now replaced with your bank icon */}
            <img src={brandIcon} alt="Name" className="input-icon img-icon"/>
            <input
              type="text" name="fullName" placeholder="Full Name"
              value={formData.fullName} onChange={handleChange} onBlur={handleBlur}
              className={touched.fullName && errors.fullName ? 'input-error' : ''}
              required
            />
            {touched.fullName && errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email" name="email" placeholder="Email Address"
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              className={touched.email && errors.email ? 'input-error' : ''}
              required
            />
            {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
              value={formData.password} onChange={handleChange} onBlur={handleBlur}
              className={touched.password && errors.password ? 'input-error' : ''}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(p => !p)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password"
              value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}
              className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(p => !p)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {touched.confirmPassword && errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : 'Create Account'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default EnhancedSignupForm;