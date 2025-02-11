import React, { useState, useEffect } from "react";
import { FaFilePdf, FaComment, FaTrash } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import "./PaginatedFileList.css";
import FileUploadModal from "../Global/FileUploadModal";
import { getUserById } from "../../services/userServices"; // Make sure this function is implemented correctly
import {
  setActiveDocument,
  deleteExistingDocument,
} from "../../redux/actions/documentAction"; // Import the action
import { useDispatch } from "react-redux";
import FileDetailView from "../Global/FileDetailView";
import Notification from "../Global/Notification";
import { deleteDocument } from "../../services/documentService";
import FileLoader from "../Common/FileLoader";
import { useNavigate } from "react-router-dom";
import { analyzeDocument } from "../../services/documentService";

const PaginatedFileList = ({ documents }) => {
  const [loading, setLoading] = useState(true);
  const files = documents || []; // Ensure `files` is always an array
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;
  const [sortCriteria, setSortCriteria] = useState("name");
  const [filterOwner, setFilterOwner] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);
  // Store updated files with owner's firstname
  const [updatedFiles, setUpdatedFiles] = useState(files);
  const [fileDetailModal, setFileDetailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedFiles(documents || []);
  }, [documents]);

  const openModal = () => {
    setFileUploadModal(true);
  };

  const closeModal = () => {
    setFileUploadModal(false);
    setFileDetailModal(false); // Close file detail modal
  };

  const openFileDetailModal = (file) => {
    setSelectedFile(file); // Set the selected file
    dispatch(setActiveDocument(file)); // Dispatch the action to update the active document
    setFileDetailModal(true); // Open the file detail modal
  };
  // Fetch file owners by user ID
  const fetchFileOwners = async (userId) => {
    try {
      const userData = await getUserById(userId); // Assuming this returns user data with `firstname`
      console.log("Fetched user details:", userData);
      return userData.data.firstname || "Unknown"; // Return only firstname, or fallback to "Unknown"
    } catch (error) {
      console.error("Error fetching user details:", error);
      return "Unknown"; // Fallback in case of error
    }
  };

  // Update file owners once files are loaded
  useEffect(() => {
    const updateFileOwners = async () => {
      const updatedFiles = await Promise.all(
        files.map(async (file) => {
          const ownerFirstName = await fetchFileOwners(file.user);
          return { ...file, firstname: ownerFirstName };
        })
      );
      setUpdatedFiles(updatedFiles); // Store updated files with firstname
      setLoading(false); // Stop loading after update
    };

    if (files.length > 0) {
      updateFileOwners();
    }
  }, [files]);

  // Simulate data fetch with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter, sort, and paginate the files based on active criteria
  const filteredAndSortedFiles = updatedFiles
    .filter((file) => !filterOwner || file.firstname.includes(filterOwner))
    .sort((a, b) => {
      if (sortCriteria === "name") return a.name.localeCompare(b.name);
      if (sortCriteria === "size")
        return parseFloat(a.size) - parseFloat(b.size);
      return 0;
    });

  // Calculate the total pages based on filtered and sorted files
  const totalPages = Math.ceil(filteredAndSortedFiles.length / filesPerPage);

  // Reset to the first page whenever filter or sort criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterOwner, sortCriteria]);

  // Paginate the files for display on the current page
  const displayedFiles = filteredAndSortedFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleSortChange = (criteria) => setSortCriteria(criteria);
  const handleFilterChange = (owner) => setFilterOwner(owner);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleRowClick = (file) => {
    openFileDetailModal(file);
  };

  const handleOptionsClick = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggling options for file:", file._id);
    setSelectedFile(file);
    setShowOptions((prevState) => (prevState === file._id ? null : file._id));
  };

  const handleDeleteClick = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete clicked for file:", file._id);
    setSelectedFile(file);
    setShowDeleteModal(true);
  };

  const handleChatClick = (document) => {
    navigate(`/chats?documentId=${document._id}`);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setNotification({
      message: "Deleting file...",
      type: "info",
    });

    try {
      await dispatch(deleteExistingDocument(selectedFile._id));
      setNotification({
        message: "File deleted successfully",
        type: "success",
      });

      const newFiles = updatedFiles.filter(
        (file) => file._id !== selectedFile._id
      );
      setUpdatedFiles(newFiles);
    } catch (error) {
      setNotification({
        message: error.message || "Failed to delete file",
        type: "error",
      });
    }
  };

  const handleAnalyzeDocument = async (document) => {
    try {
      setNotification({
        type: "info",
        message: "Analyzing document...",
        duration: 2000,
      });

      const response = await dispatch(analyzeDocument(document._id));

      if (response.success) {
        setNotification({
          type: "success",
          message: "Document analyzed successfully!",
          duration: 3000,
        });
      } else {
        let errorMessage = "Failed to analyze document.";

        // Handle specific error cases
        if (response.error?.includes("Illegal character")) {
          errorMessage =
            "The PDF file appears to be corrupted or password-protected. Please ensure the file is accessible and try again.";
        } else if (response.error?.includes("Failed to process PDF")) {
          errorMessage =
            "Unable to read the PDF file. Please make sure it's a valid PDF document.";
        }

        setNotification({
          type: "error",
          message: errorMessage,
          duration: 5000,
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message:
          "An unexpected error occurred while analyzing the document. Please try again.",
        duration: 5000,
      });
    }
  };

  return (
    <div className="paginated-file-list-container">
      {updatedFiles.length === 0 ? (
        <div className="empty-state-text">
          <p>No documents found</p>
          <button className="container-btn-file" onClick={openModal}>
            Add Document
          </button>
        </div>
      ) : (
        <>
          <div className="section-header">
            <p className="section-header-text">Documents</p>
            <div className="file-list-header-buttons">
              <button
                className={`sort-btn ${
                  sortCriteria === "name" ? "active-filter" : ""
                }`}
                onClick={() => handleSortChange("name")}
              >
                Sort by Name
              </button>
              <button
                className={`sort-btn ${
                  sortCriteria === "size" ? "active-filter" : ""
                }`}
                onClick={() => handleSortChange("size")}
              >
                Sort by Size
              </button>
              <button
                className={`filter-btn ${
                  filterOwner === "Alex Turner" ? "active-filter" : ""
                }`}
                onClick={() => handleFilterChange("Alex Turner")}
              >
                Filter by Alex Turner
              </button>
              <button
                className={`filter-btn ${
                  filterOwner === "" ? "active-filter" : ""
                }`}
                onClick={() => handleFilterChange("")}
              >
                Clear Filter
              </button>
            </div>
          </div>
          <table className="file-list-table">
            <thead>
              <tr>
                <th>File name</th>
                <th>Type</th>
                <th>Date uploaded</th>
                <th>Last updated</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: filesPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td colSpan="6">
                        <div className="row-loader"></div>
                      </td>
                    </tr>
                  ))
                : displayedFiles.map((file, index) => (
                    <tr
                      className="item-tr"
                      key={file._id || index}
                      onClick={() => handleRowClick(file)}
                    >
                      <td>
                        <FaFilePdf
                          style={{ color: "red", marginRight: "8px" }}
                        />
                        {file.name}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {file.type}
                      </td>
                      <td>{formatDate(file.uploadedAt)}</td>
                      <td>{formatDate(file.updatedAt)}</td>
                      <td>{file.firstname}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={(e) => handleDeleteClick(e, file)}
                          title="Delete file"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {fileUploadModal && <FileUploadModal closeModal={closeModal} />}
      {fileDetailModal && (
        <FileDetailView file={selectedFile} closeModal={closeModal} />
      )}
      {notification && (
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3 className="delete-modal-header">Delete File</h3>
            <p className="delete-modal-content">
              Are you sure you want to delete "{selectedFile?.name}"? This
              action cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <button
                className="delete-modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="delete-modal-btn delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedFileList;
