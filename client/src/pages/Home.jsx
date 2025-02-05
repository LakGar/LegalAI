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
  const sectionRefs = useRef([]);

  console.log(localStorage.getItem("token"));

  // Scroll to section handler with offset calculation
  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    const content = document.querySelector(".main-content");
    const offset = section.offsetTop;

    content.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  // Enhanced scroll handler for variable height sections
  const handleScroll = () => {
    const content = document.querySelector(".main-content");
    const scrollPosition = content.scrollTop;
    const viewportHeight = window.innerHeight;

    // Find the current section based on scroll position
    let currentSection = 0;
    let accumulatedHeight = 0;

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + sectionHeight;

      // Check if we're within this section
      if (
        scrollPosition >= sectionTop - viewportHeight / 2 &&
        scrollPosition < sectionBottom - viewportHeight / 3
      ) {
        currentSection = index;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    const content = document.querySelector(".main-content");

    // Debounced scroll handler for better performance
    let timeoutId = null;
    const debouncedScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 50);
    };

    content.addEventListener("scroll", debouncedScroll);

    // Initial check
    handleScroll();

    return () => {
      content.removeEventListener("scroll", debouncedScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="home-container">
      {/* Navigation */}

      <Navigation scrollToSection={scrollToSection} />

      {/* Main Content with Scroll Snap */}
      <div className="main-content">
        {/* Full-height sections */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="snap-section"
        >
          <HeroSection scrollToSection={scrollToSection} />
        </section>
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="snap-section"
        >
          {" "}
          <Services />
        </section>
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="snap-section"
        >
          <Product />
        </section>

        {/* Auto-height section */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="flow-section"
        >
          <HowItWorks />
        </section>

        {/* Back to full-height sections */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="snap-section"
        >
          <TestimonialsSection />
        </section>
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="snap-section"
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
            className={activeSection === index ? "active-button" : ""}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
