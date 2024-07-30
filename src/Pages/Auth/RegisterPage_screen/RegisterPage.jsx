import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./RegisterPage.css";
import axios from "axios";
import { registerImg } from "../../../assets/assets";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
        }
      }
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log("Registration successful:", response.data);
      // Handle successful registration (e.g., redirect to login page or dashboard)
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
    console.log("Google login clicked");
  };

  const handleMicrosoftLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/microsoft';
    console.log("Microsoft login clicked");
  };

  return (
    <div className="register-page">
      <div className="register-img">
        <img src={registerImg} alt="Register-image" />
      </div>
      <div className="register-container">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile-picture-upload">
            <label htmlFor="profilePicture" className="profile-picture-label">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="profile-preview" />
              ) : (
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
              )}
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>
          <div className="name-fields">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Phone Number</label>
            <PhoneInput
              country={"us"}
              value={formData.mobile}
              onChange={handlePhoneChange}
              inputProps={{
                name: "mobile",
                required: true,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-register"
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="social-login">
          <p>Or continue with:</p>
          <button onClick={handleGoogleLogin} className="btn btn-secondary">
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
          <button onClick={handleMicrosoftLogin} className="btn btn-secondary">
            <FontAwesomeIcon icon={faMicrosoft} /> Microsoft
          </button>
        </div>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;