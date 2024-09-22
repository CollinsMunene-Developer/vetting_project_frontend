import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./welcomePage.css";

const api = axios.create({
  baseURL: 'https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please log in to start the interview");
      navigate("/login");
    }
  }, [navigate]);

  const startInterview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Starting interview...");
      const response = await api.get("/questions/generate-questions");
      console.log("Response received:", response);
      if (response.status === 200 && response.data.questions) {
        console.log("Navigating to /general");
        navigate("/general", { state: { questions: response.data.questions } });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error starting interview:", error);
      setError(`Error starting interview: ${error.message}. Please try again.`);
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
          {error && <p className="error-message">{error}</p>}
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