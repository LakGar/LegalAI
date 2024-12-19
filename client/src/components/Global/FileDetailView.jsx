import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "./FileDetailView.css"; // Ensure you have appropriate styling
import { IoChevronBack } from "react-icons/io5";

// Set the workerSrc for rendering PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DocumentDisplay = ({ file, closeModal }) => {
  const [pdfBlob, setPdfBlob] = useState(null); // State to store PDF blob
  const [numPages, setNumPages] = useState(null); // State to track number of pages
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  const fileUrl = `http://localhost:8000/${file.documentUrl}`; // Adjust endpoint

  // Fetch the file from the backend
  useEffect(() => {
    const fetchFile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get(fileUrl, {
          responseType: "blob", // Expect a binary file
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        setPdfBlob(response.data); // Store the file blob
      } catch (err) {
        console.error("Error fetching PDF:", err);
        setError("Unable to load the PDF file.");
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    fetchFile();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
        <p>Loading PDF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
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

      {/* PDF Viewer */}
      <div className="pdf-viewer">
        <Document
          file={pdfBlob} // Use the blob as the file
          onLoadSuccess={({ numPages }) => setNumPages(numPages)} // Set number of pages
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default DocumentDisplay;
