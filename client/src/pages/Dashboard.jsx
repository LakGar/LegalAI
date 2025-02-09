import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import DashComponent from "../components/Dashboard/DashComponent";
import "./Dashboard.css"; // Create this CSS file for animation styles
import { getUserDetails } from "../redux/actions/userAction";
import { getDocuments } from "../redux/actions/documentAction";
import Logo from "../assets/logo.png";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Access Redux states
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const documentState = useSelector((state) => state.documents);
  const activeDocument = useSelector((state) => state.documents.activeDocument);

  const { user, error: userError } = userState;
  const { documents = [], loading: documentsLoading } = documentState;
  console.log("User:", user);
  console.log("Documents:", documents);
  // Fetch user details and documents on mount
  useEffect(() => {
    dispatch(getUserDetails());

    // Fetch documents only if the state is empty
    if (documents.length === 0) {
      dispatch(getDocuments());
    }
  }, [dispatch, documents.length]);

  // Simulate loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Show loader if still loading
  if (loading || documentsLoading) {
    return (
      <div className="loader-container" style={{ backgroundColor: "white" }}>
        <div className="logo-container">
          <img
            src="https://cdn.dribbble.com/users/2367833/screenshots/15980259/media/d0f1510468542c69c8902b683430699c.gif"
            alt="background"
            className="footer-logo"
          />
        </div>
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
        <DashComponent documents={documents} user={user?.data} />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <ChatBox
          user={user?.data}
          documents={documents}
          activeDocument={activeDocument}
        />
      </div>
    </div>
  );
};

export default Dashboard;
