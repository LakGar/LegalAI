import React from "react";
import "../Dashboard/DashComponent.css";
import Topnav from "../Dashboard/Topnav";
import ChatView from "./ChatView";

const ChatComponent = ({ user, documents, chats }) => {
  return (
    <div className="dash-component-container ">
      <Topnav user={user} />
      <div className="dash-component " style={{ paddingRight: "0px" }}>
        <ChatView chats={chats} documents={documents} user={user} />
      </div>
    </div>
  );
};

export default ChatComponent;
