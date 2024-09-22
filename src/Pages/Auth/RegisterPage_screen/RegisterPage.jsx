import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./RegisterPage.css";
import axios from "axios";
import { registerImg } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must include lowercase, uppercase, numbers, and special characters, and be at least 8 characters long"
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }
      );

      console.log(response.data);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/${provider}`;
  };

  return (
    <div className="register-page">
      <div className="register-img">
        <img src={registerImg} alt="Register" />
      </div>
      <div className="register-container">
        <h1>Create an Account</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
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
              minLength="3"
              maxLength="30"
              pattern="^[a-zA-Z0-9_]+$"
              title="Username can only contain letters, numbers, and underscores"
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
                minLength="8"
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
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Register"}
          </button>
        </form>
        <div className="social-login">
          <p>Or continue with:</p>
          <button
            onClick={() => handleSocialLogin("google")}
            className="btn btn-secondary"
          >
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
          <button
            onClick={() => handleSocialLogin("microsoft")}
            className="btn btn-secondary"
          >
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
