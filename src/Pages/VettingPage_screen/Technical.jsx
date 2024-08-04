import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Technical.css";
import AnswerQuestions from './AnswerQuestions';

const Technical = () => {
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
      await axios.post(
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
      setStep(3);
    } catch (error) {
      console.error("Error submitting languages:", error);
      setError("Failed to submit languages. Please try again.");
    } finally {
      setIsGeneratingQuestions(false);
    }
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
        return <AnswerQuestions candidateId={candidateId} />;
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