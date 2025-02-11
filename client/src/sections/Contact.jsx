import React, { useState } from "react";
import "./Contact.css";
import Logo from "../assets/logo.png";

function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-section" style={{ width: "40%" }}>
              <div className="logo-wrapper">
                <img src={Logo} alt="Logo" className="footer-logo" />
                <h2 className="logo-text">LegalAI</h2>
              </div>
              <p>
                Empowering legal professionals with AI-driven insights for
                faster, smarter decisions. Experience the future of legal
                analysis.
              </p>
              <div className="footer-social">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links-group">
              <div className="footer-section">
                <h3>Product</h3>
                <div className="footer-links">
                  <a href="#features">Features</a>
                  <a href="#pricing">Pricing</a>
                  <a href="#security">Security</a>
                  <a href="#enterprise">Enterprise</a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Company</h3>
                <div className="footer-links">
                  <a href="#about">About Us</a>
                  <a href="#careers">Careers</a>
                  <a href="#press">Press</a>
                  <a href="#blog">Blog</a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Resources</h3>
                <div className="footer-links">
                  <a href="#support">Support</a>
                  <a href="#documentation">Documentation</a>
                  <a href="#guides">Guides</a>
                  <button className="contact-button" onClick={openContactModal}>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2024 LegalAI Corporation. All rights reserved.</p>
            <div className="supporting-links">
              <a href="#terms">Terms</a>
              <a href="#privacy">Privacy</a>
              <a href="#cookies">Cookies</a>
              <a href="#compliance">Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {showContactModal && (
        <div className="contact-modal-overlay" onClick={closeContactModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-close" onClick={closeContactModal}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <h2>Get in Touch</h2>
            <p className="modal-subtitle">
              We'll get back to you within 24 hours
            </p>

            <form className="contact-modal-form">
              <div className="row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" required />
                </div>
              </div>

              <div className="input-group">
                <label>Work Email</label>
                <input type="email" required />
              </div>

              <div className="input-group">
                <label>Company</label>
                <input type="text" />
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea rows="4" required></textarea>
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
