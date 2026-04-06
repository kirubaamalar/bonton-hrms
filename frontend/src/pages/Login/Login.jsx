import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import { RiLeafLine } from 'react-icons/ri';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel — Gradient Art */}
      <div className="login-left">
        <div className="login-decor-circle"></div>
        <div className="login-decor-circle"></div>
        <div className="login-decor-circle"></div>

        <div className="login-left-content">
          <div className="login-left-label">
            Bonton HRMS
          </div>
          <h1 className="login-left-title">
            Manage Your<br />
            Workforce<br />
            Effortlessly
          </h1>
          <p className="login-left-subtitle">
            Streamline HR operations, track attendance, manage payroll, and empower your team — all in one powerful platform.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="login-right">
        <div className="login-form-wrapper">
          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">
              <RiLeafLine />
            </div>
            <div className="login-logo-text">
              Bonton <span>HRMS</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="login-heading">Welcome Back</h2>
          <p className="login-subheading">
            Enter your credentials to access your account
          </p>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              <HiOutlineExclamationCircle size={18} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <div className="form-input-wrapper">
                <input
                  className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="form-input-wrapper">
                <input
                  className="form-input has-icon"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="form-forgot">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="login-btn"
              id="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
