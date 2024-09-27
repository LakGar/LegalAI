import React, { useEffect, useRef } from "react";
import "./HowItWorks.css";
import { FaUpload, FaBrain, FaUsers, FaChartLine } from "react-icons/fa";

function HowItWorksSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = section.querySelectorAll(".timeline-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is in view
    );

    // Observe each timeline step
    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
    };
  }, []);

  const steps = [
    {
      icon: <FaUpload />,
      title: "Upload a Contract",
      description:
        "Drag and drop your contract into LEGALIT for automated analysis.",
    },
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      description:
        "LEGALIT scans your contract, highlighting key terms, obligations, and risks.",
    },
    {
      icon: <FaUsers />,
      title: "Collaborate with Team",
      description:
        "Work with your team or legal experts in real-time on contract review.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Progress",
      description:
        "Monitor contract changes, access history, and completion through a dashboard.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="how-it-works-section"
      ref={sectionRef}
    >
      <div className="container">
        <h2>How It Works</h2>
        <div className="timeline">
          {steps.map((step, index) => (
            <div className="timeline-step" key={index}>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
