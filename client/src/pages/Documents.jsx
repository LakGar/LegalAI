import React, { useEffect, useState } from "react";
import Sidenav from "../components/Global/Sidenav";
import ChatBox from "../components/Global/ChatBox";
import "./Dashboard.css"; // Create this CSS file for animation styles
import DocComponent from "../components/Documents/DocComponents";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";
import { getDocuments } from "../redux/actions/documentAction";

const Documents = () => {
  const [loading, setLoading] = useState(true);

  // Access Redux states
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const documentState = useSelector((state) => state.documents);

  const { user, error: userError } = userState;
  const { documents = [], loading: documentsLoading } = documentState;
  console.log(documents);
  // Fetch user details and documents
  useEffect(() => {
    dispatch(getUserDetails());

    // Fetch documents only if the documents state is empty
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
        {documents.length > 0 ? (
          <DocComponent documents={documents} user={user?.data} />
        ) : (
          <p className="no-documents-message">No documents available.</p>
        )}
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <ChatBox user={user?.data} />
      </div>
    </div>
  );
};

export default Documents;
