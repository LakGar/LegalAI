import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import DashComponent from "../components/Dashboard/DashComponent";
import "./Dashboard.css"; // Create this CSS file for animation styles

const Dashboard = () => {
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
        <DashComponent />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <ChatBox />
      </div>
    </div>
  );
};

export default Dashboard;
