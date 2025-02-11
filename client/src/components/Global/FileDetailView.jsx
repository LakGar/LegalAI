import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DOMPurify from "dompurify";

import "./FileDetailView.css";
import { IoChevronBack } from "react-icons/io5";
import { analyzeDocument } from "../../services/documentService";
import { useNavigate } from "react-router-dom";
const DocumentDisplay = ({ file, closeModal }) => {
  const fileUrl = `http://localhost:8000/${file.documentUrl}`;
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const [isCached, setIsCached] = useState(false);
  const navigate = useNavigate();
  // Check for existing analysis in the file object on mount
  useEffect(() => {
    console.log("Document data:", file); // Debug log to see document data
    if (file.analysisResult) {
      console.log("Found existing analysis");
      setAnalysisResult(file.analysisResult);
      setIsCached(true);
    }
  }, [file]);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisError("");

    try {
      const response = await analyzeDocument(file.documentUrl);
      console.log("Analysis response:", response);

      if (response.success) {
        setAnalysisResult(response.analysisText);
        setIsCached(response.cached);
      } else {
        setAnalysisError(response.message || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setAnalysisError("Analysis failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
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
          <div className="analysis-section">
            <h4>Document Analysis</h4>

            {loading ? (
              <div className="loading-container">
                <div className="analysis-loader">
                  <div className="loader-circle"></div>
                  <p>Analyzing document...</p>
                </div>
              </div>
            ) : analysisError ? (
              <div className="analysis-error">
                <p>{analysisError}</p>
              </div>
            ) : analysisResult ? (
              <div className="analysis-result">
                {isCached && (
                  <span className="cached-badge">Cached Analysis</span>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(analysisResult),
                  }}
                />
              </div>
            ) : (
              <div className="no-analysis">
                <p>
                  Would you like to analyze this document? Our AI will act as
                  your personal attorney by providing a detailed, simplified
                  summary, listing important dates and flagging any
                  vulnerabilities you should be aware of before signing.
                </p>
                <div className="container">
                  <button onClick={handleAnalyze} disabled={loading}>
                    Analyze Document
                    <div className="hoverEffect">
                      <div></div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="document-button-container">
          <button
            className="document-chat-btn"
            onClick={() => navigate(`/chats?documentId=${file._id}`)}
          >
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
