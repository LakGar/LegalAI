import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa"; // PDF Icon for files
import "./RecentFiles.css";
import FileUploadModal from "../Global/FileUploadModal";
import { getUserById } from "../../services/userServices"; // Ensure this service is implemented

const RecentFiles = ({ documents }) => {
  const files = documents || []; // Ensure files is always an array
  const [updatedFiles, setUpdatedFiles] = useState([]);
  const [fileUploadModal, setFileUploadModal] = useState(false);

  const closeModal = () => {
    setFileUploadModal(false);
  };

  const openModal = () => {
    setFileUploadModal(true);
  };

  // Fetch owner's first name for each file
  const fetchFileOwners = async (userId) => {
    try {
      const userData = await getUserById(userId); // Assuming this returns user data with `firstname`
      return userData?.data?.firstname || "Unknown"; // Return only the first name, or fallback to "Unknown"
    } catch (error) {
      console.error("Error fetching user details:", error);
      return "Unknown"; // Fallback in case of error
    }
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

  useEffect(() => {
    const updateFileOwners = async () => {
      const updated = await Promise.all(
        files.map(async (file) => {
          const ownerFirstName = await fetchFileOwners(file.user);
          return { ...file, firstname: ownerFirstName };
        })
      );
      setUpdatedFiles(updated); // Store files with updated owner info
    };

    if (files.length > 0) {
      updateFileOwners();
    }
  }, [files]);

  return (
    <div className="recent-files-container">
      {updatedFiles.length === 0 ? (
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
            {updatedFiles.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  <FaFilePdf className="file-icon" />
                  <div>
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{file.description}</p>
                    <p className="file-date">{formatDate(file.uploadedAt)}</p>
                  </div>
                </div>
                <div className="file-avatars">
                  {file.firstname && (
                    <div className="avatar-circle">
                      {file.firstname[0].toUpperCase()}
                    </div>
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
