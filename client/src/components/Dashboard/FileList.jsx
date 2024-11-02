import React, { useState, useEffect } from "react";
import { FaFilePdf, FaPlus } from "react-icons/fa"; // PDF Icon
import { FiMoreVertical } from "react-icons/fi"; // Options Icon
import "./FileList.css"; // Include the CSS for the loader and table

const FileList = () => {
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState([]);

  // Simulating data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate fetching data after 1 second
      setFileData([
        {
          name: "Annual-report-Q4-023.pdf",
          size: "1.3 MB",
          uploaded: "Dec 2, 2023",
          updated: "an hour ago",
          owner: "Alex Turner",
        },
        {
          name: "Customer-satisfaction-survey-results.pdf",
          size: "2.1 MB",
          uploaded: "Dec 2, 2023",
          updated: "an hour ago",
          owner: "Ethan Reynolds",
        },
        {
          name: "Sales-presentation-overview.pdf",
          size: "1.2 MB",
          uploaded: "Dec 3, 2023",
          updated: "15 minutes ago",
          owner: "Edward Whitten",
        },
        {
          name: "Financial-statements-Q4-2023.pdf",
          size: "1.5 MB",
          uploaded: "Dec 3, 2023",
          updated: "15 minutes ago",
          owner: "Alex Turner",
        },
        {
          name: "Marketing-campaign-results-summary.pdf",
          size: "2.0 MB",
          uploaded: "Dec 4, 2023",
          updated: "a moments ago",
          owner: "Ethan Reynolds",
        },
        {
          name: "Event-planning-documentation.pdf",
          size: "2.3 MB",
          uploaded: "Dec 4, 2023",
          updated: "a moments ago",
          owner: "Edward Whitten",
        },
      ]);
      setLoading(false); // Stop loading after data is set
    }, 1000); // Simulating 1 second load time

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div className="file-list-container">
      <div className="section-header">
        <p className="section-header-text">My Files</p>
        <div className="file-list-header-buttons">
          <div className="add-file-btn">
            <FaPlus color="dodgerblue" />
          </div>
          <div className="see-all-btn">See All</div>
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
            ? Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan="6">
                    <div className="row-loader"></div>
                  </td>
                </tr>
              ))
            : fileData.map((file, index) => (
                <tr className="item-tr" key={index}>
                  <td>
                    <FaFilePdf style={{ color: "red", marginRight: "8px" }} />
                    {file.name}
                  </td>
                  <td>{file.size}</td>
                  <td>{file.uploaded}</td>
                  <td>{file.updated}</td>
                  <td>
                    <div className="user-info">
                      <img
                        src={`https://plus.unsplash.com/premium_photo-1730142098065-c8e1a9361b6e?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} // Random image for user
                        alt="user-avatar"
                        className="user-avatar"
                      />
                      <p>{file.owner}</p>
                    </div>
                  </td>
                  <td>
                    <button className="options-btn">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
