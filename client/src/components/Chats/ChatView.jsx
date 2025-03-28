import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ChatView.css";
import { IoSend, IoChevronDown } from "react-icons/io5";
import { LuContainer } from "react-icons/lu";
import { IoMdAddCircleOutline, IoMdTrash } from "react-icons/io";
import SwitchDocument from "../Global/SwitchDocument";
import { useDispatch } from "react-redux";
import { initiateChat, sendMessage } from "../../redux/actions/chatActions";
import DOMPurify from "dompurify";
import RatingFeedback from "../Feedback/RatingFeedback";
import Notification from "../Global/Notification";
import Logo from "../../assets/logo.png";
import { setActiveDocument } from "../../redux/actions/documentAction";

const ChatView = ({ documents = [], user, chats = [] }) => {
  const [isNewChat, setIsNewChat] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSwitchDocModalOpen, setIsSwitchDocModalOpen] = useState(false);
  const [attachedDocument, setAttachedDocument] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);

  const handleDocumentSelect = useCallback(
    async (document) => {
      console.log("Selecting document:", document);
      dispatch(setActiveDocument(document));
      if (!document?._id) return;

      // Check if document has been analyzed
      if (!document.analysisResult) {
        setNotification({
          type: "warning",
          message:
            "This document hasn't been analyzed yet. Please analyze the document first.",
          duration: 3000,
        });
        return;
      }

      setAttachedDocument(document);
      setIsSwitchDocModalOpen(false);

      // Ensure chats is an array before using find
      const chatsArray = Array.isArray(chats) ? chats : [];
      console.log("Chats array:", chatsArray);

      // Find existing chat for this document
      const existingChat = chatsArray.find(
        (chat) => chat?.document?._id === document._id
      );
      console.log("Found existing chat:", existingChat);

      if (existingChat) {
        setActiveChatId(existingChat._id);
        setChatMessages(
          existingChat.messages.map((msg) => ({
            sender: msg.sender,
            content: msg.content,
            type: msg.type || "text",
            status: msg.status || "sent",
            _id: msg._id,
            timestamp: msg.timestamp,
          }))
        );
        setIsNewChat(false);
      } else {
        try {
          const newChatResponse = await dispatch(initiateChat(document._id));
          console.log("New chat created:", newChatResponse);

          if (newChatResponse?.data) {
            setActiveChatId(newChatResponse.data._id);
            setChatMessages([]);
            setIsNewChat(false);
          } else {
            throw new Error("Failed to create new chat");
          }
        } catch (error) {
          console.error("Error creating new chat:", error);
          setNotification({
            type: "error",
            message: "Failed to create chat. Please try again.",
            duration: 3000,
          });
        }
      }
    },
    [chats, dispatch]
  );

  const handleRemoveDocument = useCallback(() => {
    // Then update state
    setAttachedDocument(null);
    setActiveChatId(null);
    setChatMessages([]);
    setIsNewChat(true);
  }, []);

  const handleAttachDocument = () => {
    if (!documents || documents.length === 0) {
      setNotification({
        type: "warning",
        message: "No documents available. Please upload a document first.",
        duration: 3000,
      });
      return;
    }

    setIsSwitchDocModalOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() !== "" && !isAiResponding) {
        handleSendMessage();
      }
    }
  };

  const checkDocumentAnalysis = (document) => {
    if (!document) return true; // No document attached, so proceed

    // Add logging to debug the document state
    console.log("Document analysis status:", {
      documentId: document._id,
      status: document.status,
      hasAnalysisResult: !!document.analysisResult,
      document: document,
    });

    // Check status is 'analyzed' and analysisResult exists
    return document.status === "analyzed" && !!document.analysisResult;
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isAiResponding) return;

    // Check if document is attached
    if (!attachedDocument) {
      setNotification({
        type: "warning",
        message: "Please attach a document before starting a chat.",
        duration: 3000,
      });
      return;
    }

    try {
      let chatId = activeChatId;
      setIsAiResponding(true);

      console.log("Starting message send with chatId:", chatId);

      // Add user message to UI immediately
      const userMessage = {
        sender: "user",
        content: newMessage,
        type: "text",
        status: "sent",
      };

      setChatMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsNewChat(false);

      // Add loading message
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          content: "",
          isLoading: true,
        },
      ]);

      const messageResponse = await dispatch(sendMessage(chatId, newMessage));
      console.log("Message response:", messageResponse);

      if (!messageResponse) {
        throw new Error("No response received from server");
      }

      // Update the loading message with actual response
      setChatMessages((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1 && msg.isLoading) {
            return {
              sender: "ai",
              content:
                messageResponse.aiMessage.content ||
                messageResponse.message ||
                "",
              type: "text",
              status: "sent",
              isLoading: false,
            };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error("Error in chat operation:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      setChatMessages((prev) => prev.filter((msg) => !msg.isLoading));

      setNotification({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsAiResponding(false);
    }
  };

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

  const handleNewChat = () => {
    setIsNewChat(true);
    setNewMessage("");
    setAttachedDocument(null);
    setActiveChatId(null);
    setChatMessages([]);
  };

  const sanitizeAndRenderHTML = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
  };

  // Add CSS for notification link
  const styles = `
    .notification-link {
      margin-left: 8px;
      color: inherit;
      text-decoration: underline;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
    .notification-link:hover {
      opacity: 0.8;
    }
  `;

  // Add a useEffect to log the chat state when it changes
  useEffect(() => {
    if (attachedDocument) {
      console.log("Current chat state:", {
        documentId: attachedDocument._id,
        activeChatId,
        messagesCount: chatMessages.length,
        isNewChat,
      });
    }
  }, [attachedDocument, activeChatId, chatMessages, isNewChat]);

  return (
    <>
      <style>{styles}</style>
      <div className="chat-view-container">
        <div className={`new-chat-container ${!isNewChat ? "active" : ""}`}>
          {isNewChat ? (
            <div>
              <div className="new-chat-greetings">
                <span>
                  Hi there, {user?.firstname || "User"} <br /> What would you
                  like to know?
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
            </div>
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
                          {msg.isLoading ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                width: 40,
                                height: 40,
                                marginRight: "10px",
                              }}
                            >
                              <img
                                src="https://cdn.dribbble.com/users/2367833/screenshots/15980259/media/d0f1510468542c69c8902b683430699c.gif"
                                alt="AI Profile"
                                style={{ width: "120px", height: "100px" }}
                              />
                            </div>
                          ) : (
                            <>
                              <img
                                src={Logo}
                                alt="AI Profile"
                                style={{ width: "40px", height: "40px" }}
                              />
                            </>
                          )}
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
                              <div className="chat-message-main ai">
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
                maxLength={1000}
              />
              <div className="send-button-container">
                <p className="character-count">{newMessage.length}/1000</p>
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={isAiResponding}
                >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <IoSend size={14} />
                    </div>
                  </div>
                  <p>Send</p>
                </button>
              </div>
            </div>

            <div className="document-controls">
              {!attachedDocument ? (
                <div className="new-chat-line-two">
                  <div
                    className="attach-document-button"
                    onClick={handleAttachDocument}
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
        </div>

        {isSwitchDocModalOpen && documents && documents.length > 0 && (
          <SwitchDocument
            documents={documents}
            closeModal={() => setIsSwitchDocModalOpen(false)}
            setActiveDocument={handleDocumentSelect}
            currentDocument={attachedDocument}
          />
        )}
      </div>

      {notification && (
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}
    </>
  );
};

export default ChatView;
