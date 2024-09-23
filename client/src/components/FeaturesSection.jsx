import React, { useState } from "react";
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

function FeaturesSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const features = [
    {
      icon: <FaFileContract />,
      title: "AI-Powered Contract Analysis",
      description:
        "Automatically scans and highlights key terms, obligations, deadlines, and risks.",
      details:
        "AI algorithms detect anomalies and inconsistencies, providing recommendations to improve clarity and legal soundness.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Secure Document Repository",
      description:
        "Store all your legal documents securely in the cloud with role-based access control.",
      details:
        "Version control ensures document changes are tracked. Files are fully searchable by keywords, clauses, or metadata.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Audit Trail Tracking",
      description:
        "Track document changes, access history, and edits in real-time for compliance.",
      details:
        "Generates tamper-proof records, and provides detailed reports on document activity and access for regulatory compliance.",
    },
    {
      icon: <FaTasks />,
      title: "Legal Task Management",
      description:
        "Assign and track tasks related to legal processes, such as contract reviews and approvals.",
      details:
        "Get notifications and reminders to ensure deadlines are met, with an integrated calendar view for better task prioritization.",
    },
    {
      icon: <FaUsers />,
      title: "Collaborative Platform",
      description:
        "Work with team members and external parties on legal documents in real-time.",
      details:
        "Supports messaging, chat, and collaborative editing, allowing multiple users to work simultaneously on the same document.",
    },
    {
      icon: <FaLock />,
      title: "Advanced Security",
      description:
        "End-to-end encryption ensures your data is secure, with compliance to GDPR and CCPA.",
      details:
        "Regular security audits and two-factor authentication provide additional protection against unauthorized access.",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics & Reporting",
      description:
        "Track document statuses, task completion, and legal risks through customizable dashboards.",
      details:
        "AI-driven insights help identify patterns in contract performance, legal risks, and opportunities, with automatic report generation.",
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Integration with Business Tools",
      description:
        "Connect seamlessly with popular tools like Slack, Google Drive, and Microsoft Teams.",
      details:
        "Includes RESTful APIs for custom integrations, syncing with calendar and other applications to enhance workflow.",
    },
  ];

  const toggleFeature = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className={`feature-card ${
                expandedIndex === index ? "expanded" : ""
              }`}
              key={index}
              onClick={() => toggleFeature(index)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {expandedIndex === index && (
                <div className="feature-details">
                  <p>{feature.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
