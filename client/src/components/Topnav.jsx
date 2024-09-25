import React from "react";
import { useTheme, Avatar, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "../styles/Topnav.css"; // Ensure to link your TopNav CSS

const TopNav = () => {
  const theme = useTheme();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div
      className="topnav-container"
      style={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: "1px solid grey",
      }}
    >
      <div className="topnav-left">
        {/* You can add a logo or other left-aligned content here if needed */}
      </div>

      <div className="topnav-right">
        <IconButton className="topnav-icon">
          <HelpOutlineIcon style={{ color: theme.palette.text.primary }} />
        </IconButton>
        <IconButton className="topnav-icon">
          <NotificationsIcon style={{ color: theme.palette.text.primary }} />
        </IconButton>
        <IconButton className="topnav-icon">
          <SettingsIcon style={{ color: theme.palette.text.primary }} />
        </IconButton>

        {/* User Profile */}
        <div className="topnav-profile">
          <Avatar
            src={user.profilePic}
            alt={user.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <div
              className="profile-name"
              style={{ color: theme.palette.text.primary, paddingRight: 20 }}
            >
              {user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
