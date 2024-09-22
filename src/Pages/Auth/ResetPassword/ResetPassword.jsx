import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ResetPassword.css';
import axios from 'axios';

const ResetPassword = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/reset-password', { email });
      console.log('Reset requested for:', email);
      setMessage(response.data.message);
      setStep('verify');
    } catch (err) {
      console.error("Error sending reset request:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred while requesting password reset");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/verify-reset-token', {
        email,
        token: verificationCode
      });
      console.log('Code verified successfully');
      setMessage(response.data.message || "Code verified successfully");
      setStep('reset');
    } catch (err) {
      console.error("Error verifying code:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid verification code. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      const response = await axios.post('https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/set-new-password', {
        email,
        token: verificationCode,
        newPassword
      });
      setMessage(response.data.message || "Password reset successfully");
      //redirect to login Page
      window.location.href = '/login';
      
    } catch (err) {
      console.error("Error resetting password:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred while resetting the password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h1>Reset Password</h1>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
        {step === 'request' && (
          <form onSubmit={handleRequestReset}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-reset">Request Reset</button>
          </form>
        )}
        {step === 'verify' && (
          <form onSubmit={handleVerifyCode}>
            <div className="form-group">
              <label htmlFor="verificationCode">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-reset">Verify Code</button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-reset">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;