import React, { useState } from "react";
import { FaFileAlt, FaDownload, FaShareAlt, FaRobot } from "react-icons/fa";
import "./ChatBox.css";
import { CiChat1, CiFolderOn } from "react-icons/ci";
import { BiAnalyse } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import FileUploadModal from "./FileUploadModal";
import Notification from "./Notification";

const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

const ChatBox = ({ user, documents, activeDocument }) => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const userName = user?.firstname || "User";
  const files = documents || [];
  const chats = user?.chats || [];

  const handleNewChat = () => {
    navigate("/chats");
  };

  const handleNewFolder = () => {
    setNotification({
      type: "info",
      message: "Folder creation feature coming soon!",
      duration: 3000,
    });
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      setNotification({
        type: "warning",
        message: "Please upload documents first before analyzing.",
        duration: 3000,
      });
      return;
    }

    const unanalyzedDocs = files.filter((doc) => !doc.analyzed);
    if (unanalyzedDocs.length === 0) {
      setNotification({
        type: "info",
        message: "All documents have been analyzed!",
        duration: 3000,
      });
      return;
    }

    // TODO: Implement analysis logic here
    setNotification({
      type: "success",
      message: `Found ${unanalyzedDocs.length} documents to analyze.`,
      duration: 3000,
    });
  };

  const handleImport = () => {
    setShowUploadModal(true);
  };

  // Find chat associated with active document
  const activeChat = activeDocument
    ? chats.find((chat) => chat.document === activeDocument._id)
    : null;

  return (
    <div className="chatbox-container">
      <div className="chatbox-top">
        {activeDocument ? (
          // Display active document
          <div className="document-card">
            <div className="document-info">
              <FaFileAlt className="file-icon" />
              <p className="file-name">
                {activeDocument.name || "Untitled Document"}
              </p>
              <p className="file-size">
                Size: {activeDocument.size || "Unknown"}
              </p>
            </div>
            <div className="action-buttons">
              <NavLink to="/chats">
                <button className="action-btn">
                  <FaRobot />
                </button>
              </NavLink>
              <button className="action-btn">
                <FaDownload />
              </button>
              <button className="action-btn">
                <FaShareAlt />
              </button>
            </div>
          </div>
        ) : files?.length ? (
          // Display the first document if no active document
          <div className="document-card">
            <div className="document-info">
              <FaFileAlt className="file-icon" />
              <p className="file-name">
                {files[0].name || "Legal_Document.pdf"}
              </p>
              <p className="file-size">Size: {files[0].size || "1.2 MB"}</p>
            </div>
            <div className="action-buttons">
              <button className="action-btn">
                <FaRobot />
              </button>
              <button className="action-btn">
                <FaDownload />
              </button>
              <button className="action-btn">
                <FaShareAlt />
              </button>
            </div>
          </div>
        ) : (
          <div className="widget-container" style={{ flexDirection: "column" }}>
            <h4 style={{ fontSize: "1.5rem" }}>Welcome {userName}!</h4>
            <p
              style={{
                margin: 0,
                paddingTop: 0,
                textAlign: "left",
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              Please upload a document to start chatting
            </p>
            <div className="widget one" onClick={handleNewChat}>
              <div className="icon-container icon-1">
                <CiChat1 />
              </div>
              <div className="text-container">
                <h4>New chat</h4>
                <p>Ask general questions</p>
              </div>
            </div>
            <div className="widget two" onClick={handleNewFolder}>
              <div className="icon-container icon-2">
                <CiFolderOn />
              </div>
              <div className="text-container">
                <h4>New Folder</h4>
                <p>Create a new repository</p>
              </div>
            </div>
            <div className="widget three" onClick={handleAnalyze}>
              <div className="icon-container icon-3">
                <BiAnalyse />
              </div>
              <div className="text-container">
                <h4>New analysis</h4>
                <p>Analyze a document</p>
              </div>
            </div>
            <div className="widget four" onClick={handleImport}>
              <div className="icon-container icon-4">
                <CiImport />
              </div>
              <div className="text-container">
                <h4>Import</h4>
                <p>Bring in your pdf file</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="divider">
        <div className="divider-line"></div>
        <p className="divider-text">Chat History</p>
        <div className="divider-line"></div>
      </div>

      {activeDocument ? (
        activeChat ? (
          // Show messages for active document's chat
          <div className="chatbox-chat-container">
            {activeChat.messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === "ai" ? "ai-message" : "user-message"
                }`}
              >
                <div className="message-icon">
                  {message.sender === "ai" ? (
                    <img
                      src="https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGFpfGVufDB8fDB8fHww"
                      alt="AI Profile"
                      className="user-img"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1717719405891-c60737ef4082?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxncmFkaWVudCUyMHNreXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="User Profile"
                      className="user-img"
                    />
                  )}
                </div>
                <div
                  className={`message ${
                    message.sender === "ai" ? "ai-chat" : "user-chat"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show prompt to start chat for this document
          <div className="no-chats" style={{ flex: 1 }}>
            <p
              style={{
                paddingBottom: 10,
                paddingTop: 10,
                fontWeight: "500",
                fontSize: "0.8rem",
              }}
            >
              No chat found for this document.
            </p>
            <NavLink to="/chats" className="navigation-button">
              Start New Chat
            </NavLink>
          </div>
        )
      ) : chats.length > 0 ? (
        // Show preview of first chat when no document is active
        <div className="chat-preview">
          <div className="chat-preview-content">
            <div className="truncated-message">
              {(() => {
                const cleanContent = stripHtmlTags(
                  chats[0]?.lastMessage?.content
                );
                return cleanContent?.length > 100
                  ? `${cleanContent.substring(0, 100)}...`
                  : cleanContent;
              })()}
            </div>
            <div className="options-container">
              <div className="options-icon">⋮</div>
              <div className="options-dropdown">
                <NavLink to="/chats" className="option-item">
                  Go to Chat
                </NavLink>
                <button className="option-item delete-option">
                  Delete Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Show default no chats message
        <div className="no-chats" style={{ flex: 1 }}>
          <p style={{ padding: "20px", fontWeight: "500", fontSize: "0.8rem" }}>
            No chats yet. Start a new conversation with our AI assistant!
          </p>
          <div className="navigation-button">Start Chat</div>
        </div>
      )}

      <NavLink to="/chats" className="navigation-button">
        Go to chats
      </NavLink>

      {showUploadModal && (
        <FileUploadModal closeModal={() => setShowUploadModal(false)} />
      )}

      {notification && (
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default ChatBox;
