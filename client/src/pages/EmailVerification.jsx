import React, { useState, useRef, useEffect } from "react";
import "./EmailVerification.css";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // For navigation
import Logo from "../assets/logo.png";
import { verifyEmail } from "../services/authService"; // Import the verifyEmail function

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e, index) => {
    if (error) setError(false);
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log("Entered Code:", fullCode);

    setLoading(true); // Show loader
    try {
      const response = await verifyEmail(fullCode);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/login"); // Navigate to the dashboard after verification
        }, 1000); // Simulate loader for 1 second
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("Verification failed", err);
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="hero-container">
      <div className="background1">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="auth-container">
        <div className="auth-left">
          <img
            src="https://images.unsplash.com/photo-1653609962615-2df348503e6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGdyYWRpZW50JTIwc2t5fGVufDB8fDB8fHww"
            className="img"
            alt="Background"
          />
          <div className="overlay-container">
            <div className="top">
              <img src={Logo} className="img" alt="Logo" />
              <div className="button1">
                <IoMdArrowBack />
                Back to website
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-text">
                Smarter Legal Analysis, Faster Decisions
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-heading-section">
            <MdOutlineEmail
              style={{ fontSize: "100px" }}
              className="email-icon"
            />
            <p className="auth-heading-text">Email Verification</p>
            <p className="auth-subheading-text">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="verification-form">
            <div className="code-inputs">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`code-input ${
                    error ? "input-error" : success ? "input-success" : ""
                  }`} // Apply input class here
                />
              ))}
            </div>

            {error && (
              <p className="error-text">Invalid code. Please try again.</p>
            )}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  Verify <BiLockAlt className="lock-icon" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
