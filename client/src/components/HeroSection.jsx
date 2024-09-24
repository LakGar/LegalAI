import React from "react";
import "../styles/HeroSection.css";
import { FaPlay } from "react-icons/fa";

function HeroSection() {
  const openVideoModal = () => {
    // Logic to open video modal
    console.log("Video Modal Opened");
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)`, // Unsplash image URL
      }}
    >
      <div className="hero-overlay"></div> {/* Overlay for better contrast */}
      <div className="hero-content container">
        <h1>Streamline Your Legal Processes with AI</h1>
        <button className="cta-button">Get Started for Free</button>
        <div className="video-thumbnail" onClick={openVideoModal}>
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Watch How LEGALIT Works"
          />
          <div className="play-button">
            <FaPlay />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
