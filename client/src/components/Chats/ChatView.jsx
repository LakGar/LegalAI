import React, { useState, useEffect, useRef } from "react";
import "./ChatView.css";
import { IoSend, IoChevronDown } from "react-icons/io5";
import { LuContainer } from "react-icons/lu";
import { IoMdAddCircleOutline, IoMdTrash } from "react-icons/io";
import SwitchDocument from "../Global/SwitchDocument";
import { useDispatch, useSelector } from "react-redux";
import { createChat, sendMessage } from "../../redux/actions/chatActions";
import DOMPurify from "dompurify";
import RatingFeedback from "../Feedback/RatingFeedback";

const generatePastelColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 85%)`;
};

const ChatView = ({ documents, user }) => {
  const [isNewChat, setIsNewChat] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSwitchDocModalOpen, setIsSwitchDocModalOpen] = useState(false);
  const [attachedDocument, setAttachedDocument] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  // Tracks whether the user is at the bottom of the message list:
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const dispatch = useDispatch();

  // Ref for the messages container for auto-scroll.
  const messagesContainerRef = useRef(null);

  // --- Auto-scroll Feature ---
  // Runs after chatMessages change. Auto-scroll only if the user is at the bottom.
  useEffect(() => {
    if (messagesContainerRef.current && isUserAtBottom) {
      // The slight delay ensures the container layout has updated.
      setTimeout(() => {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }, 50);
    }
  }, [chatMessages, isUserAtBottom]);
  // --- End Auto-scroll ---

  // Listen to scroll events on the messages container to determine if the user is at the bottom.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const atBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50;
      setIsUserAtBottom(atBottom);
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll-to-bottom function used by the button
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() !== "" && !isAiResponding) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isAiResponding) return;
    try {
      let chatId = activeChatId;
      setIsAiResponding(true);
      if (!chatId) {
        const data = await dispatch(createChat(attachedDocument?._id));
        chatId = data?._id;
        if (!chatId) throw new Error("Chat creation failed.");
        setActiveChatId(chatId);
      }
      // Add user message immediately
      setChatMessages((prev) => [
        ...prev,
        { sender: "user", content: newMessage },
      ]);
      setNewMessage("");
      setIsNewChat(false);
      // Add temporary loading message for AI
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", content: "", isLoading: true },
      ]);
      const messageResponse = await dispatch(sendMessage(chatId, newMessage));
      // Update the loading message with the AI response
      setChatMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.isLoading) {
            return {
              sender: "ai",
              content: messageResponse.aiMessage?.content || "",
              isLoading: false,
            };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Error handling can be added here later.
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleNewChat = () => {
    setIsNewChat(true);
    setNewMessage("");
    setAttachedDocument(null);
    setActiveChatId(null);
    setChatMessages([]);
  };

  const handleDocumentSelect = (document) => {
    setAttachedDocument(document);
    setIsSwitchDocModalOpen(false);
  };

  const handleRemoveDocument = () => {
    setAttachedDocument(null);
  };

  const sanitizeAndRenderHTML = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
  };

  return (
    <div className="chat-view-container">
      <div className={`new-chat-container ${!isNewChat ? "active" : ""}`}>
        {isNewChat ? (
          <>
            <div className="new-chat-greetings">
              <span>
                Hi there, {user?.firstname || "User"} <br /> What would you like
                to know?
              </span>
              <p>
                Use one of the most common prompts below or use your own to
                begin
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
        ) : (
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
            <div
              className="messages-container"
              ref={messagesContainerRef}
              style={{ position: "relative", height: "630px" }}
            >
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message-container ${
                      msg.sender === "ai" ? "ai-message" : "user-message"
                    }`}
                  >
                    {msg.sender === "ai" ? (
                      <>
                        <div className="ai-profile-image">
                          <svg
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 2L34 12V24L18 34L2 24V12L18 2Z"
                              fill="#4A90E2"
                            />
                            <path
                              d="M18 10L26 15V25L18 30L10 25V15L18 10Z"
                              fill="#FFFFFF"
                            />
                            <circle cx="18" cy="20" r="4" fill="#4A90E2" />
                          </svg>
                        </div>
                        <div className="ai-message-wrapper">
                          {msg.isLoading ? (
                            <div className="typing-indicator">
                              <span className="typing-text">Thinking</span>
                              <div className="typing-dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="chat-message ai">
                              {sanitizeAndRenderHTML(msg.content)}
                            </div>
                          )}
                          {!msg.isLoading && (
                            <div className="feedback-container">
                              <RatingFeedback />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="user-message-wrapper">
                        <div className="chat-message user">{msg.content}</div>
                        <div
                          className="user-profile-image user-initial"
                          style={{
                            backgroundColor: generatePastelColor(
                              user?.firstname || "U"
                            ),
                          }}
                        >
                          {(user?.firstname?.[0] || "U").toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Render the scroll-to-bottom button if the user is not at the bottom */}
              {!isUserAtBottom && (
                <div className="scroll-to-bottom" onClick={scrollToBottom}>
                  <IoChevronDown size={20} />
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`new-chat-chat-box-container ${
            !isNewChat ? "active-chat-box" : ""
          }`}
        >
          <div className="new-chat-line-one">
            <textarea
              placeholder="Type your message here..."
              className="new-chat-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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
