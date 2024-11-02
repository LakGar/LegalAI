import React from "react";
import "../Dashboard/DashComponent.css";
import Topnav from "../Dashboard/Topnav";
import ChatView from "./ChatView";

const ChatComponent = () => {
  return (
    <div className="dash-component-container ">
      <Topnav />
      <div className="dash-component " style={{ paddingRight: "0px" }}>
        <ChatView />
      </div>
    </div>
  );
};

export default ChatComponent;
