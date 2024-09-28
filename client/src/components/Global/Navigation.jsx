import React from "react";
import "./Navigation.css";

const Navigation = ({ scrollToSection }) => {
  return (
    <div className="navbar">
      <ul>
        <li className="navbar-logo" onClick={() => scrollToSection(0)}>
          <span>LEGALAI</span>
        </li>
        <li className="link" onClick={() => scrollToSection(1)}>
          Services
        </li>
        <li className="link" onClick={() => scrollToSection(2)}>
          How It Works
        </li>
        <li className="link" onClick={() => scrollToSection(3)}>
          Pricing
        </li>
        <li className="link" onClick={() => scrollToSection(4)}>
          Testimonials
        </li>
        <li className="link" onClick={() => scrollToSection(5)}>
          Contact
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
