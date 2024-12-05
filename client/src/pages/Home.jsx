import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import Navigation from "../components/Global/Navigation";
import HeroSection from "../sections/HeroSection";
import Product from "../sections/Product";
import Services from "../sections/ServiceSection";
import HowItWorks from "../sections/HowItWorks";
import TestimonialsSection from "../sections/TestimonialsSection";
import Contact from "../sections/Contact";

const Home = () => {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef([]); // Store section references

  console.log(localStorage.getItem("token"));

  // Scroll to section handler
  const scrollToSection = (index) => {
    sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll
  const handleScroll = () => {
    sectionRefs.current.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        setActiveSection(index);
      }
    });
  };

  useEffect(() => {
    const content = document.querySelector(".main-content");
    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Navigation */}

      <Navigation scrollToSection={scrollToSection} />

      {/* Main Content with Scroll Snap */}
      <div className="main-content">
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="section"
        >
          <HeroSection scrollToSection={scrollToSection} />
        </section>
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="section"
        >
          <Product />
        </section>
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="section"
        >
          <Services />
        </section>
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="section"
        >
          <HowItWorks />
        </section>
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="section"
        >
          <TestimonialsSection />
        </section>
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="section"
        >
          <Contact />
        </section>
      </div>

      {/* Right-side navigation buttons */}
      <div className="section-buttons">
        {[...Array(6).keys()].map((index) => (
          <div
            key={index}
            onClick={() => scrollToSection(index)}
            className={activeSection === index ? "active-button" : "button"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
