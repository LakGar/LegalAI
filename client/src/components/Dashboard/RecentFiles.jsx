import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa"; // PDF Icon for files
import "./RecentFiles.css";
import FileUploadModal from "../Global/FileUploadModal";

const RecentFiles = ({ user }) => {
  const files = user.files;

  const [fileUploadModal, setFileUploadModal] = useState(false);
  const closeModal = () => {
    setFileUploadModal(false);
  };
  const openModal = () => {
    setFileUploadModal(true);
  };

  return (
    <div className="recent-files-container">
      {!files ? (
        <div className="no-file-container">
          <p className="no-files-message">No recent files found.</p>
          <div className="container-btn-file" onClick={openModal}>
            Add File
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <p>Recent Files</p>
          </div>
          <div className="file-list">
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  <FaFilePdf className="file-icon" />
                  <div>
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{file.size}</p>
                  </div>
                </div>
                <div className="file-avatars">
                  {file.users.slice(0, 3).map((user, userIndex) => (
                    <img
                      key={userIndex}
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                  ))}
                  {file.users.length > 3 && (
                    <p className="additional-users">+{file.users.length - 3}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {fileUploadModal && <FileUploadModal closeModal={closeModal} />}
    </div>
  );
};

export default RecentFiles;
