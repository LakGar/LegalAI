import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notifications-container">
      <div className={`notification-alert ${type}`} role="alert">
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="notification-icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="notification-message">{message}</p>
        <div
          className="notification-progress"
          style={{ animationDuration: `${duration}ms` }}
        ></div>
      </div>
    </div>
  );
};

export default Notification;
