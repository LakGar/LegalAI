import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo.png"; // Replace with your logo path

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <img src={logo} alt="LEGALIT Logo" className="logo" />
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <button className="cta-button">Get Started for Free</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
