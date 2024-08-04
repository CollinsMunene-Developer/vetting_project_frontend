import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnswerQuestions.css';

const AnswerQuestions = ({ candidateId }) => {
  const [questions, setQuestions] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [candidateId]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/candidate/submitLanguages${candidateId}`);
      setQuestions(response.data.questions);
      const languageKeys = Object.keys(response.data.questions);
      setCurrentLanguage(languageKeys[0]);
      setCurrentLanguageIndex(0);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentLanguage]: {
        ...prev[currentLanguage],
        [questionId]: value,
      },
    }));
  };

  const nextLanguage = () => {
    const languageKeys = Object.keys(questions);
    if (currentLanguageIndex < languageKeys.length - 1) {
      setCurrentLanguageIndex(currentLanguageIndex + 1);
      setCurrentLanguage(languageKeys[currentLanguageIndex + 1]);
    }
  };

  const prevLanguage = () => {
    if (currentLanguageIndex > 0) {
      setCurrentLanguageIndex(currentLanguageIndex - 1);
      setCurrentLanguage(Object.keys(questions)[currentLanguageIndex - 1]);
    }
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:3001/candidate/submitAnswers', {
        candidateId,
        answers: Object.entries(answers).flatMap(([language, languageAnswers]) =>
          Object.entries(languageAnswers).map(([questionId, answer]) => ({
            language,
            questionId,
            answer,
          }))
        ),
      });
      // Handle successful submission (e.g., show a success message or navigate to a results page)
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Failed to submit answers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="answer-questions">
      <h2>Technical Questions - {currentLanguage}</h2>
      {questions[currentLanguage] && questions[currentLanguage].map((q, index) => (
        <div key={index} className="question-container">
          <p className="question-text">{q.question}</p>
          <textarea
            value={answers[currentLanguage]?.[q.id] || ''}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            placeholder="Your answer"
            required
            className="answer-field"
            rows={5}
          />
        </div>
      ))}
      <div className="navigation-buttons">
        {currentLanguageIndex > 0 && (
          <button onClick={prevLanguage} className="btn btn-secondary">
            Previous Language
          </button>
        )}
        {currentLanguageIndex < Object.keys(questions).length - 1 ? (
          <button onClick={nextLanguage} className="btn">
            Next Language
          </button>
        ) : (
          <button onClick={submitAnswers} className="btn" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit All Answers'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnswerQuestions;