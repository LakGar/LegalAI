import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import { useTheme } from "@mui/material";
import QuickAccess from "../components/QuickAccess";
import TopNav from "../components/Topnav";
import FolderList from "../components/FolderList";

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
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sidebar with dynamic width based on open/collapsed state */}
      <div style={{ width: isSidenavOpen ? "300px" : "80px" }}>
        <div className="sidnav">
          <Sidenav onToggleNav={handleToggleNav} />
        </div>
      </div>

      {/* Main content area adjusts based on sidenav width */}
      <div style={{ flex: 1 }}>
        <TopNav />
        <div
          style={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease", // Smooth transition for layout adjustment
            marginLeft: isSidenavOpen ? "20px" : "20px",
          }}
          className="main-content"
        >
          <QuickAccess />
          <FolderList />
          <div className="recent-files">recent files</div>
          <div className="recent-analysis">recent analysis</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
