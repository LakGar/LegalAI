import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./FileUploadModal.css";
import { uploadNewDocument } from "../../redux/actions/documentAction";
import { createPortal } from "react-dom";

const FileUploadModal = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [metadata, setMetadata] = useState({
    name: "",
    type: "other",
    description: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        const fileName = file.name.replace(".pdf", "");
        setMetadata((prev) => ({
          ...prev,
          name: fileName,
        }));
      } else {
        setError("Please upload a PDF file only");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        const fileName = file.name.replace(".pdf", "");
        setMetadata((prev) => ({
          ...prev,
          name: fileName,
        }));
      } else {
        setError("Please upload a PDF file only");
      }
    }
  };

  const handleAddTag = (e) => {
    if (e.key === " " && tagInput.trim()) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }
    if (!metadata.name.trim()) {
      setError("Document name is required");
      return;
    }
    if (!metadata.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", metadata.name);
      formData.append("type", metadata.type);
      formData.append("description", metadata.description);
      formData.append("tags", metadata.tags.join(","));

      await dispatch(uploadNewDocument(formData));
      closeModal();
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="file-upload-modal-container">
        <div className="file-upload-loading-overlay">
          <div className="file-upload-loader-spinner" />
          <div className="file-upload-progress-container">
            <div className="file-upload-progress">
              <div className="file-upload-progress-bar" />
            </div>
            <span className="file-upload-progress-text">Uploading... 75%</span>
          </div>
          <p className="file-upload-loading-text">Processing your document</p>
          <p className="file-upload-loading-subtext">
            Please wait while we upload your file
          </p>
        </div>
      </div>
    );
  }

  const modalContent = (
    <div className="file-upload-modal-container">
      <div className="file-upload-modal">
        <button className="file-upload-modal-close-button" onClick={closeModal}>
          <IoClose />
        </button>
        <div className="file-upload-modal-content">
          <h2 className="file-upload-title">Upload Document</h2>
          <p className="file-upload-description">
            Drag and drop your file here, or click to select
          </p>

          <div
            className={`drag-drop-area ${isDragging ? "dragging" : ""}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="drag-drop-icon" />
            <p className="drag-drop-text">Drag & Drop your file here</p>
            <p className="drag-drop-or">or</p>
            <label className="file-input-label">
              Browse Files
              <input
                type="file"
                className="file-input"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="selected-file-area">
              <div className="selected-file-preview">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  style={{ width: 70 }}
                />
              </div>
              <div className="selected-file-info">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                className="remove-file-button"
                onClick={() => setSelectedFile(null)}
              >
                &times;
              </button>
            </div>
          )}
          <div className="file-details">
            <div className="row">
              <div className="input-group">
                <label>
                  Document Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter document name"
                  value={metadata.name}
                  onChange={(e) =>
                    setMetadata({ ...metadata, name: e.target.value })
                  }
                />
              </div>
              <select
                value={metadata.type}
                onChange={(e) =>
                  setMetadata({ ...metadata, type: e.target.value })
                }
              >
                <option value="contract">Contract</option>
                <option value="agreement">Agreement</option>
                <option value="report">Report</option>
                <option value="invoice">Invoice</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>
                Description <span className="required">*</span>
              </label>
              <textarea
                placeholder="Enter document description"
                value={metadata.description}
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
              />
            </div>

            <div className="tags-input">
              {metadata.tags.map((tag, index) => (
                <p className="tag" key={index}>
                  {tag}
                  <button
                    className="remove-tag-button"
                    onClick={() => handleRemoveTag(index)}
                  >
                    &times;
                  </button>
                </p>
              ))}
              <input
                type="text"
                placeholder="Add tags (press space)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
          </div>

          <div className="file-upload-actions">
            <div className="cancel-button" onClick={closeModal}>
              Cancel
            </div>
            <div
              className={`upload-button ${!selectedFile ? "disabled" : ""}`}
              onClick={handleUpload}
            >
              {loading ? "Uploading..." : "Upload Document"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default FileUploadModal;
