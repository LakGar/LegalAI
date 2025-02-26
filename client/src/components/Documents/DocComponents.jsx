import React from "react";
import "../Dashboard/DashComponent.css";
import Topnav from "../Dashboard/Topnav";
import PaginatedFileList from "./PaginatedFileList";

const DocComponent = ({ user, documents }) => {
  return (
    <div className="dash-component-container ">
      <Topnav user={user} documents={documents} />
      <div className="dash-component ">
        <PaginatedFileList documents={documents} user={user} />
      </div>
    </div>
  );
};

export default DocComponent;
