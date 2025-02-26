import React from "react";
import { FaUsers, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Sidenav.css";
import Logo from "../../assets/logo.png";
import StorageCard from "./StorageCard";

const Sidenav = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidenav-container">
      <div className="sidenav-top">
        {/* Logo */}
        <div className="sidenav-logo">
          <img src={Logo} alt="logo" className="logo-image" />
          <span className="logo-text">LegalAI</span>
        </div>

        {/* Navigation Links */}
        <div className="sidenav-links">
          <NavLink to="/dashboard" className="sidenav-link">
            <MdSpaceDashboard className="icon" />
            <span className="sidenav-link-text">Dashboard</span>
          </NavLink>

          <NavLink to="/documents" className="sidenav-link">
            <IoDocument className="icon" />
            <span className="sidenav-link-text">Documents</span>
          </NavLink>

          <NavLink to="/chats" className="sidenav-link">
            <IoChatbox className="icon" />
            <span className="sidenav-link-text">Chats</span>
          </NavLink>

          <NavLink to="/team" className="sidenav-link">
            <FaUsers className="icon" />
            <span className="sidenav-link-text">Team</span>
          </NavLink>
          {/* 
          <NavLink to="/settings" className="sidenav-link">
            <FaCog className="icon" />
            <span className="sidenav-link-text">Settings</span>
          </NavLink> */}
        </div>
      </div>
      {/* <div className="storage-card-container">
        <StorageCard />
      </div> */}
      {/* Upgrade CTA */}
      {/* <div className="sidenav-cta">
        <div className="upgrade-section">
          <p>Upgrade to Pro</p>
          <span>Get 1 month free and unlock</span>
          <button className="upgrade-btn">Upgrade</button>
        </div>

      </div> */}
      <div className="sidenav-bottom">
        <a
          href="https://www.linkedin.com/company/legalai-dev/ "
          className="help-link"
        >
          <FaQuestionCircle className="icon" />
          <span className="sidenav-link-text">Help & Information</span>
        </a>
        <div onClick={handleLogout} className="logout-link">
          <FaSignOutAlt className="icon" />
          <span className="sidenav-link-text">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
