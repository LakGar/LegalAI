import React from "react";
import "./HeroSection.css";

const HeroSection = ({ scrollToSection }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Legal documents,
          <br />
          simplified by AI.
        </h1>
        <p>
          Experience the future of legal document analysis. Powered by advanced
          AI to understand, summarize, and explain complex legal terms.
        </p>
        <div className="cta-container">
          <button className="cta-primary" onClick={() => scrollToSection(1)}>
            Try it now
            <svg width="13" height="10" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
          <button className="cta-secondary">Watch the demo</button>
        </div>
      </div>
      <div className="hero-visual1">
        <div className="visual-container1">
          <div className="floating-ui1">
            <div className="ui-element1"></div>
            <div className="ui-element1"></div>
            <div className="ui-element1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
