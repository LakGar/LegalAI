import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import "./Dashboard.css"; // Create this CSS file for animation styles
import PreviousChats from "../components/Global/PreviousChats";
import ChatComponent from "../components/Chats/ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";
import { getDocuments } from "../redux/actions/documentAction";
import { listChats } from "../redux/actions/chatActions";
const Chat = () => {
  const [loading, setLoading] = useState(true);

  // Access Redux states
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const documentState = useSelector((state) => state.documents);
  const chatState = useSelector((state) => state.chatList);

  const { user, error: userError } = userState;
  const { documents = [], loading: documentsLoading } = documentState;
  const { chats = [], loading: chatsLoading, error: chatsError } = chatState;
  const activeDocument = useSelector((state) => state.documents.activeDocument);

  // Fetch user details, documents, and chats on mount
  useEffect(() => {
    dispatch(getUserDetails()); // Fetch user details
    if (documents.length === 0) {
      dispatch(getDocuments()); // Fetch documents if not already loaded
    }
    if (chats.length === 0) {
      dispatch(listChats()); // Fetch chats if not already loaded
    }
  }, [dispatch, documents.length, chats.length]);

  // Use useEffect to trigger the loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Show loader if still loading
  if (loading || documentsLoading || chatsLoading) {
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
        <ChatComponent documents={documents} user={user?.data} chats={chats} />
      </div>

      {/* Chat Box */}
      <div className="chatbox">
        <PreviousChats
          chats={chats}
          activeDocument={activeDocument}
          documents={documents}
        />
        {/* Pass chats to PreviousChats */}
      </div>
    </div>
  );
};

export default Chat;
