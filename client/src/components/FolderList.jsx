import React, { useEffect, useState } from "react";
import { IconButton, Button, useTheme } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import "../styles/FolderList.css"; // Importing the CSS file

const FolderList = () => {
  const theme = useTheme(); // Access theme
  const [folders, setFolders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch folder data
    const fetchFolders = () => {
      setTimeout(() => {
        setFolders([
          { name: "Projects", fileCount: 453, size: "11 GB" },
          { name: "Marketing", fileCount: 84, size: "3.6 GB" },
          { name: "Personal", fileCount: 287, size: "8.9 GB" },
          { name: "Portfolio", fileCount: 56, size: "6 GB" },
          { name: "Finances", fileCount: 128, size: "5 GB" },
          { name: "Photos", fileCount: 532, size: "15 GB" },
          { name: "Designs", fileCount: 92, size: "4 GB" },
          { name: "Research", fileCount: 37, size: "2 GB" },
        ]);
        setIsLoaded(true); // Set the loaded state after fetching data
      }, 300); // Simulate a short delay before loading
    };
    fetchFolders();
  }, []);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="folder-list-container">
      <div className="folder-list-header">
        <h2 style={{ color: theme.palette.text.primary }}>Folders</h2>
      </div>

      <div className={`folder-list ${isLoaded ? "loaded" : ""}`}>
        {/* Show only the first 7 folders if showAll is false */}
        {folders.slice(0, showAll ? folders.length : 6).map((folder, index) => (
          <div
            key={index}
            className="folder-card"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <div className="folder-icon">
              <FolderIcon
                style={{ fontSize: 50, color: theme.custom.accent }} // Accent color
              />
            </div>
            <div className="folder-info">
              <div className="folder-name">{folder.name}</div>
              <div className="folder-details">{folder.fileCount} files</div>
              <div className="folder-size">{folder.size}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Show "Show More" button if there are more than 6 folders */}
      {folders.length > 6 && (
        <div className="folder-show-more">
          <div
            style={{
              color: theme.custom.accent,
              border: "none",
            }}
            onClick={handleShowMore}
          >
            {showAll ? "Show Less" : "Show More"}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderList;
