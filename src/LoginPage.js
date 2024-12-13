import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/login.css'; // Import your CSS file for styling

const LoginPage = ({ setloggedin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const res = await axios.post('https://backend-clubweb.onrender.com/auth/login', formData);
      console.log('Login successful:', res.data);

      // Store token and user ID in local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setloggedin(true);

      // Navigate to the request page after successful login
      navigate('/requestpage'); // Replace with the actual route for RequestPage
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please check your email and password.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-header">LOGIN</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message display */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'} {/* Loading state in button */}
        </button>
        <br />
        <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
          <h3 className="signup-link">Sign up, if you don't have an account</h3>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
