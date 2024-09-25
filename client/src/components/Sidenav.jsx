import React, { useState } from "react";
import { colors, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import ChatIcon from "@mui/icons-material/Chat";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the option icon
import "../styles/Sidenav.css"; // Make sure to import your CSS
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import logo from "../assets/logologo.png";

const Sidenav = ({ onToggleNav }) => {
  // Pass prop as onToggleNav
  const theme = useTheme();
  const [fullNav, setFullNav] = useState(true);

  const handleToggleNav = () => {
    // Renamed toggle function to avoid conflict
    setFullNav(!fullNav);
    onToggleNav(!fullNav); // Notify parent component of the change
  };
  // Sample chat data with date categories
  const chats = [
    {
      name: "John Doe",
      message: "Hello, how are you?",
      timestamp: "5:30 PM",
      date: "today",
    },
    {
      name: "Jane Smith",
      message: "I'm feeling great, thank you!",
      timestamp: "4:15 PM",
      date: "today",
    },
    {
      name: "Alice Johnson",
      message: "Wow, this is amazing! I love it.",
      timestamp: "3:40 PM",
      date: "yesterday",
    },
    {
      name: "Bob Williams",
      message: "Let's meet next week.",
      timestamp: "2:15 PM",
      date: "last7days",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
    {
      name: "Carol Brown",
      message: "Happy birthday!",
      timestamp: "1:00 PM",
      date: "lastmonth",
    },
  ];

  // Group chats by date category
  const groupedChats = {
    today: [],
    yesterday: [],
    last7days: [],
    lastmonth: [],
  };

  chats.forEach((chat) => {
    groupedChats[chat.date].push(chat);
  });

  return (
    <div
      className={`sidenav-container ${fullNav ? "full" : "collapsed"}`}
      style={{
        backgroundColor: theme.custom.card,
        color: theme.palette.text.primary,
        borderRight: `1px solid ${theme.palette.text.secondary}`,
      }}
    >
      <div className={`sidenav-top ${fullNav ? "row" : "column"}`}>
        <img src={logo} alt="Logo" className="logo" />
        <div onClick={handleToggleNav} className="toggle-btn-container">
          {fullNav ? (
            <FormatAlignRightIcon className="toggle-btn" />
          ) : (
            <FormatAlignLeftIcon className="toggle-btn" />
          )}
        </div>
      </div>

      <div className={`sidenav-links ${fullNav ? "short" : "long"}`}>
        <div className="sidenav-link">
          <DashboardIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#home">
              Dashboard
            </a>
          )}
        </div>
        <div className="sidenav-link">
          <SearchIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#search">
              Search
            </a>
          )}
        </div>
        <div className="sidenav-link">
          <CloudUploadIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#upload">
              Upload
            </a>
          )}
        </div>
        <div className="sidenav-link">
          <FolderIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#documents">
              Documents
            </a>
          )}
        </div>
        <div className="sidenav-link">
          <ChatIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#chats">
              Chats
            </a>
          )}
        </div>
        <div className="sidenav-link">
          <AssessmentIcon />
          {fullNav && (
            <a style={{ color: theme.palette.text.primary }} href="#audit">
              Audit
            </a>
          )}
        </div>
      </div>

      {fullNav && (
        <div className="sidenav-chatlist">
          {fullNav && <div className="chatlist-title">Chats</div>}
          {Object.keys(groupedChats).map(
            (period) =>
              groupedChats[period].length > 0 && (
                <div key={period}>
                  <div className="chatlist-period">
                    {period === "today"
                      ? "Today"
                      : period === "yesterday"
                      ? "Yesterday"
                      : period === "last7days"
                      ? "Last 7 Days"
                      : "Last Month"}
                  </div>
                  {groupedChats[period].map((chat, index) => (
                    <div className="chatlist-item" key={index}>
                      <div className="chatlist-item-info">
                        {chat.name ? (
                          <div className="chatlist-item-name">{chat.name}</div>
                        ) : (
                          <div className="chatlist-item-last-message">
                            {chat.message}
                          </div>
                        )}
                      </div>
                      <IconButton size="small" className="chatlist-icon">
                        <MoreVertIcon
                          fontSize="small"
                          style={{ color: theme.palette.text.primary }}
                        />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      )}
      <div className="sidenav-bottom">
        <img
          className="profile-icon"
          src="https://images.unsplash.com/photo-1583748493291-7938f0657681?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D"
        />
        {fullNav && (
          <>
            <div className="sidenav-bottom-info">
              <div className="sidenav-bottom-name">John Doe</div>
              <div className="sidenav-bottom-email">john.doe@example.com</div>
            </div>
            <div className="sidenav-bottom-button">
              <ChevronRightIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidenav;
