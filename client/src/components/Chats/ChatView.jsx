import React, { useState } from "react";
import "./ChatView.css";
import { IoSend } from "react-icons/io5";
import { LuContainer } from "react-icons/lu";
import { IoMdAddCircleOutline, IoMdTrash } from "react-icons/io";
import SwitchDocument from "../Global/SwitchDocument";
import { useDispatch, useSelector } from "react-redux";
import { createChat, sendMessage } from "../../redux/actions/chatActions";

const ChatView = ({ documents, user }) => {
  const [isNewChat, setIsNewChat] = useState(true);
  const [newMessage, setNewMessage] = useState(""); // Current message being typed
  const [isSwitchDocModalOpen, setIsSwitchDocModalOpen] = useState(false); // Modal state
  const [attachedDocument, setAttachedDocument] = useState(null); // Attached document
  const [activeChatId, setActiveChatId] = useState(null); // Track active chat ID
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Do nothing if the input is empty

    try {
      let chatId = activeChatId;

      // Create a new chat if no active chat exists
      if (!chatId) {
        const response = await dispatch(createChat(attachedDocument?._id));
        chatId = response?.data?.data?._id;
        console.log(response.data);

        if (!chatId) {
          throw new Error("Chat creation failed.");
        }

        setActiveChatId(chatId); // Update the active chat ID
      }

      // Send the message
      await dispatch(sendMessage(chatId, newMessage));

      // Clear the input and update the chat view
      setNewMessage(""); // Clear the input
      setIsNewChat(false); // Transition from "new chat" to chat area
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleNewChat = () => {
    setIsNewChat(true);
    setNewMessage("");
    setAttachedDocument(null); // Clear the attached document
    setActiveChatId(null); // Reset active chat ID
  };

  const handleDocumentSelect = (document) => {
    setAttachedDocument(document); // Set the selected document
    setIsSwitchDocModalOpen(false); // Close the modal
  };

  const handleRemoveDocument = () => {
    setAttachedDocument(null); // Remove the attached document
  };

  return (
    <div className="chat-view-container">
      <div className={`new-chat-container ${!isNewChat ? "active" : ""}`}>
        {isNewChat && (
          <>
            <div className="new-chat-greetings">
              <span>
                Hi there, {user?.firstname || "User"} <br /> What would you like
                to know?
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
              {!attachedDocument ? (
                <p className="chat-name">General Chat</p>
              ) : (
                <p className="chat-name">{attachedDocument.name} chat</p>
              )}
              <p className="new-chat-button" onClick={handleNewChat}>
                New Chat
              </p>
            </div>
          </div>
        )}

        {/* Chat input */}
        <div
          className={`new-chat-chat-box-container ${
            !isNewChat ? "active-chat-box" : ""
          }`}
        >
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

          {/* Attach Document */}
          {!attachedDocument ? (
            <div className="new-chat-line-two">
              <div
                className="attach-document-button"
                onClick={() => setIsSwitchDocModalOpen(true)}
              >
                <IoMdAddCircleOutline />
                <p>Attach Document</p>
              </div>
            </div>
          ) : (
            <div className="attached-document">
              <p>
                <strong>Attached:</strong> {attachedDocument.name}
              </p>
              <button
                className="remove-document-button"
                onClick={handleRemoveDocument}
              >
                <IoMdTrash size={18} />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Switch Document Modal */}
      {isSwitchDocModalOpen && (
        <SwitchDocument
          documents={documents}
          closeModal={() => setIsSwitchDocModalOpen(false)}
          setActiveDocument={handleDocumentSelect}
        />
      )}
    </div>
  );
};

export default ChatView;
