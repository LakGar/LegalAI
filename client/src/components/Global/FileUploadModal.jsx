import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./FileUploadModal.css";

const FileUploadModal = ({ closeModal }) => {
  return (
    <div className="file-upload-modal-container">
      <div className="file-upload-modal">
        {/* Modal Content */}
        <div className="file-upload-modal-content">
          <h3 className="file-upload-title">Upload Your File</h3>
          <p className="file-upload-description">
            Drag and drop a file or select a file to upload.
          </p>

          {/* Drag and Drop Area */}
          <div className="drag-drop-area">
            <FaCloudUploadAlt className="drag-drop-icon" />
            <p className="drag-drop-text">Drag & Drop Your File Here</p>
            <span className="drag-drop-or">or</span>
            <label className="file-input-label">
              <input type="file" className="file-input" />
              Select File
            </label>
          </div>

          {/* Action Buttons */}
          <div className="file-upload-actions">
            <div className="cancel-button" onClick={closeModal}>
              Cancel
            </div>
            <div className="upload-button">Upload</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
