import React from "react";
import "../styles/HowItWorksSection.css";
import { FaUpload, FaBrain, FaUsers, FaChartLine } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function HowItWorksSection() {
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
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <h2>How It Works</h2>
        <div className="timeline">
          {steps.map((step, index) => (
            <div
              className="timeline-step"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
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
