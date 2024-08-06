import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Technical.css";

const Technical = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [candidateId, setCandidateId] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState({
    fullName: "",
    idNumber: "",
    email: "",
  });
  const [languages, setLanguages] = useState([
    { name: "", years: "", level: "" },
    { name: "", years: "", level: "" },
    { name: "", years: "", level: "" },
  ]);
  const [questions, setQuestions] = useState([]);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem("vettingProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setStep(progress.step);
      setCandidateId(progress.candidateId);
    }
  }, []);

  useEffect(() => {
    saveProgress();
  }, [step, candidateId]);

  const saveProgress = () => {
    const progress = {
      step,
      candidateId,
    };
    localStorage.setItem("vettingProgress", JSON.stringify(progress));
  };

  const handleDetailsChange = (e) => {
    setCandidateDetails({
      ...candidateDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const handleAnswerChange = (languageIndex, questionIndex, value) => {
    setAnswers({
      ...answers,
      [`${languageIndex}-${questionIndex}`]: value,
    });
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/candidate/submitDetails",
        candidateDetails
      );
      setCandidateId(response.data.candidateId);
      setStep(2);
    } catch (error) {
      console.error("Error submitting details:", error);
      setError("Failed to submit details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitLanguages = async (e) => {
    e.preventDefault();
    if (!candidateId) {
      setError(
        "Candidate ID is missing. Please go back and submit your details first."
      );
      return;
    }
    setIsGeneratingQuestions(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/candidate/submitLanguages",
        {
          candidateId,
          languages: languages
            .filter((lang) => lang.name)
            .map((lang) => ({
              name: lang.name,
              years: lang.years,
              level: lang.level,
            })),
        }
      );
      setQuestions(response.data.questions);
      setStep(3);
    } catch (error) {
      console.error("Error submitting languages:", error);
      setError("Failed to submit languages. Please try again.");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const formattedAnswers = Object.entries(answers).map(([key, value]) => {
        const [languageIndex, questionIndex] = key.split('-');
        return {
          language: languages[languageIndex].name,
          question: questions[languageIndex * 3 + parseInt(questionIndex)].question,
          answer: value,
        };
      });

      await axios.post(
        "http://localhost:3001/candidate/submitAnswers",
        {
          candidateId,
          answers: formattedAnswers,
        }
      );
      navigate("/evaluation");
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentLanguageCompleted = () => {
    const currentLanguageQuestions = questions.filter(
      (q) => q.language === languages[currentLanguageIndex].name
    );
    return currentLanguageQuestions.every((_, index) =>
      answers.hasOwnProperty(`${currentLanguageIndex}-${index}`)
    );
  };

  const renderQuestions = () => {
    const currentLanguage = languages[currentLanguageIndex];
    const currentQuestions = questions.filter(q => q.language === currentLanguage.name);

    return (
      <div>
        <h2>{currentLanguage.name} Questions</h2>
        {currentQuestions.map((question, index) => (
          <div key={index} className="question-container">
            <p className="question-text">{question.question}</p>
            <textarea
              className="answer-field"
              value={answers[`${currentLanguageIndex}-${index}`] || ''}
              onChange={(e) => handleAnswerChange(currentLanguageIndex, index, e.target.value)}
              placeholder="Type your answer here..."
              required
            />
          </div>
        ))}
        <div className="navigation-buttons">
          {currentLanguageIndex > 0 && (
            <button onClick={() => setCurrentLanguageIndex(currentLanguageIndex - 1)} className="btn btn-secondary">
              Previous Language
            </button>
          )}
          {currentLanguageIndex < languages.length - 1 ? (
            <button 
              onClick={() => setCurrentLanguageIndex(currentLanguageIndex + 1)} 
              className="btn"
              disabled={!isCurrentLanguageCompleted()}
            >
              Next Language
            </button>
          ) : (
            <button onClick={submitAnswers} className="btn" disabled={isLoading || !isCurrentLanguageCompleted()}>
              {isLoading ? <span className="loader"></span> : "Submit All Answers"}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={submitDetails}>
            <h2>Candidate Details</h2>
            <input
              type="text"
              name="fullName"
              value={candidateDetails.fullName}
              onChange={handleDetailsChange}
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="idNumber"
              value={candidateDetails.idNumber}
              onChange={handleDetailsChange}
              placeholder="ID Number"
              required
            />
            <input
              type="email"
              name="email"
              value={candidateDetails.email}
              onChange={handleDetailsChange}
              placeholder="Email"
              required
            />
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : "Next"}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={submitLanguages}>
            <h2>Language Proficiencies</h2>
            <p>Candidate ID: {candidateId}</p>
            {languages.map((lang, index) => (
              <div key={index} className="language-input">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) =>
                    handleLanguageChange(index, "name", e.target.value)
                  }
                  placeholder="Language"
                  required
                />
                <select
                  value={lang.years}
                  onChange={(e) =>
                    handleLanguageChange(index, "years", e.target.value)
                  }
                  required
                >
                  <option value="">Years of experience</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={lang.level}
                  onChange={(e) =>
                    handleLanguageChange(index, "level", e.target.value)
                  }
                  required
                >
                  <option value="">Proficiency level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            ))}
            <button
              type="submit"
              className="btn"
              disabled={isGeneratingQuestions}
            >
              {isGeneratingQuestions ? (
                <>
                  <span className="loader"></span>
                  Generating Questions...
                </>
              ) : (
                "Generate Questions"
              )}
            </button>
          </form>
        );
      case 3:
        return renderQuestions();
      default:
        return null;
    }
  };

  return (
    <div className="technical-page">
      <div className="header">
        <div className="logo">GPT_VETTING</div>
      </div>
      <div className="content">
        <h1>Technical Vetting</h1>
        {error && <div className="error-message">{error}</div>}
        {renderStep()}
      </div>
      <div className="footer">Powered by Gpt_Vetting</div>
    </div>
  );
};

export default Technical;