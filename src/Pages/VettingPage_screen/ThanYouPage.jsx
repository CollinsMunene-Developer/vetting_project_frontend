// ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import './ThankYouPage.css';
import { thankYou } from '../../assets/assets';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="content-wrapper">
        <div className="text-content">
          <h1>Thank You for Participating!</h1>
          <p className="subtitle">We appreciate your time and effort in the interview process.</p>
          <div className="message">
            <p>Your candidacy has been carefully reviewed by our team. We want to express our gratitude for your interest in joining our organization and for sharing your experiences and skills with us.</p>
            <p>The evaluation results will be sent to your email shortly. Please keep an eye on your inbox for further information about your application status.</p>
          </div>
          <div className="cta-section">
            <FaEnvelope className="icon" />
            <p>Check your email for the evaluation results</p>
          </div>
          <Link to="/" className="home-button">
            <FaHome className="icon" />
            Return to Homepage
          </Link>
        </div>
        <div className="image-container">
          <img src={thankYou} alt="Thank you" className="thank-you-image" />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;