import React from "react";
import "./HeroSection.css";

const HeroSection = ({ scrollToSection }) => {
  return (
    <div className="hero-container">
      <div class="background">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="hero-content">
        <h1>
          Welcome to <span>LegalAI</span>
        </h1>
        <p>
          Streamline your legal document management with AI-powered contract
          analysis.
        </p>
        <button onClick={() => scrollToSection(1)}>Get Started</button>
      </div>
    </div>
  );
};

export default HeroSection;
