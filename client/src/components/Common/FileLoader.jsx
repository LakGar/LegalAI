import React from "react";
import "./FileLoader.css";
import logo from "../../assets/logo.png";
const FileLoader = () => {
  return (
    <div className="file-loader">
      <div className="file-loader-box">
        <div className="file-loader-logo">
          <img src={logo} alt="logo" className="file-loader-logo-img" />
        </div>
      </div>
      <div className="file-loader-box"></div>
      <div className="file-loader-box"></div>
      <div className="file-loader-box"></div>
      <div className="file-loader-box"></div>
    </div>
  );
};

export default FileLoader;
