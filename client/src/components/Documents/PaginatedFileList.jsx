import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import "./PaginatedFileList.css";
import FileUploadModal from "../Global/FileUploadModal";
import { getUserById } from "../../services/userServices"; // Make sure this function is implemented correctly

const PaginatedFileList = ({ documents }) => {
  const [loading, setLoading] = useState(true);
  const files = documents || []; // Ensure `files` is always an array
  console.log(files);

  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;
  const [sortCriteria, setSortCriteria] = useState("name");
  const [filterOwner, setFilterOwner] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);

  // Store updated files with owner's firstname
  const [updatedFiles, setUpdatedFiles] = useState(files);

  const closeModal = () => {
    setFileUploadModal(false);
  };

  const openModal = () => {
    setFileUploadModal(true);
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

  return (
    <div className="paginated-file-list-container">
      {files.length === 0 ? ( // Handle empty files case
        <>
          <div className="section-header">
            <p className="section-header-text">Documents</p>
          </div>
          <div className="no-files-container">
            <p className="no-files-message">No documents found.</p>
            <div
              className="container-btn-file"
              style={{ maxWidth: 400, alignSelf: "center" }}
              onClick={openModal}
            >
              Add Document
            </div>
          </div>
        </>
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
                <th>Options</th>
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
                    <tr className="item-tr" key={index}>
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
                        <button className="options-btn">
                          <FiMoreVertical />
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
    </div>
  );
};

export default PaginatedFileList;
