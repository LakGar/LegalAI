import React, { useState } from "react";
import "./Contact.css";
import Logo from "../assets/logo-long-dark.png";

function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section" style={{ width: "40%" }}>
            <img src={Logo} alt="Logo" className="footer-logo" />
            <p>
              Smarter Legal Analysis, Faster Decisions. We're here to help you
              navigate the legal world.
            </p>
            LegalAI 2024
          </div>
          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <div className="footer-links">
              <a href="#customers">Customers</a>
              <a href="#security">Security</a>
              <a href="#company">Company</a>
              <a href="#news">News</a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Resources</h3>
            <div className="footer-links">
              <a href="#legal">Legal</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#press">Press Kit</a>
              <a href="#choices">Your Privacy Choices</a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="footer-links">
              <a href="https://linkedin.com">LinkedIn</a>
              <a href="https://twitter.com">Twitter</a>
              <button className="contact-button" onClick={openContactModal}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Counsel AI Corporation. All rights reserved.</p>
          <div className="supporting-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookies Policy</a>
          </div>
        </div>
      </footer>

      {showContactModal && (
        <div className="contact-modal-overlay" onClick={closeContactModal}>
          <div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="contact-modal-close" onClick={closeContactModal}>
              &times;
            </div>
            <h2>Contact Us</h2>
            <form className="contact-modal-form">
              <div className="row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>

              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" />
              <div className="row">
                <input type="text" placeholder="Website" />
                <input type="text" placeholder="Title" />
              </div>
              <textarea placeholder="Message" rows="4" required />
              <button type="submit">Submit Form</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
