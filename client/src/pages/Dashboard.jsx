import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import DashComponent from "../components/Dashboard/DashComponent";
import "./Dashboard.css"; // Create this CSS file for animation styles
import { getUserDetails } from "../redux/actions/userAction";
import { getDocuments } from "../redux/actions/documentAction";

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
      <div className="loader-container">
        <div className="background">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loader1"></div>
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
        {documents.length > 0 ? (
          <DashComponent documents={documents} user={user?.data} />
        ) : (
          <p className="no-documents-message">No documents available.</p>
        )}
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
