import React, { useState, useEffect } from "react";
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { CiSquareCheck } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import Logo from "../assets/logo.png";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
    if (!email || !password) {
      setError("All fields are required");
      console.log("Validation failed: Missing fields");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting login");
      const response = await login(email, password);
      setSuccess(true); // Set success on successful login
      setLoading(false);
      console.log("Login successful: ", response);
      localStorage.setItem("token", response.token);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard"); // Navigate to dashboard or home page
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      setLoading(false);
      console.error("Login error: ", error);
    }
  };

  // Add this useEffect to check for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="auth-page-container">
      <div className="authbackground">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="auth-container">
        <div className="auth-left">
          <img src={images[2]} className="img" alt="Background" />
          <div className="overlay-container">
            <div className="top">
              <img src={Logo} className="img" alt="Logo" />
              <div className="button1" onClick={() => navigate("/")}>
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
          <p className="auth-heading-text">Login</p>
          <p className="auth-subheading-text">
            Don't have an account? <a href="/register">Register</a>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {error && <div className="error message">{error}</div>}
            {success && (
              <div className="success message">
                Login successful! Redirecting...
              </div>
            )}

            <div className="terms-n-conditions-container">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="rememberMe" className="terms-n-conditions-text">
                Remember Me
              </label>
            </div>

            <div className="buttons-container">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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

export default Login;
