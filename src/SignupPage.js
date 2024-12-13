import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/login.css'; // Import your CSS file for consistent styling

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [success, setSuccess] = useState(null); // State for success message
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const res = await axios.post('https://backend-clubweb.onrender.com/auth/signup', formData);
      setSuccess('Signup successful!'); // Set success message
      console.log('Signup successful:', res.data);
      navigate('/loginpage');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Signup failed!'); // Set error message
      console.error('Error signing up:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login"> {/* Use the same class for styling */}
      
      <form onSubmit={handleSubmit} className="login-form"> {/* Use the same class for styling */}
      <h2 className="login-header">Sign Up</h2>
        <input
          
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="login-input" // Add class for consistent input styling
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="login-input" // Add class for consistent input styling
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="login-input" // Add class for consistent input styling
        />
        <button type="submit" disabled={loading} className="login-button"> {/* Add class for button styling */}
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
    </div>
  );
};

export default SignupPage;
