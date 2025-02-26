import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa"; // PDF Icon for files
import { useDispatch } from "react-redux"; // Import useDispatch for Redux
import { setActiveDocument } from "../../redux/actions/documentAction"; // Import the action
import "./RecentFiles.css";
import FileUploadModal from "../Global/FileUploadModal";
import { getUserById } from "../../services/userServices"; // Ensure this service is implemented
import FileDetailView from "../Global/FileDetailView";
import ScrollableContainer from "../Common/ScrollableContainer"; // Import the ScrollableContainer

const RecentFiles = ({ documents }) => {
  const files = documents || []; // Ensure files is always an array
  const [updatedFiles, setUpdatedFiles] = useState([]);
  const [fileUploadModal, setFileUploadModal] = useState(false);
  const [fileDetailModal, setFileDetailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  const dispatch = useDispatch(); // Initialize the Redux dispatch

  const closeModal = () => {
    setFileUploadModal(false);
    setFileDetailModal(false); // Close file detail modal
  };

  const openFileDetailModal = (file) => {
    setSelectedFile(file); // Set the selected file
    dispatch(setActiveDocument(file)); // Dispatch the action to update the active document
    setFileDetailModal(true); // Open the file detail modal
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

  // Compute the most recent four files by sorting in descending order based on uploadedAt
  const recentFourFiles = [...updatedFiles]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, 4);

  return (
    <div className="recent-files-container">
      {updatedFiles.length === 0 ? (
        <div className="no-file-container">
          <p className="no-files-message">No recent files found.</p>
          <div
            className="container-btn-file"
            onClick={() => setFileUploadModal(true)}
          >
            Add File
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <p>Recent Files</p>
            <div
              className="see-all-btn"
              onClick={() => setFileUploadModal(true)}
            >
              Add File
            </div>
          </div>
          <ScrollableContainer className="file-list">
            {recentFourFiles.map((file, index) => (
              <div
                className="file-item"
                key={index}
                onClick={() => openFileDetailModal(file)} // Handle click to open file details
              >
                <div className="file-info">
                  <FaFilePdf className="file-icon" />
                  <div>
                    {/* Limit file name to 60 characters */}
                    <p className="file-name">
                      {file.name.length > 30
                        ? `${file.name.substring(0, 30)}...`
                        : file.name}
                    </p>
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
          </ScrollableContainer>
        </div>
      )}
      {fileUploadModal && <FileUploadModal closeModal={closeModal} />}
      {fileDetailModal && (
        <FileDetailView file={selectedFile} closeModal={closeModal} />
      )}
    </div>
  );
};

export default RecentFiles;
