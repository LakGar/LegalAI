import React, { useState, useEffect } from "react";
import { useTheme, Avatar } from "@mui/material";
import "../styles/QuickAccess.css";
import FolderIcon from "@mui/icons-material/Folder";
import ChatIcon from "@mui/icons-material/Chat";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";

const QuickAccess = () => {
  const theme = useTheme(); // Access theme colors
  const [searchList, isSearchList] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Delay for animation
  }, []);

  // Example collaborators
  const collaborators = [
    { name: "John Doe", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Jane Doe", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Sam Smith", img: "https://i.pravatar.cc/150?img=3" },
    { name: "Alex Johnson", img: "https://i.pravatar.cc/150?img=4" },
    { name: "Chris Lee", img: "https://i.pravatar.cc/150?img=5" },
  ];

  // Helper function to render collaborators
  const renderCollaborators = (collaborators) => {
    const maxVisibleCollaborators = 2;
    const remainingCollaborators =
      collaborators.length - maxVisibleCollaborators;
    const visibleCollaborators = collaborators.slice(
      0,
      maxVisibleCollaborators
    );

    return (
      <div className="collaborators-container">
        {visibleCollaborators.map((collaborator, index) => (
          <Avatar
            key={index}
            src={collaborator.img}
            alt={collaborator.name}
            className="collaborator-avatar"
            style={{
              border: `2px solid ${theme.palette.background.paper}`,
              zIndex: maxVisibleCollaborators - index, // Ensure overlap
            }}
          />
        ))}
        {remainingCollaborators > 0 && (
          <div className="remaining-collaborators">
            +{remainingCollaborators}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="quick-access-container"
      style={{ color: theme.palette.text.primary }}
    >
      <div
        className="quick-access-search-container"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <div className="search-icon">
          <SearchIcon style={{ color: "white" }} />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="quick-access-search-input"
          style={{ color: theme.palette.text.primary }}
        />
      </div>

      {searchList ? (
        <></>
      ) : (
        <div className={`quick-access ${isLoaded ? "loaded" : ""}`}>
          <div className="quick-access-list-title">Quick Access</div>
          <div className="quick-access-list-container">
            {/* Folder with primary background, shadow, and file count */}
            <div
              className="quick-access-item"
              style={{
                backgroundColor: theme.palette.primary.main,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="icon-container">
                <div className="quick-access-item-icon">
                  <FolderIcon
                    style={{ color: theme.palette.primary.main, fontSize: 40 }}
                  />
                </div>
                {renderCollaborators(collaborators)}
              </div>
              <div
                className="quick-access-item-text"
                style={{ color: "white" }}
              >
                Projects
              </div>
              <div
                className="quick-access-item-subtext"
                style={{ color: "lightgrey" }}
              >
                8 files
              </div>
            </div>

            {/* File with size and collaborators */}
            <div
              className="quick-access-item"
              style={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <div className="icon-container">
                <div className="quick-access-item-icon">
                  <ChatIcon
                    style={{ color: theme.custom.accent, fontSize: 40 }}
                  />
                </div>
                {renderCollaborators(collaborators)}
              </div>

              <div className="quick-access-item-text">Brand Guideline.pdf</div>
              <div className="quick-access-item-subtext">12 MB</div>
            </div>

            {/* Analysis with chat count and collaborators */}
            <div
              className="quick-access-item"
              style={{
                backgroundColor: theme.custom.card,
              }}
            >
              <div className="icon-container">
                <div className="quick-access-item-icon">
                  <AssessmentIcon
                    style={{ color: theme.custom.accent, fontSize: 40 }}
                  />
                </div>
                {renderCollaborators(collaborators.slice(0, 1))}
              </div>

              <div className="quick-access-item-text">MyVacation.mp4</div>
              <div className="quick-access-item-subtext">237 MB</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccess;
