import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import { useTheme } from "@mui/material";
import QuickAccess from "../components/QuickAccess";
import TopNav from "../components/Topnav";
import FolderList from "../components/FolderList";
import RecentFiles from "../components/RecentFiles";
import RecentAnalysis from "../components/RecentAnalysis";

const Dashboard = () => {
  const theme = useTheme();
  const [isSidenavOpen, setIsSidenavOpen] = useState(true); // State to track sidenav

  const handleToggleNav = (isOpen) => {
    setIsSidenavOpen(isOpen);
  };

  return (
    <div
      className="dashboard-container"
      style={{
        height: "100%", // Ensure the container takes up the full viewport height
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sidebar with dynamic width based on open/collapsed state */}
      <div
        style={{
          width: isSidenavOpen ? "300px" : "80px",
          transition: "width 0.3s ease", // Add transition for sidenav width
        }}
      >
        <div className="sidnav">
          <Sidenav onToggleNav={handleToggleNav} />
        </div>
      </div>

      {/* Main content area adjusts based on sidenav width */}
      <div
        style={{
          flex: 1,
          transition: "margin-left 0.3s ease", // Smooth transition for layout adjustment
          marginLeft: isSidenavOpen ? 0 : 0, // Adjust based on sidenav width
        }}
      >
        <TopNav />
        <div
          style={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease", // Smooth transition for all child components
            marginLeft: isSidenavOpen ? "20px" : "20px",
          }}
          className="main-content"
        >
          <QuickAccess />
          <FolderList />
          <RecentFiles />
          <RecentAnalysis />
        </div>

        {/* Footer Section */}
        <footer
          style={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            padding: "20px 40px",
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap", // Ensures items wrap on smaller screens
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, textAlign: "left" }}>
            <p>&copy; 2024 Legalit. All Rights Reserved.</p>
          </div>

          <div style={{ flex: 1, textAlign: "center" }}>
            <a
              href="#privacy"
              style={{
                color: theme.palette.text.secondary,
                marginRight: "15px",
              }}
            >
              Privacy Policy
            </a>
            <a href="#terms" style={{ color: theme.palette.text.secondary }}>
              Terms of Service
            </a>
          </div>

          <div style={{ flex: 1, textAlign: "right" }}>
            <p>Version 1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
