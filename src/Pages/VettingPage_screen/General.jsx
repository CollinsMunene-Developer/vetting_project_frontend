import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./General.css";

const api = axios.create({
  baseURL: 'https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const General = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await api.get('/questions/generate-questions');  
      if (response.data && response.data.questions && response.data.questions.length > 0) {
        setQuestions(response.data.questions);
      } else {
        throw new Error('No questions received from the server');
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchQuestions();
    } else {
      setError("Please log in to generate questions");
      navigate("/login");
    }
  }, [fetchQuestions, navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const submitAnswers = async () => {
    setIsSubmitting(true);
    try {
      const submissions = questions.map(question => ({
        questionId: question._id,
        answer: answers[question._id] || ""
      }));

      await api.post("questions/submit-answer", { answers: submissions });
      navigate("/completion-notice");
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers[currentQuestion._id] && answers[currentQuestion._id].trim() !== "";
  };

  if (isLoading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div className="no-questions">No questions available. Please try again later.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="general-page">
      <div className="question-container">
        <h1>General Questions</h1>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
          ></div>
        </div>
        <h2 className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p className="question">{currentQuestion.question}</p>
        <textarea
          value={answers[currentQuestion._id] || ""}
          onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
          placeholder="Type your answer here..."
          rows="4"
        ></textarea>
        {!isCurrentQuestionAnswered() && (
          <p className="error-message">Please answer the question before proceeding.</p>
        )}
        <div className="navigation-buttons">
          <button 
            onClick={goToPreviousQuestion} 
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary"
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button 
              onClick={submitAnswers} 
              className={`btn btn-submit ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || !isCurrentQuestionAnswered()}
            >
              {isSubmitting ? 'Submitting...' : 'Submit All Answers'}
            </button>
          ) : (
            <button 
              onClick={goToNextQuestion} 
              className="btn btn-primary"
              disabled={!isCurrentQuestionAnswered()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default General;