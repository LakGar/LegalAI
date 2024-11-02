import React from "react";
import {
  FaFileAlt,
  FaDownload,
  FaShareAlt,
  FaRobot,
  FaUser,
} from "react-icons/fa";
import "./ChatBox.css";

const ChatBox = () => {
  const chatMessages = [
    {
      sender: "AI",
      text: "This document contains detailed analysis on legal aspects.",
    },
    { sender: "User", text: "Can you give me a summary of the main points?" },
    {
      sender: "AI",
      text: "Sure! The main points include contract terms, obligations, and potential risks.",
    },
    {
      sender: "User",
      text: "Thank you! Can you also check for any red flags?",
    },
    {
      sender: "AI",
      text: "Certainly! I’ll highlight any sections that need attention.",
    },
    {
      sender: "AI",
      text: "This document contains detailed analysis on legal aspects.",
    },
    { sender: "User", text: "Can you give me a summary of the main points?" },
    {
      sender: "AI",
      text: "Sure! The main points include contract terms, obligations, and potential risks.",
    },
    {
      sender: "User",
      text: "Thank you! Can you also check for any red flags?",
    },
    {
      sender: "AI",
      text: "Certainly! I’ll highlight any sections that need attention.",
    },
  ];

  return (
    <div className="chatbox-container">
      <div className="chatbox-top">
        {/* Document Card */}
        <div className="document-card">
          <div className="document-info">
            <FaFileAlt className="file-icon" />
            <p className="file-name">Legal_Document.pdf</p>
            <p className="file-size">Size: 1.2 MB</p>
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
      </div>
      <div className="divider">
        <div className="divider-line"></div>
        <p className="divider-text">Chat History</p>
        <div className="divider-line"></div>
      </div>
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
                  alt="user-profile"
                  className="user-img"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1717719405891-c60737ef4082?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxncmFkaWVudCUyMHNreXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="user-profile"
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
      <div className="navigation-button">Go to chat</div>
    </div>
  );
};

export default ChatBox;
