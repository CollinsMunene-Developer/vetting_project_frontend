import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faChartBar, faLink } from "@fortawesome/free-solid-svg-icons";
import { candidate, candidate2, candidate3 } from "../../assets/assets";
import "./Hero_2.css"; // Import the CSS file

const Hero_2 = () => {
  return (
    <section className="hero-2">
      <div className="container">
        <div className="hero-2-content">
          <div className="hero-2-text">
            <h2>AI-Powered Vetting</h2>
            <p>Intelligent Candidate Interviews</p>
            <p>
              Our AI-powered interview platform leverages the latest advancements in natural language processing to conduct in-depth interviews and assess candidates with unparalleled accuracy.
            </p>
            <ul className="hero-2-features">
              <li>
                <FontAwesomeIcon icon={faRobot} />
                <div>
                  <strong>Automated Interviews:</strong> Our AI-powered interview platform conducts in-depth interviews with candidates, freeing up your team to focus on other tasks.
                </div>
              </li>
              <li>
                <FontAwesomeIcon icon={faChartBar} />
                <div>
                  <strong>Candidate Scoring:</strong> Our advanced algorithms analyze candidate responses and provide detailed scoring to help you identify the best fit for your organization.
                </div>
              </li>
              <li>
                <FontAwesomeIcon icon={faLink} />
                <div>
                  <strong>ATS Integration:</strong> Seamlessly integrate our platform with your existing applicant tracking system to streamline the hiring process.
                </div>
              </li>
            </ul>
          </div>
          <div className="hero-2-images">
            <div className="hero-2-image">
              <img src={candidate} alt="AI-Powered Vetting Illustration 1" />
            </div>
            <div className="hero-2-image">
              <img src={candidate2} alt="AI-Powered Vetting Illustration 2" />
            </div>
            <div className="hero-2-image">
              <img src={candidate3} alt="AI-Powered Vetting Illustration 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero_2;