import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import "./PaginatedFileList.css";

const PaginatedFileList = () => {
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 20;
  const [sortCriteria, setSortCriteria] = useState("name");
  const [filterOwner, setFilterOwner] = useState("");

  useEffect(() => {
    // Simulate data fetch with a timeout
    const timer = setTimeout(() => {
      setFileData([
        // Add your file data entries here
        {
          name: "Annual-report-Q4-023.pdf",
          size: "1.3 MB",
          uploaded: "Dec 2, 2023",
          updated: "an hour ago",
          owner: "Alex Turner",
        },
        {
          name: "Financial-summary-Q1-2024.pdf",
          size: "1.5 MB",
          uploaded: "Jan 15, 2024",
          updated: "10 days ago",
          owner: "Sarah Lee",
        },
        {
          name: "Project-status-March-2024.docx",
          size: "2.2 MB",
          uploaded: "Mar 5, 2024",
          updated: "a week ago",
          owner: "David Chen",
        },
        {
          name: "Employee-handbook.pdf",
          size: "4.3 MB",
          uploaded: "Feb 10, 2023",
          updated: "3 months ago",
          owner: "Rachel Green",
        },
        {
          name: "Sales-data-Q2-2023.xlsx",
          size: "1.1 MB",
          uploaded: "Jul 21, 2023",
          updated: "2 weeks ago",
          owner: "Monica Geller",
        },
        {
          name: "Strategy-overview.pptx",
          size: "3.8 MB",
          uploaded: "Oct 10, 2023",
          updated: "4 hours ago",
          owner: "Michael Scott",
        },
        {
          name: "Marketing-campaign-2023.pdf",
          size: "2.4 MB",
          uploaded: "Nov 3, 2023",
          updated: "5 days ago",
          owner: "Jim Halpert",
        },
        {
          name: "Annual-budget-2024.docx",
          size: "1.9 MB",
          uploaded: "Dec 1, 2023",
          updated: "yesterday",
          owner: "Pam Beesly",
        },
        {
          name: "IT-security-policy.pdf",
          size: "5.0 MB",
          uploaded: "Jan 5, 2024",
          updated: "a month ago",
          owner: "Angela Martin",
        },
        {
          name: "Q3-report-summary.pptx",
          size: "3.2 MB",
          uploaded: "Sep 15, 2023",
          updated: "today",
          owner: "Kevin Malone",
        },
        {
          name: "Staff-meeting-notes.docx",
          size: "0.9 MB",
          uploaded: "Feb 20, 2024",
          updated: "6 days ago",
          owner: "Oscar Martinez",
        },
        {
          name: "Product-roadmap-2024.pdf",
          size: "2.1 MB",
          uploaded: "Mar 1, 2024",
          updated: "8 hours ago",
          owner: "Stanley Hudson",
        },
        {
          name: "Technical-specifications.docx",
          size: "3.6 MB",
          uploaded: "Mar 10, 2023",
          updated: "2 weeks ago",
          owner: "Dwight Schrute",
        },
        {
          name: "Vendor-contracts.pdf",
          size: "2.7 MB",
          uploaded: "Dec 25, 2023",
          updated: "5 months ago",
          owner: "Jan Levinson",
        },
        {
          name: "Customer-feedback-July-2023.xlsx",
          size: "0.7 MB",
          uploaded: "Aug 3, 2023",
          updated: "3 days ago",
          owner: "Phyllis Vance",
        },
        {
          name: "Onboarding-guide.docx",
          size: "1.4 MB",
          uploaded: "Nov 1, 2023",
          updated: "a week ago",
          owner: "Ryan Howard",
        },
        {
          name: "Company-values.pptx",
          size: "3.5 MB",
          uploaded: "Dec 12, 2023",
          updated: "yesterday",
          owner: "Kelly Kapoor",
        },
        {
          name: "Revenue-analysis-2023.pdf",
          size: "1.2 MB",
          uploaded: "Apr 4, 2024",
          updated: "3 months ago",
          owner: "Toby Flenderson",
        },
        {
          name: "Monthly-performance-report.pdf",
          size: "2.9 MB",
          uploaded: "Aug 1, 2023",
          updated: "2 months ago",
          owner: "Andy Bernard",
        },
        {
          name: "Risk-assessment-2024.docx",
          size: "4.1 MB",
          uploaded: "Feb 1, 2024",
          updated: "6 hours ago",
          owner: "Creed Bratton",
        },
        {
          name: "HR-policies.pdf",
          size: "3.0 MB",
          uploaded: "Jan 8, 2024",
          updated: "3 days ago",
          owner: "Holly Flax",
        },
        {
          name: "Expense-report-June-2023.xlsx",
          size: "1.0 MB",
          uploaded: "Jul 10, 2023",
          updated: "4 weeks ago",
          owner: "Clark Green",
        },
        {
          name: "Sales-targets-Q4-2024.pptx",
          size: "2.3 MB",
          uploaded: "Oct 5, 2023",
          updated: "a week ago",
          owner: "Nate Nickerson",
        },
        {
          name: "Team-performance-review.docx",
          size: "1.8 MB",
          uploaded: "Dec 20, 2023",
          updated: "3 days ago",
          owner: "Gabe Lewis",
        },
        {
          name: "Supplier-invoices-Jan-2024.pdf",
          size: "2.0 MB",
          uploaded: "Jan 30, 2024",
          updated: "5 hours ago",
          owner: "Robert California",
        },
        {
          name: "Employee-roles-and-responsibilities.pdf",
          size: "4.2 MB",
          uploaded: "Feb 3, 2024",
          updated: "2 months ago",
          owner: "Darryl Philbin",
        },
        {
          name: "Event-planning-guide-2023.docx",
          size: "3.7 MB",
          uploaded: "Nov 30, 2023",
          updated: "4 days ago",
          owner: "Erin Hannon",
        },
        {
          name: "Budget-projections-2025.pdf",
          size: "2.6 MB",
          uploaded: "Mar 12, 2024",
          updated: "an hour ago",
          owner: "Jo Bennett",
        },
        {
          name: "Inventory-checklist.docx",
          size: "1.0 MB",
          uploaded: "Apr 2, 2024",
          updated: "yesterday",
          owner: "Todd Packer",
        },
        {
          name: "Operational-plan-2024.pdf",
          size: "3.1 MB",
          uploaded: "Jan 10, 2024",
          updated: "1 month ago",
          owner: "Charles Miner",
        },
        {
          name: "Branding-guidelines.pptx",
          size: "3.6 MB",
          uploaded: "Feb 22, 2024",
          updated: "today",
          owner: "Karen Filippelli",
        },
        {
          name: "Office-supplies-requisition-2023.xlsx",
          size: "1.5 MB",
          uploaded: "Dec 2, 2023",
          updated: "10 days ago",
          owner: "Meredith Palmer",
        },
        {
          name: "Quarterly-financials-Q3-2023.pdf",
          size: "2.8 MB",
          uploaded: "Sep 8, 2023",
          updated: "5 weeks ago",
          owner: "Josh Porter",
        },
        {
          name: "Data-security-policy-2024.docx",
          size: "3.9 MB",
          uploaded: "Jan 15, 2024",
          updated: "2 months ago",
          owner: "Hank Tate",
        },
        {
          name: "Meeting-agenda-March-2024.docx",
          size: "0.8 MB",
          uploaded: "Mar 3, 2024",
          updated: "2 days ago",
          owner: "Bob Vance",
        },
        {
          name: "Product-release-notes-v2.0.pdf",
          size: "2.5 MB",
          uploaded: "Mar 25, 2024",
          updated: "a week ago",
          owner: "Val Johnson",
        },
        {
          name: "Company-announcements.docx",
          size: "1.3 MB",
          uploaded: "Feb 28, 2024",
          updated: "3 hours ago",
          owner: "Roy Anderson",
        },
        {
          name: "User-guide-v1.0.pptx",
          size: "3.4 MB",
          uploaded: "Mar 15, 2024",
          updated: "a month ago",
          owner: "Donna Adams",
        },
        {
          name: "Payroll-summary-Feb-2024.xlsx",
          size: "1.6 MB",
          uploaded: "Mar 5, 2024",
          updated: "today",
          owner: "Sasha Bloom",
        },
        {
          name: "Client-contracts-2023.pdf",
          size: "2.3 MB",
          uploaded: "Dec 17, 2023",
          updated: "6 days ago",
          owner: "Rachel Austin",
        },

        // Add more entries for pagination testing
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter, sort, and paginate the files based on active criteria
  const filteredAndSortedFiles = fileData
    .filter((file) => !filterOwner || file.owner.includes(filterOwner))
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

  return (
    <div className="paginated-file-list-container">
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
            <th>Size</th>
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
                    <FaFilePdf style={{ color: "red", marginRight: "8px" }} />
                    {file.name}
                  </td>
                  <td>{file.size}</td>
                  <td>{file.uploaded}</td>
                  <td>{file.updated}</td>
                  <td>{file.owner}</td>
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
    </div>
  );
};

export default PaginatedFileList;
