import React, { useEffect, useRef, useState } from "react";
import "./ServiceSection.css";

const Services = () => {
  const servicesRef = useRef(null); // Reference for the Services section
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when the section comes into view
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={servicesRef}
      className={`services-container ${isVisible ? "visible" : ""}`}
    >
      <div className="services-title">
        <h1 className={`fade-in ${isVisible ? "animate" : ""}`}>
          Our Key Services
        </h1>
        <p className={`fade-in ${isVisible ? "animate" : ""}`}>
          Explore how <span>LegalAI</span> simplifies legal workflows with
          AI-driven solutions.
        </p>
      </div>

      <div className="wheel-3d">
        <div
          className={`slidingVertical fade-in ${isVisible ? "animate" : ""}`}
        >
          <div className="card">
            <h3>Risk and Compliance Management</h3>
            <p>
              Leverage AI to assess potential legal risks and ensure your
              organization complies with relevant regulations.
            </p>
          </div>
          <div className="card">
            <h3>Litigation Risk Analysis</h3>
            <p>
              Identify and mitigate litigation risks with AI-driven insights
              that highlight potential vulnerabilities in contracts and
              agreements.
            </p>
          </div>
          <div className="card">
            <h3>Contract Review</h3>
            <p>
              Streamline contract review processes, quickly identifying key
              clauses, risks, and obligations to save time and reduce errors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
