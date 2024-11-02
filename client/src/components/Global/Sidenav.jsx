import React from "react";
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";

import { BsPlusCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
import "./Sidenav.css";
import Logo from "../../assets/logologo.png";
import StorageCard from "./StorageCard";

const Sidenav = () => {
  return (
    <div className="sidenav-container">
      <div className="sidenav-top">
        {/* Logo */}
        <div className="sidenav-logo">
          {/* <img src={Logo} alt="Logo" className="logo" /> */}
          <span>LegalAI</span>
        </div>

        {/* Navigation Links */}
        <div className="sidenav-links">
          <NavLink
            to="/dashboard"
            className="sidenav-link"
            activeClassName="active"
          >
            <MdSpaceDashboard className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/documents"
            className="sidenav-link"
            activeClassName="active"
          >
            <IoDocument className="icon" />
            <span>Documents</span>
            <BsPlusCircle className="plus-icon" />
          </NavLink>

          <NavLink
            to="/chats"
            className="sidenav-link"
            activeClassName="active"
          >
            <IoChatbox className="icon" />
            <span>Chats</span>
            <BsPlusCircle className="plus-icon" />
          </NavLink>

          <NavLink to="/team" className="sidenav-link" activeClassName="active">
            <FaUsers className="icon" />
            <span>Team</span>
          </NavLink>

          <NavLink
            to="/settings"
            className="sidenav-link"
            activeClassName="active"
          >
            <FaCog className="icon" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
      <StorageCard />
      {/* Upgrade CTA */}
      <div className="sidenav-cta">
        <div className="upgrade-section">
          <p>Upgrade to Pro</p>
          <span>Get 1 month free and unlock</span>
          <button className="upgrade-btn">Upgrade</button>
        </div>

        {/* Help and Log Out */}
        <div className="sidenav-bottom">
          <NavLink to="/help" className="help-link" activeClassName="active">
            <FaQuestionCircle className="icon" />
            <span>Help & Information</span>
          </NavLink>
          <NavLink to="/logout" className="logout-link">
            <FaSignOutAlt className="icon" />
            <span>Log out</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;