import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/baseurl';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = requiresOtp ? '/api/v1/auth/verify-email' : '/api/v1/auth/register';
      const body = requiresOtp 
        ? { email: formData.email, otp: formData.otp } 
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Debug: Log raw response
      const rawResponse = await response.text();
      console.log('Raw Response:', rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse); // Attempt to parse JSON
      } catch (err) {
        console.error('Failed to parse JSON:', rawResponse);
        throw new Error('Server returned invalid JSON');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      if (requiresOtp) {
        setSuccess('Email verified! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else if (data.requiresOtp) {
        setRequiresOtp(true);
        setWelcomeMessage(`Welcome ${formData.name}, check your email for OTP.`);
        setSuccess('OTP sent to your email!');
      } else {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Stylish UI components
  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    marginTop: '8px',
    backgroundColor: 'white',
    color: '#333',
    fontSize: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    color: '#653100',
    padding: '14px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px',
    marginTop: '16px',
    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.6)',
    transition: 'all 0.3s',
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #7a4a00, #653100)',
      color: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 20px rgba(101, 49, 0, 0.6)',
      fontFamily: "'Segoe UI', Tahoma, sans-serif"
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontWeight: '700' }}>
        {requiresOtp ? 'Verify OTP' : 'Create Account'}
      </h2>

      {/* Status Messages */}
      {error && (
        <p style={{ color: '#ff6b6b', marginBottom: '16px', fontWeight: '600' }}>
          ⚠️ {error}
        </p>
      )}
      {success && (
        <p style={{ color: '#69db7c', marginBottom: '16px', fontWeight: '600' }}>
          ✅ {success}
        </p>
      )}
      {welcomeMessage && (
        <p style={{ color: '#a5d8ff', marginBottom: '16px' }}>
          👋 {welcomeMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {!requiresOtp ? (
          <>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontWeight: '600' }}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ display: 'block', fontWeight: '600' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                style={inputStyle}
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="otp" style={{ display: 'block', fontWeight: '600' }}>OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              maxLength={6}
              placeholder="Enter 6-digit code"
              style={inputStyle}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => !loading && (e.target.style.transform = 'none')}
        >
          {loading ? (
            <span>⏳ {requiresOtp ? 'Verifying...' : 'Signing Up...'}</span>
          ) : (
            <span>{requiresOtp ? 'Verify OTP' : 'Sign Up'}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;