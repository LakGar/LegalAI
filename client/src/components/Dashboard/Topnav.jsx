import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import { LuBell, LuBellDot } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import "./Topnav.css";

const Topnav = () => {
  return (
    <div className="topnav-container">
      <div className="topnav-searchbar-container">
        <CiSearch className="search-icon" />
        <input type="text" placeholder="Search" />
        <IoIosCloseCircle className="icon" />
      </div>
      <div className="nav-options">
        <FaCog className="icon" />
        <LuBell className="icon" />
        <div className="profile-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile"
          />
          <div className="details">
            <h4>Personal</h4>
            <p>Lakshay Garg</p>
          </div>
          <IoIosArrowDown className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
