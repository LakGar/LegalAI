import React, { useState, useEffect } from "react";
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { CiSquareCheck } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import Logo from "../assets/logologo.png";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const images = [
    "https://images.unsplash.com/photo-1489321336462-efe12c02d099?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnQlMjBza3l8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1653609962615-2df348503e6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGdyYWRpZW50JTIwc2t5fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1717719405891-c60737ef4082?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxncmFkaWVudCUyMHNreXxlbnwwfHwwfHx8MA%3D%3D",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    setError(""); // Clear previous error
    setSuccess(false); // Reset success state

    // Validate inputs
    if (
      !name ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      console.log("Validation failed: Missing fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      console.log("Validation failed: Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting signup");
      const response = await signup(name, lastName, email, phone, password);
      setSuccess(true); // Set success on successful signup
      setLoading(false);
      console.log("Signup successful: ", response);
      //navigate to email verfication
      navigate("/verify-email");
    } catch (error) {
      setError("Signup failed. Please try again.");
      setLoading(false);
      console.error("Signup error: ", error);
    }
  };

  return (
    <div className="hero-container">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="auth-container">
        <div className="auth-left">
          <img src={images[2]} className="img" alt="Background" />
          <div className="overlay-container">
            <div className="top">
              <img src={Logo} className="img" alt="Logo" />
              <div className="button">
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
          <p className="auth-heading-text">Create An Account</p>
          <p className="auth-subheading-text">
            Already have an account? <a href="/login">Login</a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-row">
              <input
                type="text"
                placeholder="First Name"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="auth-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="auth-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <div className="error message">{error}</div>}
            {success && (
              <div className="success message">
                Account created successfully!
              </div>
            )}

            <div className="terms-n-conditions-container">
              <CiSquareCheck />
              <span className="terms-n-conditions-text">
                I agree to the <a href="/#">Terms and Conditions</a>
              </span>
            </div>

            <div className="buttons-container">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <div className="divider-container">
                <div className="divider"></div>
                <p className="divider-text">or</p>
                <div className="divider"></div>
              </div>

              <div className="alt-auth-buttons">
                <button className="google-auth-button">
                  <FcGoogle />
                  Google
                </button>
                <button className="google-auth-button">
                  <RiAppleFill />
                  Apple
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
