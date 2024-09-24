import React, { useContext, useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoMobile from "../assets/logologo.png";
import logoDark from "../assets/logo-medium-dark.png";
import logoLight from "../assets/logo-medium-light.png";
import { Button, useTheme } from "@mui/material";
import "../styles/Header.css";
import { ThemeContext } from "../theme/theme";

const Header = () => {
  const { themeMode } = useContext(ThemeContext); // Get themeMode from context
  const theme = useTheme(); // Get the current theme object

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to scale down the website navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`header-container`}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div
        className="website-nav"
        style={{
          color: theme.palette.text.primary,
          transform: isScrolled ? "scale(0.8)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="logo">
          <img
            src={themeMode === "light" ? logoLight : logoDark}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="nav-link-container">
          <div
            href="#features"
            className="nav-link"
            style={{ color: theme.palette.text.primary }}
          >
            Features
          </div>
          <div
            href="#how-it-works"
            className="nav-link"
            style={{ color: theme.palette.text.primary }}
          >
            How It Works
          </div>
          <div
            href="#testimonials"
            className="nav-link"
            style={{ color: theme.palette.text.primary }}
          >
            Testimonials
          </div>
          <div
            href="#contact"
            className="nav-link"
            style={{ color: theme.palette.text.primary }}
          >
            Contact
          </div>
          <div
            className="navigation-button"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.paper,
            }}
          >
            Get Started for Free
          </div>
        </div>
      </div>
      <div className="mobile-nav">
        <div className="mobile-nav-top">
          <img src={logoMobile} alt="Logo" className="mobile-logo" />
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={{ color: theme.palette.text.primary }} />
            ) : (
              <MenuIcon style={{ color: theme.palette.text.primary }} />
            )}
          </div>
        </div>
        {menuOpen && (
          <div
            className="nav-link-container-mobile"
            style={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <div
              href="#features"
              className="nav-link"
              style={{ color: theme.palette.text.primary }}
            >
              Features
            </div>
            <div
              href="#how-it-works"
              className="nav-link"
              style={{ color: theme.palette.text.primary }}
            >
              How It Works
            </div>
            <div
              href="#testimonials"
              className="nav-link"
              style={{ color: theme.palette.text.primary }}
            >
              Testimonials
            </div>
            <div
              href="#contact"
              className="nav-link"
              style={{ color: theme.palette.text.primary }}
            >
              Contact
            </div>
            <div
              className="navigation-button"
              variant="contained"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.paper,
              }}
            >
              Get Started for Free
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
