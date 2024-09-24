import React, { useEffect } from "react";
import "../styles/FeaturesSection.css";
import {
  FaFileContract,
  FaCloudUploadAlt,
  FaClipboardCheck,
  FaTasks,
  FaUsers,
  FaLock,
  FaChartLine,
  FaPuzzlePiece,
} from "react-icons/fa";
import { useTheme } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

function FeaturesSection() {
  const theme = useTheme();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Duration of animations
      easing: "ease-in-out", // Easing for animations
      once: true, // Animation happens only once
    });
  }, []);

  const features = [
    {
      icon: <FaFileContract />,
      title: "AI-Powered Contract Analysis",
      description:
        "Automatically scans and highlights key terms, obligations, deadlines, and risks.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Secure Document Repository",
      description:
        "Store all your legal documents securely in the cloud with role-based access control.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Audit Trail Tracking",
      description:
        "Track document changes, access history, and edits in real-time for compliance.",
    },
    {
      icon: <FaTasks />,
      title: "Legal Task Management",
      description:
        "Assign and track tasks related to legal processes, such as contract reviews and approvals.",
    },
    {
      icon: <FaUsers />,
      title: "Collaborative Platform",
      description:
        "Work with team members and external parties on legal documents in real-time.",
    },
    {
      icon: <FaLock />,
      title: "Advanced Security",
      description:
        "End-to-end encryption ensures your data is secure, with compliance to GDPR and CCPA.",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics & Reporting",
      description:
        "Track document statuses, task completion, and legal risks through customizable dashboards.",
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Integration with Business Tools",
      description:
        "Connect seamlessly with popular tools like Slack, Google Drive, and Microsoft Teams.",
    },
  ];

  return (
    <section
      id="features"
      className="features-section"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="container">
        <h2 style={{ color: theme.palette.text.primary }}>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 200}
              key={index}
              className="feature-card"
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 style={{ color: theme.palette.text.primary }}>
                {feature.title}
              </h3>
              <p style={{ color: theme.palette.text.secondary }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
