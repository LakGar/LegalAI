import React, { useEffect, useRef } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "LegalAI has transformed our legal workflow, saving us countless hours in document review.",
      clientName: "Sarah Thompson",
      clientPosition: "CEO, Startup Inc.",
      clientPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    },
    {
      text: "The AI-powered analysis provides insights we would have missed. It's been revolutionary.",
      clientName: "James Wilson",
      clientPosition: "Legal Director, Tech Solutions",
      clientPhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60",
    },
    {
      text: "Deadlines and compliance tracking have never been easier. This tool is indispensable.",
      clientName: "Linda Monroe",
      clientPosition: "General Counsel, FinCorp",
      clientPhoto:
        "https://images.unsplash.com/photo-1570158268183-d296b2892211?w=800&auto=format&fit=crop&q=60",
    },
    {
      text: "The accuracy and speed of document analysis have exceeded our expectations.",
      clientName: "Michael Brown",
      clientPosition: "Managing Partner, Legal Partners",
      clientPhoto:
        "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800&auto=format&fit=crop&q=60",
    },
    {
      text: "Integration was seamless. Our team adapted to it within days.",
      clientName: "Emma Davis",
      clientPosition: "Operations Head, LegalTech Co",
      clientPhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60",
    },
    {
      text: "The automated summaries and key point extraction save us valuable time.",
      clientName: "David Chen",
      clientPosition: "Legal Analyst, Global Corp",
      clientPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const scrollerRef = useRef(null);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>What Our Clients Say</h2>

        <div className="scroller" data-speed="slow">
          <div className="scroller-inner">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="client-info">
                    <img
                      src={testimonial.clientPhoto}
                      alt={testimonial.clientName}
                      className="client-photo"
                    />
                    <div className="client-details">
                      <h4>{testimonial.clientName}</h4>
                      <p>{testimonial.clientPosition}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
