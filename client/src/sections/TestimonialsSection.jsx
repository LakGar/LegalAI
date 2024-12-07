import React, { useState, useEffect } from "react";
import "./TestimonialsSection.css";

// Replace with actual Unsplash URLs for random images
const unsplashImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800&auto=format&fit=crop&q=60",
];

function TestimonialsSection() {
  const testimonials = [
    {
      text: "LegalAI has transformed our legal workflow, saving us countless hours.",
      clientName: "Sarah Thompson",
      clientPosition: "CEO, Startup Inc.",
      clientPhoto: unsplashImages[0],
    },
    {
      text: "The AI-powered analysis has been a game-changer for our contract management.",
      clientName: "James Wilson",
      clientPosition: "COO, Tech Solutions",
      clientPhoto: unsplashImages[1],
    },
    {
      text: "We no longer worry about missing deadlines or compliance issues thanks to LegalAI.",
      clientName: "Linda Monroe",
      clientPosition: "General Counsel, FinCorp",
      clientPhoto: unsplashImages[2],
    },
    {
      text: "Collaborating with our legal team has never been easier. LegalAI is a must-have.",
      clientName: "Michael Brown",
      clientPosition: "Managing Partner, Legal Partners LLP",
      clientPhoto: unsplashImages[3],
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true); // State for fade effect

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Trigger fade-out before changing slide
      setTimeout(() => {
        setActiveSlide((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setFadeIn(true); // Trigger fade-in after slide change
      }, 600); // Match the timing of the fade-out duration
    }, 10000); // Switch slides every 10 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-wrapper">
          <div
            className={`testimonial-item ${fadeIn ? "fade-in" : "fade-out"}`}
          >
            <p className="testimonial-text">
              "{testimonials[activeSlide].text}"
            </p>
            <div className="client-info">
              <img
                src={testimonials[activeSlide].clientPhoto}
                alt={testimonials[activeSlide].clientName}
                className="client-photo"
              />
              <h4>{testimonials[activeSlide].clientName}</h4>
              <p>{testimonials[activeSlide].clientPosition}</p>
            </div>
          </div>
        </div>
        {/* Pagination Dots */}
        <div className="pagination-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(index)} // Allow manual slide selection
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
