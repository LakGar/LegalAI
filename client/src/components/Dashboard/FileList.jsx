import React, { useState, useEffect } from "react";
import { FaFilePdf, FaPlus } from "react-icons/fa"; // PDF Icon
import { FiMoreVertical } from "react-icons/fi"; // Options Icon
import "./FileList.css"; // Include the CSS for the loader and table

const FileList = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState(user.file);

  // Simulating data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after data is set
    }, 1000); // Simulating 1 second load time

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div className="file-list-container">
      {!fileData ? (
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
                        <FaFilePdf
                          style={{ color: "red", marginRight: "8px" }}
                        />
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
      )}
    </div>
  );
};

export default FileList;
