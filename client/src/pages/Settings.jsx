import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import "./Dashboard.css"; // Create this CSS file for animation styles
import DocComponent from "../components/Documents/DocComponents";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  // Use useEffect to trigger the loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Background Animation */}
      <div className="background"></div>

      {/* Side Navigation */}
      <div className="sidenav">
        <Sidenav />
      </div>

      {/* Dashboard Component */}
      <div className="dashboard-content">
        <DocComponent />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <ChatBox />
      </div>
    </div>
  );
};

export default Settings;
