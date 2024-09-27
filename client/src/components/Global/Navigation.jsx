import React from "react";
import "./Navigation.css";

const Navigation = ({ scrollToSection }) => {
  return (
    <div className="navbar">
      <ul>
        <li className="navbar-logo" onClick={() => scrollToSection(0)}>
          <span>LEGALAI</span>
        </li>
        <li onClick={() => scrollToSection(1)}>Services</li>
        <li onClick={() => scrollToSection(2)}>How It Works</li>
        <li onClick={() => scrollToSection(3)}>Pricing</li>
        <li onClick={() => scrollToSection(4)}>Testimonials</li>
        <li onClick={() => scrollToSection(5)}>Contact</li>
      </ul>
    </div>
  );
};

export default Navigation;
