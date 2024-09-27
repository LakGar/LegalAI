import React, { useEffect, useRef, useState } from "react";
import "./Product.css";

const Product = () => {
  const productRef = useRef(null); // Reference for the Product section
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

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    return () => {
      if (productRef.current) {
        observer.unobserve(productRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={productRef}
      className={`product-container ${isVisible ? "visible" : ""}`}
    >
      <div className="product-content">
        <h1>LegalAI: Smarter Contract Analysis and Storage</h1>
        <p>
          <span>LegalAI </span>helps you streamline contract analysis, automate
          workflows, and reduce risk with <span>AI-driven insights</span>.
        </p>

        <div className="product-features">
          <div className="feature-item">
            <h3>AI-Powered Contract Analysis</h3>
            <p>
              Analyze contracts instantly with our AI to identify risks and key
              clauses.
            </p>
          </div>

          <div className="feature-item">
            <h3>Automated Clause Extraction</h3>
            <p>
              Extract important clauses from contracts in seconds using smart
              algorithms.
            </p>
          </div>

          <div className="feature-item">
            <h3>Collaborative Document Editing</h3>
            <p>
              Edit and manage contracts in real-time with built-in collaboration
              tools.
            </p>
          </div>

          <div className="feature-item">
            <h3>Risk Management</h3>
            <p>
              Leverage risk analysis to ensure compliance and avoid potential
              contract pitfalls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
