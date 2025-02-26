import React, { useState, useEffect } from "react";
import Sidenav from "../components/Global/Sidenav";
import "./Dashboard.css"; // Create this CSS file for animation styles

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [foundEasterEgg, setFoundEasterEgg] = useState(false);

  // Use useEffect to trigger the loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const handleEasterEggClick = () => {
    setFoundEasterEgg(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="background">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Side Navigation */}
      <div className="sidenav">
        <Sidenav />
      </div>

      {/* Interactive Easter Egg Game */}
      <div className="coming-soon-container">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-subtitle">
          We are working hard to bring you an amazing experience. Stay tuned!
        </p>
        {/* 
        {!foundEasterEgg ? (
          <div className="easter-egg-game">
            <p>Click around to find a hidden surprise!</p>
            <button
              className="easter-egg-button"
              onClick={handleEasterEggClick}
            >
              Find the Egg
            </button>
          </div>
        ) : (
          <div className="easter-egg-found">
            <h2>🎉 You found the Easter Egg! 🎉</h2>
            <p>Thanks for exploring! More fun surprises to come.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Team;
