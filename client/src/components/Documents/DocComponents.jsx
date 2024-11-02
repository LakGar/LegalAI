import React from "react";
import "../Dashboard/DashComponent.css";
import Topnav from "../Dashboard/Topnav";
import PaginatedFileList from "./PaginatedFileList";

const DocComponent = () => {
  return (
    <div className="dash-component-container ">
      <Topnav />
      <div className="dash-component ">
        <PaginatedFileList />
      </div>
    </div>
  );
};

export default DocComponent;
