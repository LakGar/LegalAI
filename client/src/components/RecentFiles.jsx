import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, CircularProgress, Paper } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { motion } from "framer-motion";
import "../styles/RecentFiles.css"; // Import your CSS file
import ArticleIcon from "@mui/icons-material/Article";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const recentFilesData = [
  {
    name: "Uncork Capital's Holdings",
    date: "Sep 24, 2024",
    owner: "gbisante",
    location: "LegalIT",
    id: 1,
  },
  {
    name: "Project Proposal",
    date: "Sep 24, 2024",
    owner: "me",
    location: "My Drive",
    id: 2,
  },
  {
    name: "Project Wireframes",
    date: "Sep 24, 2024",
    owner: "me",
    location: "My Drive",
    id: 3,
  },
  {
    name: "Shaurya Resume Master",
    date: "Sep 20, 2024",
    owner: "me",
    location: "My Drive",
    id: 4,
  },
  {
    name: "Data | Project 1 | Proposal",
    date: "Sep 24, 2024",
    owner: "natis911@gmail.com",
    location: "Shared",
    id: 5,
  },
  {
    name: "Resume Master",
    date: "Sep 16, 2024",
    owner: "me",
    location: "My Drive",
    id: 6,
  },
];

const RecentFiles = () => {
  const [viewType, setViewType] = useState("list"); // 'list' or 'card'
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Using theme for styles

  useEffect(() => {
    // Simulating a loading state
    setTimeout(() => setLoading(false), 1000); // Simulating loading delay of 1 second
  }, []);

  const switchView = (type) => {
    setViewType(type);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      {/* Header for switching between views */}
      <div className="recent-files-header">
        <h2
          style={{ color: theme.palette.text.primary }}
          className="recent-files-heading"
        >
          Recent Files
        </h2>
        <div>
          <IconButton
            onClick={() => switchView("list")}
            color={viewType === "list" ? "primary" : "default"}
          >
            <ViewListIcon />
          </IconButton>
          <IconButton
            onClick={() => switchView("card")}
            color={viewType === "card" ? "primary" : "default"}
          >
            <ViewModuleIcon />
          </IconButton>
        </div>
      </div>

      {/* List View */}
      {viewType === "list" ? (
        <Paper className="table-container">
          <table className="file-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason Suggested</th>
                <th>Owner</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {recentFilesData.map((file) => (
                <motion.tr
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{file.name}</td>
                  <td>{file.date}</td>
                  <td>{file.owner}</td>
                  <td>{file.location}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Paper>
      ) : (
        <div className="card-grid">
          {recentFilesData.map((file) => (
            <div
              className="recent-files-card"
              style={{
                backgroundColor: theme.custom.card,
                color: theme.palette.text.primary,
              }}
            >
              <div className="card-header">
                <div className="card-icon-name">
                  <ArticleIcon />
                  <div className="file-name">{file.name}</div>
                </div>
                <MoreVertIcon />
              </div>
              <img
                src={`https://loremflickr.com/200/200?random=${file.id}`}
                alt={file.name}
                className="img"
              />
              <div className="card-footer">
                <div className="card-owner">
                  {file.owner}
                  <span
                    className="card-date"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {file.date}
                  </span>
                </div>
                <div className="card-location" style={{ fontSize: 12 }}>
                  {file.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentFiles;
