import React, { useState, useEffect, useRef } from "react";
import "./ChatView.css";
import aiProfile from "../../assets/mike-logo.png"; // AI profile image
import userProfile from "../../assets/video-thumbnail.jpg"; // User profile image
import { IoSend } from "react-icons/io5";

const ChatView = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isAITyping]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI typing
    setIsAITyping(true);

    // Adjust the typing delay to simulate fast typing
    const typingDelay = Math.max(500, input.length * 30); // Minimum 500ms

    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: "The concept of time has fascinated humanity for millennia, shaping the way we structure our days, measure progress, and understand our very existence. From the ancient civilizations that devised rudimentary sundials to modern atomic clocks that measure time with staggering precision, our quest to quantify and master time has been relentless. This pursuit is not just a quest for understanding but a necessity woven into the fabric of life itself. Time dictates the rhythms of nature, influencing the cycles of day and night, the changing seasons, and even the biological clocks that tick away within our cells. It governs human behavior, prompting the development of schedules, routines, and deadlines that have come to define modern society. The concept of time management has evolved from being a mere guideline to a life skill, essential for productivity and success in today’s fast-paced world. This emphasis on time is reflected in the ubiquitous presence of clocks in our homes, workplaces, and even our pockets, embedded in the smartphones we carry everywhere. Yet, despite all our advancements in measuring and organizing time, it remains an elusive and often subjective phenomenon. A minute can feel like an eternity when waiting for life-changing news, while entire hours can vanish in an instant during moments of intense focus or joy. Philosophers, physicists, and poets alike have pondered time’s mysteries, debating whether it is an immutable constant that flows independently of human perception or a construct that bends and flexes with the observer’s experience. Einstein’s theory of relativity introduced the radical idea that time is not uniform and can be affected by speed and gravity, challenging the long-held belief in its constancy. This insight has profound implications for our understanding of the universe and has inspired new lines of inquiry into the very nature of reality. Despite these complex and mind-bending theories, for most people, time remains a practical concern: waking up in time for work, meeting deadlines, and making time for family and leisure. The passage of time can bring with it both growth and decay, hope and nostalgia, reminding us of our mortality and the fleeting nature of life’s moments. As we continue to measure and compartmentalize time, the philosophical questions linger: Are we masters of time, or are we merely prisoners to its relentless, unstoppable march? In the end, the importance of time transcends its scientific and practical dimensions, touching on deeper truths about what it means to live, to grow, and to make the most of the moments we have. you for your message!",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsAITyping(false);
    }, typingDelay);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-view-container">
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            {msg.sender === "ai" && (
              <>
                <img
                  src={aiProfile}
                  alt="AI profile"
                  className="profile-image"
                />
                <div className={`message-bubble ${msg.sender}`}>
                  <div className="message-text">{msg.text}</div>
                </div>
              </>
            )}
            {msg.sender === "user" && (
              <>
                <div className={`message-bubble ${msg.sender}`}>
                  <div className="message-text">{msg.text}</div>
                </div>
                <img
                  src={userProfile}
                  alt="User profile"
                  className="profile-image"
                />
              </>
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isAITyping && (
          <div className="message-row ai">
            <img src={aiProfile} alt="AI profile" className="profile-image" />
            <div className="message-bubble ai typing">
              <div className="typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-box">
        <input
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        {input.trim() && (
          <div className="send-button" onClick={handleSend}>
            <IoSend color="dodgerblue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;
