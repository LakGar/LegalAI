import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import "./Dashboard.css"; // Create this CSS file for animation styles
// import PreviousChats from "../components/Global/PreviousChats";
import ChatComponent from "../components/Chats/ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userAction";
import {
  getDocuments,
  setActiveDocument,
} from "../redux/actions/documentAction";
import { listChats } from "../redux/actions/chatActions";
import SwitchDocument from "../components/Global/SwitchDocument";
const Chat = () => {
  const [loading, setLoading] = useState(true);

  // Access Redux states
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const documentState = useSelector((state) => state.documents);
  const chatState = useSelector((state) => state.chatList);

  const { user } = userState;
  const { documents = [], loading: documentsLoading } = documentState;
  const { chats = [], loading: chatsLoading } = chatState;
  const [isSwitchDocModal, setIsSwitchDocModal] = useState(false);

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

  const handleSetActiveDocument = (document) => {
    // Dispatch the action to update the active document in Redux state
    dispatch(setActiveDocument(document));
  };

  const openSwitchDocumentModal = () => {
    setIsSwitchDocModal(true);
  };
  const closeSwitchDocumentModal = () => {
    setIsSwitchDocModal(false);
  };

  // Show loader if still loading
  if (loading || documentsLoading || chatsLoading) {
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
        <ChatComponent documents={documents} user={user?.data} chats={chats} />
      </div>

      {/* Chat Box */}
      {/* <div className="chatbox">
        <PreviousChats
          chats={chats}
          activeDocument={activeDocument}
          documents={documents}
          openSwitchDocumentModal={openSwitchDocumentModal}
        />
      </div> */}
      {/* Switch document modal */}
      {isSwitchDocModal && (
        <SwitchDocument
          documents={documents}
          setActiveDocument={handleSetActiveDocument} // Pass the handler here
          closeModal={closeSwitchDocumentModal}
        />
      )}
    </div>
  );
};

export default Chat;
