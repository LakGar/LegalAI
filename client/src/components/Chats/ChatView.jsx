import React, { useState } from "react";
import "./ChatView.css";
import aiProfile from "../../assets/mike-logo.png"; // AI profile image
import userProfile from "../../assets/video-thumbnail.jpg"; // User profile image
import { IoSend } from "react-icons/io5";
import { LuContainer } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";

const ChatView = () => {
  const [isNewChat, setIsNewChat] = useState(true);
  const [newMessage, setNewMessage] = useState(""); // Current message being typed
  const [messages, setMessages] = useState([]); // Array to store all messages

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Do nothing if the input is empty

    // Add new message to messages array
    setMessages((prev) => [
      ...prev,
      { sender: "user", content: newMessage, timestamp: Date.now() },
    ]);
    setNewMessage(""); // Clear the input
    setIsNewChat(false); // Transition from "new chat" to chat area
  };

  const handleNewchat = () => {
    setIsNewChat(true);
    setNewMessage("");
    setMessages([]);
  };

  return (
    <div className="chat-view-container">
      <div className={`new-chat-container ${!isNewChat ? "active" : ""}`}>
        {isNewChat && (
          <>
            <div className="new-chat-greetings">
              <span>
                Hi there, Lakshay <br /> What would you like to know?
              </span>
              <p>
                Use one of the most common prompts
                <br /> below or use your own to begin
              </p>
            </div>
            <div className="new-chat-prompts">
              <div className="new-chat-prompt">
                <p>What's the most popular law in the US?</p>
                <LuContainer />
              </div>
              <div className="new-chat-prompt">
                <p>What's the best way to protect my client's privacy?</p>
                <LuContainer />
              </div>
              <div className="new-chat-prompt">
                <p>What are some common mistakes to avoid in a contract?</p>
                <LuContainer />
              </div>
              <div className="new-chat-prompt">
                <p>What's the best way to handle a dispute with my client?</p>
                <LuContainer />
              </div>
            </div>
          </>
        )}

        {/* Chat area */}
        {!isNewChat && (
          <div className="chat-area">
            <div className="chat-header">
              <p className="chat-name">Untitled chat ✏️</p>
              <p className="new-chat-button" onClick={handleNewchat}>
                New Chat
              </p>
            </div>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.content}
              </div>
            ))}
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ai`}>
                {msg.content}
              </div>
            ))}
          </div>
        )}

        {/* Chat input */}
        <div
          className={`new-chat-chat-box-container  ${
            !isNewChat ? "active-chat-box" : ""
          }`}
        >
          {!isNewChat && (
            <div className="new-chat-line-one">
              <textarea
                type="text"
                placeholder="Type your message here..."
                className="new-chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <div className="send-button-container">
                <p className="character-count">{newMessage.length}/1000</p>
                <button className="send-button" onClick={handleSendMessage}>
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <IoSend size={14} />
                    </div>
                  </div>
                  <p>Send</p>
                </button>
              </div>
            </div>
          )}
          {isNewChat && (
            <>
              <div className="new-chat-line-one">
                <textarea
                  type="text"
                  placeholder="Type your message here..."
                  className="new-chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="new-chat-line-two">
                <div className="attach-document-button">
                  <IoMdAddCircleOutline />
                  <p>Attach Document</p>
                </div>
                <div className="send-button-container">
                  <p className="character-count">{newMessage.length}/1000</p>
                  <button className="send-button" onClick={handleSendMessage}>
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <IoSend size={14} />
                      </div>
                    </div>
                    <p>Send</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
