import React, { useState } from 'react';
import './Hero_4.css';

const Hero_4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const companies = [
    { name: 'TechCorp', description: 'Leading software solutions provider' },
    { name: 'FinanceX', description: 'Innovative financial services company' },
    { name: 'HealthPlus', description: 'Cutting-edge healthcare technology' },
    { name: 'EduLearn', description: 'Revolutionary e-learning platform' },
    { name: 'TechCorp', description: 'Leading software solutions provider' },
    { name: 'FinanceX', description: 'Innovative financial services company' },
    { name: 'HealthPlus', description: 'Cutting-edge healthcare technology' },
    { name: 'EduLearn', description: 'Revolutionary e-learning platform' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % companies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + companies.length) % companies.length);
  };

  return (
    <section className="hero-4">
      <div className="container">
        <h2>Trusted by Leading Employers</h2>
        <p>
          Our AI-powered vetting platform is trusted by companies of all sizes to streamline 
          their hiring process and find the best talent.
        </p>
        
        <div className="company-slider">
          <button className="slider-btn prev" onClick={prevSlide}>&lt;</button>
          <div className="company-card">
            <h3>{companies[currentSlide].name}</h3>
            <p>{companies[currentSlide].description}</p>
          </div>
          <button className="slider-btn next" onClick={nextSlide}>&gt;</button>
        </div>
        
        <div className="hero-4-buttons">
          <button className="btn btn-primary">Start Vetting</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero_4;