import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = async (e) =>{
    e.preventDefault();
    setIsLoading(true);

    if(formData.passwword !== formData.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    if(formData.password.length < 8){
      alert("Password must be at least 8 characters long");
      return;
    }

    if(!formData.mobile){
      alert("Please enter a valid phone number");
      return;
    }
    if(!formData.email){
      alert("Please enter a valid email address");
      return;
    }
    if(!formData.username){
      alert("Please enter a valid username");
      return;
    }
    if(!formData.firstName){
      alert("Please enter your first name");
      return;
    }
    if(!formData.lastName){
      alert("Please enter your last name");
      return;
    }

    try{
      const response = await axios.post('http://localhost:3001/api/auth/register')
      console.log(response.data);
      alert("Registration successful");
      window.location.href = "/login";
      setIsLoading(false);

    }
    catch(error){
      alert(error.response.data.message);
      setIsLoading(true);
    }

    
  }
  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:3001/api/auth/${provider}`;
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="register-page">
      <div className="register-img">
        <img src={registerImg} alt="Register" />
      </div>
      <div className="register-container">
        <h1>Create an Account</h1>
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
          <button onClick={() => handleSocialLogin('google')} className="btn btn-secondary">
            <FontAwesomeIcon icon={faGoogle} /> Google
          </button>
          <button onClick={() => handleSocialLogin('microsoft')} className="btn btn-secondary">
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