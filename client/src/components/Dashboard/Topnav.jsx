import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import { LuBell, LuBellDot } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import "./Topnav.css";

const Topnav = ({ user }) => {
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
          {!user.profileImage ? (
            <div className="noProfileImage">{user.firstname[0]}</div>
          ) : (
            <img src={user.profileImage} alt="Profile" />
          )}

          <div className="details">
            <h4>Personal</h4>
            <p>
              {user.firstname} {user.lastname}
            </p>
          </div>
          <IoIosArrowDown className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
