import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DOMPurify from "dompurify";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./FileDetailView.css";
import { IoChevronBack } from "react-icons/io5";
import { analyzeDocument } from "../../services/documentService";
import { useNavigate } from "react-router-dom";
import { updateExistingDocument } from "../../redux/actions/documentAction";

const DocumentDisplay = ({ file, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const [isCached, setIsCached] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [urlError, setUrlError] = useState("");
  const [pdfError, setPdfError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("File:", file);
  useEffect(() => {
    const fetchPresignedUrl = async () => {
      try {
        const response = await axios.get(`/api/documents/file/${file._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setFileUrl(response.data.url);
        } else {
          setUrlError("Failed to get document URL");
        }
      } catch (error) {
        console.error("Error fetching document URL:", error);
        setUrlError("Error accessing document");
      }
    };

    fetchPresignedUrl();
  }, [file._id]);

  // Check for existing analysis in the file object on mount
  useEffect(() => {
    if (file.analysisResult) {
      setAnalysisResult(file.analysisResult);
      setIsCached(true);
    }
  }, [file]);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisError("");

    try {
      const response = await analyzeDocument(fileUrl, file._id);

      if (response.success) {
        setAnalysisResult(response.analysisText);
        setIsCached(response.cached);
        dispatch(
          updateExistingDocument(file._id, {
            analysisResult: response.analysisText,
            status: "analyzed",
            analysisError: null,
          })
        );
      } else {
        setAnalysisError(response.message || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setAnalysisError("Analysis failed: " + (err.message || "Unknown error"));
      dispatch(
        updateDocument(file._id, {
          analysisError: err.message || "Unknown error",
          status: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const renderPdfViewer = () => {
    if (pdfError) {
      return (
        <div className="pdf-error">
          <p>Error loading PDF: {pdfError}</p>
          <button onClick={() => window.open(fileUrl, "_blank")}>
            Open PDF in new tab
          </button>
        </div>
      );
    }

    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          onError={(error) => {
            console.error("PDF loading error:", error);
            setPdfError(error.message);
          }}
          withCredentials={false}
          httpHeaders={{
            "Access-Control-Allow-Origin": "*",
          }}
        />
      </Worker>
    );
  };

  if (urlError) {
    return (
      <div className="document-display-container">
        <div className="header">
          <IoChevronBack size={24} onClick={closeModal} />
          <h3>Document Viewer</h3>
        </div>
        <div className="error-message">{urlError}</div>
      </div>
    );
  }

  if (!fileUrl) {
    return (
      <div className="document-display-container">
        <div className="header">
          <IoChevronBack size={24} onClick={closeModal} />
          <h3>Document Viewer</h3>
        </div>
        <div className="loading-message">Loading document...</div>
      </div>
    );
  }

  return (
    <div className="document-display-container">
      {/* Back button */}
      <div className="header">
        <IoChevronBack size={24} onClick={closeModal} />
        <h3>Document Viewer</h3>
      </div>

      <div className="document-display-pdf">{renderPdfViewer()}</div>

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
                  className="analysis-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(analysisResult, {
                      USE_PROFILES: { html: true },
                      ALLOWED_TAGS: [
                        "div",
                        "h1",
                        "h2",
                        "h3",
                        "p",
                        "ul",
                        "li",
                        "strong",
                        "em",
                        "u",
                        "span",
                      ],
                      ALLOWED_ATTR: ["class", "id"],
                    }),
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
