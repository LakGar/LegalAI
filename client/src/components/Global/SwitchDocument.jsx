import React from "react";
import "./SwitchDocument.css";
import { FaFilePdf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SwitchDocument = ({ documents, closeModal, setActiveDocument }) => {
  const handleDocumentClick = (document) => {
    setActiveDocument(document); // Set the selected document as active
    closeModal(); // Close the modal
  };
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  return (
    <div className="switch-document-overlay">
      <div className="switch-document-modal">
        <div className="modal-header">
          <h2>Select a Document</h2>
          <IoClose className="close-icon" onClick={closeModal} />
        </div>
        <div className="document-list">
          {documents.map((doc, index) => (
            <div
              className="file-item"
              key={index}
              onClick={() => handleDocumentClick(doc)}
              style={{ width: 250, height: 150 }}
            >
              <div className="file-info">
                <FaFilePdf className="file-icon" />
                <div>
                  <p className="file-name">{doc.name}</p>
                  <p className="file-size">{doc.description}</p>
                  <p
                    className="file-date"
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      color: "grey",
                      fontSize: 12,
                    }}
                  >
                    {formatDate(doc.uploadedAt)}
                  </p>
                </div>
              </div>
              <div className="file-avatars">
                {doc.firstname && (
                  <div className="avatar-circle">
                    {doc?.firstname[0].toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchDocument;
