import React, { useState, useEffect } from "react";
import { FaFileAlt, FaDownload, FaShareAlt, FaRobot } from "react-icons/fa";
import DOMPurify from "dompurify";
import "./ChatBox.css";
import { CiChat1, CiFolderOn } from "react-icons/ci";
import { BiAnalyse } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import FileUploadModal from "./FileUploadModal";
import Notification from "./Notification";
import { setActiveDocument } from "../../redux/actions/documentAction";
import { useDispatch } from "react-redux";

const ChatBox = ({ user, documents, activeDocument }) => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  // Set first document as activeDocument if no document is active and documents exist
  useEffect(() => {
    if (!activeDocument && documents && documents.length > 0) {
      dispatch(setActiveDocument(documents[0]));
    }
  }, [activeDocument, documents, dispatch]);

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

  const handleChatClick = (document) => {
    navigate(`/chats?documentId=${document._id}`);
  };

  const handleImport = () => {
    setShowUploadModal(true);
  };

  // Find chat associated with active document
  const activeChat = activeDocument
    ? chats.find((chat) => chat.document === activeDocument._id)
    : null;

  const sanitizeHtml = (html) => {
    return {
      __html: DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "div",
          "h1",
          "h2",
          "h3",
          "h4",
          "p",
          "span",
          "strong",
          "em",
          "u",
          "ul",
          "ol",
          "li",
          "br",
        ],
        ALLOWED_ATTR: ["class", "style"],
      }),
    };
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-top">
        {activeDocument ? (
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
              <button
                className="action-btn"
                onClick={() => handleChatClick(activeDocument)}
              >
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
                <div
                  className={`message ${
                    message.sender === "ai" ? "ai-chat" : "user-chat"
                  }`}
                >
                  {message.sender === "ai" ? (
                    <div
                      dangerouslySetInnerHTML={sanitizeHtml(message.content)}
                    />
                  ) : (
                    message.content
                  )}
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
                const cleanContent = DOMPurify.sanitize(
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
          <div className="navigation-button" onClick={handleNewChat}>
            Start Chat
          </div>
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
