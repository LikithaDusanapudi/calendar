import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fdf0ef',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.875rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#3498db'
    }
  },
  radioGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '0.5rem'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#4a5568'
  },
  radio: {
    cursor: 'pointer'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#4a5568',
    fontSize: '0.875rem'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    marginLeft: '0.25rem',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      // Show success message before redirecting
      alert('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/');
      }, 1500); // Short delay to show the success message
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create an Account</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          required
        />
        
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
              style={styles.radio}
            />
            Admin
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
              defaultChecked
              style={styles.radio}
            />
            User
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Create Account
        </button>
      </form>
      
      <p style={styles.footer}>
        Already have an account?
        <a href="/" style={styles.link}>Log in</a>
      </p>
    </div>
  );
}

export default RegisterPage;