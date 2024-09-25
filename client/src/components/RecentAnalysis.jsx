import React from "react";
import { useTheme, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "../styles/RecentAnalysis.css";

const recentAnalysisData = [
  {
    title: "Contract Compliance Analysis",
    date: "Sep 24, 2024",
    summary: "Analyzed the compliance of 5 contracts for legal accuracy.",
    result: "3 contracts passed, 2 flagged for review.",
  },
  {
    title: "Risk Assessment for Vendor Agreements",
    date: "Sep 20, 2024",
    summary: "Performed a risk analysis on vendor agreements for Q3.",
    result: "Moderate risk identified in 2 agreements.",
  },
  {
    title: "NDAs Confidentiality Analysis",
    date: "Sep 18, 2024",
    summary: "Checked 10 NDAs for confidentiality clause effectiveness.",
    result: "All NDAs are compliant with the latest standards.",
  },
  // Add more analysis entries as needed
];

const RecentAnalysis = () => {
  const theme = useTheme();

  return (
    <div className="recent-analysis-container">
      <h2
        className="recent-analysis-heading"
        style={{ color: theme.palette.text.primary }}
      >
        Recent Analysis
      </h2>
      <div className="analysis-cards-grid">
        {recentAnalysisData.map((analysis, index) => (
          <motion.div
            key={index}
            className="analysis-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Paper
              elevation={3}
              className="analysis-paper"
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              <h3
                className="analysis-title"
                style={{ color: theme.palette.primary.main }}
              >
                {analysis.title}
              </h3>
              <p
                className="analysis-date"
                style={{ color: theme.palette.text.secondary }}
              >
                {analysis.date}
              </p>
              <p className="analysis-summary">{analysis.summary}</p>
              <p
                className="analysis-result"
                style={{ color: theme.palette.success.main }}
              >
                <strong>Result:</strong> {analysis.result}
              </p>
            </Paper>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnalysis;
