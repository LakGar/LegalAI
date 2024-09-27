import React from "react";
import "./HeroSection.css";

const HeroSection = ({ scrollToSection }) => {
  return (
    <div className="hero-container">
      {/* Background Animation */}
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Hero Content */}
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
