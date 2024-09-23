import React from "react";
import "../styles/HeroSection.css";
import { FaPlay } from "react-icons/fa";
import heroBackground from "../assets/hero-background.jpg"; // Replace with your background image
import videoThumbnail from "../assets/video-thumbnail.jpg"; // Replace with your video thumbnail

function HeroSection() {
  const openVideoModal = () => {
    // Logic to open video modal
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content container">
        <h1>Streamline Your Legal Processes with AI</h1>
        <button className="cta-button">Get Started for Free</button>
        <div className="video-thumbnail" onClick={openVideoModal}>
          <img src={videoThumbnail} alt="Watch How LEGALIT Works" />
          <div className="play-button">
            <FaPlay />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
