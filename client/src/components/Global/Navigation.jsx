import React, { useState, useEffect } from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Optional: Update active link based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveLink(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="nav-logo">
          <span className="logo-text">LegalAI</span>
        </div>

        <div className="nav-links">
          <a
            href="#features"
            className={activeLink === "features" ? "active" : ""}
          >
            Features
            <span className="link-indicator"></span>
          </a>
          <a
            href="#how-it-works"
            className={activeLink === "how-it-works" ? "active" : ""}
          >
            How it works
            <span className="link-indicator"></span>
          </a>
          <a
            href="#pricing"
            className={activeLink === "pricing" ? "active" : ""}
          >
            Pricing
            <span className="link-indicator"></span>
          </a>
          <a href="#about" className={activeLink === "about" ? "active" : ""}>
            About
            <span className="link-indicator"></span>
          </a>
        </div>

        <div className="nav-auth">
          <button className="sign-in" onClick={() => navigate("/login")}>
            Sign in
            <span className="button-hover"></span>
          </button>
          <button className="try-now" onClick={() => navigate("/register")}>
            Try now
            <svg className="arrow-icon" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
