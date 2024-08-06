import React from 'react';
import './Hero_3.css';
import { useNavigate } from 'react-router-dom';

const Hero_3 = () => {
  const navigate = useNavigate();
  const handleLearnMore = () => {
    navigate('/about');
  };
  const handleStartVetting = () => {
    navigate('/welcome');
  };

  return (
    <section className="hero-3">
      <div className="container">
        <div className="hero-3-content">
          <div className="hero-3-text">
            <h2>Accurate Assessments</h2>
            <h3>Uncover the Best Talent</h3>
            <p>
              Our AI-powered assessment tools provide detailed insights into candidate skills, 
              personality traits, and cultural fit to help you make informed hiring decisions.
            </p>
          </div>
          <div className="hero-3-buttons">
            <button className="btn btn-primary" onClick={handleStartVetting}>Start Vetting</button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero_3;