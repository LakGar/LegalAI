import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import "./Greeting.css";

const Greeting = ({ name }) => {
  // Format the date as "Month Day, Year"
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="greeting-container">
      <div className="greeting-text">
        <h2>Hello, {name}!</h2>
        <p>Welcome back to your dashboard. Here’s what’s happening today:</p>
      </div>
      <div className="greeting-date">
        <span>{currentDate}</span>
        <div className="calendar-icon">
          <CiCalendarDate style={{ fontSize: "1.2rem" }} />
        </div>
      </div>
    </div>
  );
};

export default Greeting;
