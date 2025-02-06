import React, { useState, useEffect } from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

const Navigation = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active link based on scroll position
      const content = document.querySelector(".main-content");
      if (content) {
        const scrollPosition = content.scrollTop;
        const sections = document.querySelectorAll(
          ".snap-section, .flow-section"
        );

        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop - sectionHeight / 3) {
            setActiveLink(index);
          }
        });
      }
    };

    const content = document.querySelector(".main-content");
    if (content) {
      content.addEventListener("scroll", handleScroll);
      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const navLinks = [
    { name: "Home", index: 0 },
    { name: "Services", index: 1 },
    { name: "Product", index: 2 },
    { name: "How it works", index: 3 },
    { name: "Testimonials", index: 4 },
  ];

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="nav-logo">
          <span className="logo-text">LegalAI</span>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.index}
              href={`#${link.name.toLowerCase().replace(" ", "-")}`}
              className={activeLink === link.index ? "active1" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.index);
              }}
            >
              {link.name}
              <span className="link-indicator"></span>
            </a>
          ))}
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
