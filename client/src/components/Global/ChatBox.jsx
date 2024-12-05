import React from "react";
import { FaFileAlt, FaDownload, FaShareAlt, FaRobot } from "react-icons/fa";
import "./ChatBox.css";
import { CiChat1, CiFolderOn } from "react-icons/ci";
import { BiAnalyse } from "react-icons/bi";
import { CiImport } from "react-icons/ci";

const ChatBox = ({ user }) => {
  const userName = user?.firstname || "User";
  const files = user?.files || [];
  const chats = user?.chats || [];
  const chatMessages = chats;

  return (
    <div className="chatbox-container">
      <div className="chatbox-top">
        {files?.length ? (
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
            <div className="widget one">
              <div className="icon-container icon-1">
                <CiChat1 />
              </div>
              <div className="text-container">
                <h4>New chat</h4>

                <p>Ask general questions</p>
              </div>
            </div>
            <div className="widget two">
              <div className="icon-container icon-2">
                <CiFolderOn />
              </div>
              <div className="text-container">
                <h4>New Folder</h4>
                <p>Create a new repository</p>
              </div>
            </div>
            <div className="widget three ">
              <div className="icon-container icon-3">
                <BiAnalyse />
              </div>
              <div className="text-container">
                <h4>New analysis</h4>
                <p>Analyze a document</p>
              </div>
            </div>
            <div className="widget four">
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

      {chatMessages.length ? (
        <div className="chatbox-chat-container">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "AI" ? "ai-message" : "user-message"
              }`}
            >
              <div className="message-icon">
                {message.sender === "AI" ? (
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
                  message.sender === "AI" ? "ai-chat" : "user-chat"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-chats" style={{ flex: 1 }}>
          <p style={{ padding: "20px", fontWeight: "500", fontSize: "0.8rem" }}>
            No chats yet. Start a new conversation with our AI assistant!
          </p>
          <div className="navigation-button">Start Chat</div>
        </div>
      )}

      <div className="navigation-button">Go to chats</div>
    </div>
  );
};

export default ChatBox;
