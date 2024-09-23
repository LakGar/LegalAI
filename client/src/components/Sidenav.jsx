import React, { useRef, useEffect } from "react";
import LogoMov from "../assets/logoMov.mp4";
import "../styles/Sidenav.css";

const Sidenav = () => {
  const videoRef = useRef(null);

  // Pause the video at the end and keep it at the last frame
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration; // Set to last frame
    }
  };

  return (
    <div className="sidenav-container">
      <div className="logo-container">
        <video
          ref={videoRef}
          src={LogoMov}
          onEnded={handleVideoEnd}
          autoPlay
          muted
          className="logo-video"
        />
      </div>
      <div className="sidenav-navigation">
        <div className="navigation-container">
          <div className="navigation-link-container">
            <p className="navigation-link">Dashboard</p>
          </div>
          <div className="navigation-link-container">
            <p className="navigation-link">Upload</p>
          </div>
          <div className="navigation-link-container">
            <p className="navigation-link">Documents</p>
          </div>
          <div className="navigation-link-container">
            <p className="navigation-link">Audit Trail</p>
          </div>
          <div className="navigation-link-container">
            <p className="navigation-link">Chat</p>
          </div>
        </div>
      </div>
      <div className="sidenav-footer"></div>
    </div>
  );
};

export default Sidenav;
