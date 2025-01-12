import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import "./Dashboard.css"; // Create this CSS file for animation styles
import PreviousChats from "../components/Global/PreviousChats";
import ChatComponent from "../components/Chats/ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";

const Chat = () => {
  const [loading, setLoading] = useState(true);

  // Access Redux states
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const documentState = useSelector((state) => state.documents);
  const activeDocument = useSelector((state) => state.documents.activeDocument);
  const chatState = useSelector((state) => state.chats);

  const { user, error: userError } = userState;
  const { documents = [], loading: documentsLoading } = documentState;
  // const { chats = [] } = chatState;

  console.log("User:", user);
  console.log("Documents:", documents);
  // console.log("Chats:", chats);

  // Fetch user details and documents on mount
  useEffect(() => {
    dispatch(getUserDetails());

    // Fetch documents only if the state is empty
    // if (documents.length === 0) {
    //   dispatch(getDocuments());
    // }
  }, [dispatch, documents.length]);

  // Use useEffect to trigger the loader for 2 seconds
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
      <div class="background">
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
        <ChatComponent documents={documents} user={user?.data} />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <PreviousChats />
      </div>
    </div>
  );
};

export default Chat;
