import React, { useState } from "react";
import {
  FaFileAlt,
  FaShareAlt,
  FaRobot,
  FaExchangeAlt,
  FaEllipsisV,
} from "react-icons/fa";
import "./PreviousChats.css";
import { useDispatch } from "react-redux";

const PreviousChats = ({
  chats = [],
  activeDocument,
  documents,
  openSwitchDocumentModal,
}) => {
  const [activeOptionsModal, setActiveOptionsModal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const files = documents || [];
  const dispatch = useDispatch(); // Initialize the Redux dispatch

  const handleOptionsClick = (index) => {
    setActiveOptionsModal(activeOptionsModal === index ? null : index);
  };

  const handlePopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupOpen(false), 2000);
  };

  return (
    <div className="previous-chats-container">
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
              <button className="action-btn">
                <FaRobot />
              </button>
              <button className="action-btn" onClick={openSwitchDocumentModal}>
                <FaExchangeAlt />
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
              <button className="action-btn" onClick={openSwitchDocumentModal}>
                <FaExchangeAlt />
              </button>
              <button className="action-btn">
                <FaShareAlt />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="dividers">
        <div className="divider-lines"></div>
        <p className="divider-text">Chats</p>
        <div className="divider-lines"></div>
      </div>

      {Array.isArray(chats) && chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index} className="previous-chat">
            <p className="chat-preview">
              {chat.lastMessage?.content.length > 50
                ? chat.lastMessage.content.substring(0, 50) + "..."
                : chat.lastMessage?.content || "No messages yet"}
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
                  <li onClick={() => handlePopup("Opening chat...")}>Open</li>
                  <li
                    className="delete-option"
                    onClick={() => handlePopup("Deleting chat...")}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="no-chats-message">
          <p>No chats available. Create a new chat to get started!</p>
        </div>
      )}

      {/* Popup for options */}
      {isPopupOpen && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default PreviousChats;
