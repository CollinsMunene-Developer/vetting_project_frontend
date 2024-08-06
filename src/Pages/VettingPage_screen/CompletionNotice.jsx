import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompletionNotice.css';

const CompletionNotice = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/technical');
  };

  return (
    <div className="completion-notice">
      <div className="container">
        <h1>General Assessment Completed</h1>
        <p className="congratulations">Congratulations! You have successfully completed the general assessment part of the vetting process.</p>
        
        <div className="instructions">
          <h2>Instructions for Technical Assessment</h2>
          <ul>
            <li>You will be asked questions about your programming languages proficiency.</li>
            <li>For each language, you'll need to provide your years of experience and skill level.</li>
            <li>Based on your responses, tailored technical questions will be generated.</li>
            <li>Answer each question to the best of your ability.</li>
            <li>You can navigate between different language sections.</li>
            <li>Ensure all questions are answered before final submission.</li>
          </ul>
        </div>

        <p className="good-luck">Good luck with your technical assessment!</p>
        
        <button onClick={handleContinue} className="btn continue-btn">
          Continue to Technical Assessment
        </button>
      </div>
    </div>
  );
};

export default CompletionNotice;