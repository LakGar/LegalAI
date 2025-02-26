import React from "react";
import "../Dashboard/DashComponent.css";
import Topnav from "../Dashboard/Topnav";
import ChatView from "./ChatView";
import { useLocation } from "react-router-dom";

const ChatComponent = ({ documents, user, chats }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentId = queryParams.get("documentId");
  const chatId = queryParams.get("chatId");
  const initialDocument = documentId
    ? documents.find((doc) => doc._id === documentId)
    : null;

  const initialChat = chatId ? chats.find((chat) => chat._id === chatId) : null;

  return (
    <div className="dash-component-container ">
      <Topnav user={user} documents={documents} />
      <div className="dash-component " style={{ paddingRight: "0px" }}>
        <ChatView
          documents={documents}
          user={user}
          initialDocument={initialDocument}
          initialChat={initialChat}
          chats={chats.data}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
