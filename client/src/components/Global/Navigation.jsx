import React, { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = ({ scrollToSection }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
      <div className="navbar-logo" onClick={() => scrollToSection(0)}>
        <span>LEGALAI</span>
      </div>
      <ul>
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
      <p className="button">Coming soon</p>
    </div>
  );
};

export default Navigation;
