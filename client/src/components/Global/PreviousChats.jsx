import React, { useState } from "react";
import {
  FaFileAlt,
  FaShareAlt,
  FaRobot,
  FaExchangeAlt,
  FaEllipsisV,
} from "react-icons/fa";
import "./PreviousChats.css";

const PreviousChats = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeOptionsModal, setActiveOptionsModal] = useState(null);

  const handleSwapClick = () => {
    setModalOpen(true);
  };

  const handleOptionsClick = (index) => {
    setActiveOptionsModal(activeOptionsModal === index ? null : index);
  };

  const previousChats = [
    { sender: "User", text: "Can you give me a summary of the main points?" },
    { sender: "User", text: "What are the key terms and obligations?" },
    {
      sender: "User",
      text: "Are there any hidden clauses I should know about?",
    },
    { sender: "User", text: "Can you highlight potential risks?" },
  ];

  return (
    <div className="previous-chats-container">
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
            <FaExchangeAlt />
          </button>
          <button className="action-btn">
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="dividers">
        <div className="divider-lines"></div>
        <p className="divider-text"> Chats</p>
        <div className="divider-lines"></div>
      </div>

      <div className="previous-chats-list">
        {previousChats.map((chat, index) => (
          <div key={index} className="previous-chat">
            <p className="chat-preview">
              {chat.text.length > 50
                ? chat.text.substring(0, 50) + "..."
                : chat.text}
            </p>
            <button
              className="options-btn"
              onClick={() => handleOptionsClick(index)}
            >
              <FaEllipsisV />
            </button>
            {activeOptionsModal === index && (
              <div className="options-modal">
                <ul>
                  <li>Share</li>
                  <li>Open</li>
                  <li>Delete</li>
                  <li>Rename</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="newchat-button">
        <button className="swap-btn" onClick={handleSwapClick}>
          Swap Document
        </button>
        <button className="add-new-btn" onClick={() => setModalOpen(true)}>
          Add New Document
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Choose Another Document</h2>
            {/* Placeholder for document list */}
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousChats;
