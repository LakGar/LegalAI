import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material"; // Import Material UI icons

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // Adjusted trigger threshold
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_vw2f1h9", // Replace with your EmailJS Service ID
        "template_by1fzyo", // Replace with your EmailJS Template ID
        formData,
        "w9hNEf_ZepN3o-p_G" // Replace with your EmailJS User ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
          }, 3000);
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <div
        className={`contact-container ${isVisible ? "fade-in" : ""}`}
        ref={contactRef}
      >
        <h2>Get in Touch</h2>
        <p>Feel free to reach out to us with any questions or inquiries.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
          <button type="submit" className="submit-button">
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-left">
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook fontSize="large" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter fontSize="large" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedIn fontSize="large" />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
