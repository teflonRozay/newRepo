import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const baseUrl =process.env.REACT_APP_BASEURL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email, triggerEvent:'confirm-reset-password'}),
        
      });

      if (response.ok) {
        navigate('/ResetPassword'); // Navigate to the reset password page
      } else {
        const data = await response.json();
        console.log(data)
        setErrorMessage(data.message || 'Invalid email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while requesting the password reset. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ForgotPassword;
