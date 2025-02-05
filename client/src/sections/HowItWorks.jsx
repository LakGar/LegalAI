import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      number: "01",
      title: "Upload Documents",
      description:
        "Drag and drop your legal documents. We support PDF, DOCX, and all major formats.",
      gifUrl:
        "https://i.pinimg.com/originals/6f/d8/56/6fd856304e0353edeeb34005bca51b48.gif", // Replace with your actual gif URL
      align: "right",
    },
    {
      number: "02",
      title: "AI Processing",
      description:
        "Our advanced AI analyzes your documents, identifying key elements and patterns.",
      gifUrl: "https://bleuje.com/gifs/tuto6_example1.gif", // Replace with your actual gif URL
      align: "left",
    },
    {
      number: "03",
      title: "Review Insights",
      description:
        "Get instant summaries and key insights from your legal documents.",
      gifUrl:
        "https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/60b8f057616cb823051a2fda_blog-listing%20(11).gif", // Replace with your actual gif URL
      align: "right",
    },
    {
      number: "04",
      title: "Take Action",
      description:
        "Make informed decisions based on clear, actionable insights.",
      gifUrl:
        "https://cdn.dribbble.com/users/1501052/screenshots/4545496/media/13e279b5c3bd2e8f79067239da3d8633.gif", // Replace with your actual gif URL
      align: "left",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="process-section">
      <div className="process-content">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>How It Works</h2>
          <p>Four simple steps to transform your legal document analysis</p>
        </motion.div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`process-card ${step.align}-aligned`}
              initial={{ opacity: 0, x: step.align === "left" ? -100 : 100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="process-card-content">
                <div className="process-card-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="process-card-gif">
                <img src={step.gifUrl} alt={step.title} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
