import React from "react";
import "../styles/Footer.css";
import { useTheme, Button } from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import logoDark from "../assets/logo-medium-dark.png";
import logoLight from "../assets/logo-medium-light.png";

function Footer() {
  const theme = useTheme();

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="footer-top">
        <div className="logo-buttons">
          <div className="footer-logo">
            {/* Replace with your actual logo */}
            <img src={logoLight} alt="Legalit Logo" />
          </div>
          <div className="footer-buttons">
            <div className="try-button">Try LEGALIT</div>
            <div className="watch-button">Watch Demo</div>
          </div>

          <div className="footer-social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#plans" style={{ color: theme.palette.text.primary }}>
                Plans & Pricing
              </a>
            </li>
            <li>
              <a href="#features" style={{ color: theme.palette.text.primary }}>
                Features
              </a>
            </li>
            <li>
              <a href="#news" style={{ color: theme.palette.text.primary }}>
                News & Blogs
              </a>
            </li>
            <li>
              <a href="#careers" style={{ color: theme.palette.text.primary }}>
                Careers
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ color: theme.palette.text.secondary }}>
          &copy; {new Date().getFullYear()} LEGALIT Inc. All rights reserved.
        </p>
        <a href="#terms" style={{ color: theme.palette.text.secondary }}>
          Terms of Service
        </a>
      </div>
    </footer>
  );
}

export default Footer;
