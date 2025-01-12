import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import "./FileDetailView.css";
import { IoChevronBack } from "react-icons/io5";

const DocumentDisplay = ({ file, closeModal }) => {
  const fileUrl = `http://localhost:8000/${file.documentUrl}`;
  const [loading, setloading] = useState(false);

  const handleAnalyze = () => {
    setloading(true);
    // Perform document analysis here
    // For example, you can use a library like Tesseract.js to extract text from the PDF
    // Then analyze the text for keywords, phrases, or other insights

    // After analysis, set loading to false and set foundEasterEgg to true
    // This will display the "Easter Egg Found" message
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };
  return (
    <div className="document-display-container">
      {/* Back button */}
      <div className="header">
        <IoChevronBack size={24} onClick={closeModal} />
        <h3>Document Viewer</h3>
      </div>

      <div className="document-display-pdf">
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
          style={{ width: "100%" }}
        >
          <Viewer fileUrl={fileUrl} style={{ width: "100%" }} />
        </Worker>
      </div>

      <div className="document-display-options">
        <div className="document-analysis-container">
          <div className="no-analysis">
            <h4>Document Analysis</h4>
            <p>
              Analyze the document's content, structure, and relationships. This
              will help you identify any potential issues or areas for
              improvement.
            </p>
            <div className="container">
              <button className="button">Analyze</button>
            </div>
          </div>
        </div>
        <div className="document-button-container">
          <button className="document-chat-btn">
            <div className="button__icon-wrapper">
              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg"
                width="10"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>

              <svg
                viewBox="0 0 14 15"
                fill="none"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg button__icon-svg--copy"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            Go to chat
          </button>
          <button
            className="document-download-btn"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            <p>Download</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDisplay;
