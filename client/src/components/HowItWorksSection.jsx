import React, { useEffect } from "react";
import "../styles/HowItWorksSection.css";
import { FaUpload, FaBrain, FaUsers, FaChartLine } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "@mui/material";

function HowItWorksSection() {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
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
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="container">
        <h2 style={{ color: theme.palette.text.primary }}>How It Works</h2>
        <div className="timeline">
          {steps.map((step, index) => (
            <div
              className="timeline-step"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              style={{
                color: theme.palette.text.primary,
              }}
            >
              <div className="step-icon" style={{ color: theme.custom.accent }}>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p style={{ color: theme.palette.text.secondary }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
