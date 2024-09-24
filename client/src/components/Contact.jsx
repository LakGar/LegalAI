import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import { TextField, Button, useTheme } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
      duration: 1000,
      once: true, // Animation only happens once when scrolling
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000); // Reset form after 3 seconds
  };

  return (
    <section
      id="contact"
      className="contact-section"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="contact-container">
        <h2 style={{ color: theme.palette.text.primary }} data-aos="fade-down">
          Get in Touch
        </h2>
        <p
          style={{ color: theme.palette.text.secondary }}
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Feel free to reach out to us with any questions or inquiries.
        </p>
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
            inputProps={{ style: { color: theme.palette.text.primary } }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
            inputProps={{ style: { color: theme.palette.text.primary } }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
            inputProps={{ style: { color: theme.palette.text.primary } }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: theme.palette.primary.main }}
            className="submit-button"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
