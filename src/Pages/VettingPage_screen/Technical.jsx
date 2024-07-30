import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Technical.css";

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
  const [questions, setQuestions] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [answers, setAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('vettingProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setStep(progress.step);
      setCandidateId(progress.candidateId);
      setAnswers(progress.answers);
    }
  }, []);

  useEffect(() => {
    saveProgress();
  }, [step, candidateId, answers]);

  const saveProgress = () => {
    const progress = {
      step,
      candidateId,
      answers,
    };
    localStorage.setItem('vettingProgress', JSON.stringify(progress));
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

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentLanguage]: {
        ...prev[currentLanguage],
        [questionId]: value
      }
    }));
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://vettingapp.agreeableriver-d2514013.westus2.azurecontainerapps.io/candidate/submitDetails",
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
      setError("Candidate ID is missing. Please go back and submit your details first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://vettingapp.agreeableriver-d2514013.westus2.azurecontainerapps.io/candidate/submitLanguages",
        {
          candidateId,
          languages: languages.filter(lang => lang.name).map((lang) => ({
            name: lang.name,
            years: lang.years,
            level: lang.level
          })),
        }
      );
      setQuestions(response.data.questions);
      const firstLanguage = Object.keys(response.data.questions)[0];
      setCurrentLanguage(firstLanguage);
      setStep(3);
    } catch (error) {
      console.error("Error submitting languages:", error);
      setError("Failed to submit languages. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://vettingapp.agreeableriver-d2514013.westus2.azurecontainerapps.io/candidate/submitAnswers",
        {
          candidateId,
          answers: Object.entries(answers).flatMap(([language, languageAnswers]) => 
            Object.entries(languageAnswers).map(([questionId, answer]) => ({
              language,
              questionId,
              answer
            }))
          ),
        }
      );
      setEvaluationResult(response.data);
      setStep(4);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to submit answers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextLanguage = () => {
    const languageKeys = Object.keys(questions);
    const currentIndex = languageKeys.indexOf(currentLanguage);
    if (currentIndex < languageKeys.length - 1) {
      setCurrentLanguage(languageKeys[currentIndex + 1]);
    } else {
      submitAnswers();
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
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : "Generate Questions"}
            </button>
          </form>
        );
      case 3:
        return (
          <div>
            <h2>Technical Questions - {currentLanguage}</h2>
            {questions[currentLanguage]?.map((q, index) => (
              <div key={index} className="question">
                <p>{q.question.replace(/^Of course! Here are some questions to test your .* knowledge of .*:\n\n/, '')}</p>
                <textarea
                  value={answers[currentLanguage]?.[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Your answer"
                  required
                />
              </div>
            ))}
            <button onClick={nextLanguage} className="btn" disabled={isLoading}>
              {isLoading ? <span className="loader"></span> : 
                (Object.keys(questions).indexOf(currentLanguage) === Object.keys(questions).length - 1 ? "Submit All Answers" : "Next Language")}
            </button>
          </div>
        );
      case 4:
        return (
          <div className="evaluation-result">
            <h2>Evaluation Result</h2>
            <p>
              You have {evaluationResult.hasPassed ? "passed" : "not passed"}{" "}
              the evaluation.
            </p>
            <p>
              Correct answers:{" "}
              {
                evaluationResult.evaluationResult.filter((r) => r.isRelevant)
                  .length
              }
            </p>
            <p>Total questions: {evaluationResult.evaluationResult.length}</p>
            <p>
              An email with detailed results has been sent to your provided
              email address.
            </p>
          </div>
        );
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