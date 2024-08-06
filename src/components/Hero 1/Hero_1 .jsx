import React, { useState } from "react";
import "./Hero_1.css";
import { openai } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero_1 = () => {
  const [isRotated, setIsRotated] = useState(false);

  const handleTouch = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 300);
  };

  const navigate = useNavigate();
  const handleStartVetting = () => {
    navigate("/welcome");
  };
  return (
    <>
      <div className="container">
        <div className="hero_1_content">
          <h1>Streamline Your Hiring with GPT Vetting</h1>
          <p>
            Leverage the power of GPT to conduct intelligent interviews and
            assess candidates with unparalleled accuracy.
          </p>
        </div>
        <div className="hero_img">
          <img
            src={openai}
            alt="OpenAI"
            style={{ transform: isRotated ? "rotate(10deg)" : "none" }}
            onTouchStart={handleTouch}
            onTouchEnd={() => setIsRotated(false)}
          />
        </div>
        <div className="hero_1_btn">
          <button onClick={handleStartVetting}>start Vetting</button>
        </div>
      </div>
    </>
  );
};

export default Hero_1;
