import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./welcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/questions/generate-questions "
      );
      if (response.status === 200) {
        navigate("/general");
      } else {
        console.error("Unexpected response from server:", response.status);
      }
    } catch (error) {
      console.error("Error starting interview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-page">
      <div className="container">
        <header className="hero">
          <h1>GPT_VETTING</h1>
          <p>
            Automatically interview technology candidates faster and make
            informed decisions
          </p>
          <button 
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={startInterview}
            disabled={isLoading}
          >
            {isLoading ? 'Starting Interview...' : 'Start Interview Now'}
          </button>
        </header>

        <section className="card guidelines-card">
          <h2>Interview Guidelines</h2>
          <ul>
            <li>Candidates will first answer personal questions</li>
            <li>Technical questions will follow the personal questions</li>
            <li>
              A minimum score of 50% on AI-generated questions is required to be
              added to the waitlist
            </li>
          </ul>
        </section>

        <section className="card stats-card">
          <h2>Our Impact</h2>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Candidates Vetted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Availability</span>
            </div>
          </div>
        </section>

        <section className="card testimonials-card">
          <h2>What Our Users Say</h2>
          <div className="testimonials">
            <blockquote>
              "This platform streamlined our hiring process and helped us find top talent quickly!"
              <footer>- John Doe, CTO at TechCorp</footer>
            </blockquote>
            <blockquote>
              "The AI-powered interviews are thorough and save us countless hours in initial screenings."
              <footer>- Jane Smith, HR Manager at InnovateTech</footer>
            </blockquote>
          </div>
        </section>
      </div>
      <div className="glow"></div>
    </div>
  );
};

export default WelcomePage;