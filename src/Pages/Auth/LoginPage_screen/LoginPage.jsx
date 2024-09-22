import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loginimg } from "../../../assets/assets";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {

      navigate('/');
          const response = await axios.post('https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/api/auth/login', formData);
      console.log('Login success:', response.data);
        localStorage.setItem('token', response.data.token);  window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const goToReset = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <h1>Welcome Back!</h1>
        <p>Login to your account</p>
        <img src={loginimg} alt="Login" style={{ height: "300px", width: "100%" }} />
      </div>

      <div className="login-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-login" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-footer">
          <a href="#forgot-password" className="forgot-password" onClick={goToReset}>
            Forgot Password?
          </a>
          <p>
            Don't have an account? <a href="/register" onClick={goToRegister}>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;