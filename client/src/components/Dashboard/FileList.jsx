import React, { useState, useEffect } from "react";
import { FaFilePdf, FaPlus } from "react-icons/fa"; // PDF Icon
import { FiMoreVertical } from "react-icons/fi"; // Options Icon
import "./FileList.css"; // Include the CSS for the loader and table
import { getUserById } from "../../services/userServices";
import { NavLink } from "react-router-dom";

const FileList = ({ user, documents }) => {
  const [loading, setLoading] = useState(true);
  const files = documents || [];
  const [filterOwner, setFilterOwner] = useState("");
  const [updatedFiles, setUpdatedFiles] = useState(files);

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

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  return (
    <div className="file-list-container">
      {!updatedFiles ? (
        <div className="container1">
          <div className="snow"></div>
          <div className="tree1"></div>
          <div className="tree2"></div>
          <div className="house">
            <div className="roof1">
              <div className="b1"></div>
              <div className="b2"></div>
            </div>
            <div className="wall1">
              <div className="w3">
                <div className="window1">
                  <div className="glass1"></div>
                </div>
              </div>
            </div>
            <div className="wall2">
              <div className="light">
                <div className="w1">
                  <div className="window">
                    <div className="glass"></div>
                  </div>
                </div>
                <div className="w2">
                  <div className="window">
                    <div className="glass"></div>
                  </div>
                </div>
              </div>
              <div className="door">
                <div className="handle"></div>
              </div>
              <div className="snw1"></div>
              <div className="snw2"></div>
            </div>
            <div className="wall3">
              <div className="b3"></div>
              <div className="b4"></div>
              <div className="chimney">
                <div className="top1">
                  <div className="smoke">
                    <div className="s1"></div>
                    <div className="s2"></div>
                    <div className="s3"></div>
                  </div>
                  <div className="shne1"></div>
                  <div className="shne2"></div>
                </div>
              </div>
              <div className="sn">
                <div className="dr1"></div>
                <div className="dr2"></div>
                <div className="dr3"></div>
              </div>
              <div className="sn1">
                <div className="dr4"></div>
              </div>
              <div className="sh1"></div>
              <div className="sh2"></div>
              <div className="sh3"></div>
              <div className="sh4"></div>
              <div className="sh5"></div>
            </div>
          </div>
          <div className="snowfall"></div>
          <div className="cover"></div>
          <div className="bottom1">
            <div className="bt1"></div>
            <div className="bt2"></div>
          </div>
          <div className="fence">
            <div className="fn1">
              <div className="screw"></div>
            </div>
            <div className="fn2">
              <div className="screw"></div>
            </div>
            <div className="fn3">
              <div className="screw"></div>
            </div>
            <div className="stck"></div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <p className="section-header-text">My Files</p>
            <div className="file-list-header-buttons">
              <NavLink to="/documents" className="see-all-btn">
                See All
              </NavLink>
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
                ? Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index}>
                      <td colSpan="6">
                        <div className="row-loader"></div>
                      </td>
                    </tr>
                  ))
                : updatedFiles.map((file, index) => (
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
        </div>
      )}
    </div>
  );
};

export default FileList;
