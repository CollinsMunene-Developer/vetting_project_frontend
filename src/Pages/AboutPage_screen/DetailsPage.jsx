import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faChartBar,
  faLink,
  faUserCheck,
  faBriefcase,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import "./DetailsPage.css";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const navigate = useNavigate();

  const gotToWelcome = () => {
    navigate("/welcome");
  };

  const goToYoutube = () => {
    window.open(
      "https://youtu.be/atAhG6-tkf8?si=N6ppcBHYia17MPyb"

    )
  }
  return (
    <section className="about">
      <div className="container">
        <h1>About GPT Vetting</h1>
        <p className="intro">
          GPT Vetting is a cutting-edge AI-powered platform revolutionizing the
          hiring process for companies of all sizes. Our mission is to
          streamline candidate vetting, uncover the best talent, and empower
          organizations to make informed hiring decisions.
        </p>

        <div className="features">
          <h2>Our Key Features</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <FontAwesomeIcon icon={faRobot} />
              <h3>AI-Powered Interviews</h3>
              <p>
                Conduct in-depth, automated interviews leveraging advanced
                natural language processing.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faChartBar} />
              <h3>Candidate Scoring</h3>
              <p>
                Utilize advanced algorithms to analyze responses and provide
                detailed candidate scoring.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faLink} />
              <h3>ATS Integration</h3>
              <p>
                Seamlessly integrate with existing applicant tracking systems
                for a streamlined workflow.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faUserCheck} />
              <h3>Skill Assessment</h3>
              <p>
                Accurately evaluate candidate skills and competencies through
                AI-driven assessments.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faBriefcase} />
              <h3>Cultural Fit Analysis</h3>
              <p>
                Assess candidates' alignment with your organization's values and
                culture.
              </p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faHandshake} />
              <h3>Unbiased Evaluation</h3>
              <p>
                Ensure fair and objective candidate evaluations, reducing
                unconscious biases in hiring.
              </p>
            </div>
          </div>
        </div>

        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            At GPT Vetting, we're committed to transforming the hiring landscape
            by leveraging the power of artificial intelligence. Our goal is to
            empower organizations to identify and attract top talent
            efficiently, while providing a fair and comprehensive evaluation
            process for all candidates.
          </p>
        </div>

        <div className="team">
          <h2>Our Team</h2>
          <p>
            GPT Vetting was founded by a diverse group of AI experts, HR
            professionals, and business leaders passionate about improving the
            hiring process. Our team combines decades of experience in talent
            acquisition with cutting-edge AI technology to deliver a
            revolutionary vetting platform.
          </p>
        </div>

        <div className="cta">
          <h2>Experience the Future of Hiring</h2>
          <p>
            Join the growing number of companies trusting GPT Vetting to
            streamline their hiring process and uncover the best talent. Start
            your journey towards more efficient and effective hiring today.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={gotToWelcome}>Start Vetting</button>
            <button className="btn btn-secondary" onClick={goToYoutube}>Request a Demo</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
