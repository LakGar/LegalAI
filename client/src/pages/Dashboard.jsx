import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import DashComponent from "../components/Dashboard/DashComponent";
import "./Dashboard.css"; // Create this CSS file for animation styles
import { getUserDetails } from "../redux/actions/userAction";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Access user state from Redux
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { user, error } = userState;

  // Fetch user details on component mount
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  // Simulate loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Safely access user data
  console.log(user);
  // Show loader
  if (loading) {
    return (
      <div className="loader-container">
        <div className="background">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Background Animation */}
      <div className="background">
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Side Navigation */}
      <div className="sidenav">
        <Sidenav />
      </div>

      {/* Dashboard Component */}
      <div className="dashboard-content">
        <DashComponent user={user?.data} />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <ChatBox user={user?.data} />
      </div>
    </div>
  );
};

export default Dashboard;
