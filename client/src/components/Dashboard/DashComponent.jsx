import React from "react";
import "./DashComponent.css";
import Greeting from "./Greeting";
import Topnav from "./Topnav";
import Widgets from "./Widgets";
import FileList from "./FileList";
import RecentFiles from "./RecentFiles";

const DashComponent = () => {
  return (
    <div className="dash-component-container ">
      <Topnav />
      <div className="dash-component ">
        <Greeting name="Lakshay" />
        <Widgets />
        <RecentFiles />
        <FileList />
      </div>
    </div>
  );
};

export default DashComponent;
