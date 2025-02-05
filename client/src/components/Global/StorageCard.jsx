import React from "react";
import "./StorageCard.css"; // CSS file for styling
import { FiCloud } from "react-icons/fi"; // Using React Icons for the cloud icon
import { MdFlashOn } from "react-icons/md"; // Using React Icons for the flash icon

const StorageCard = () => {
  return (
    <div className="storage-card">
      <div className="storage-header">
        <p>Storage</p>
      </div>
      <div className="storage-progress">
        <div className="progress-bar1">
          <div className="progress1" style={{ width: "88%" }}></div>{" "}
          {/* 88% for 1.75 GB left from 15 GB */}
        </div>
      </div>
      <p className="storage-info">1.75 GB left from 15 GB</p>
      <button className="upgrade-btn">
        <MdFlashOn className="upgrade-icon" />
        Buy storage
      </button>
    </div>
  );
};

export default StorageCard;
