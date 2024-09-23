import React, { useEffect, useState } from "react";
import "../styles/Auth.css";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termConditions, setTermConditions] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // Track active slide

  const carouselItems = [
    {
      image:
        "https://i.pinimg.com/474x/0b/8c/28/0b8c2865af81e2b4ba49fd90b04ace67.jpg",
      text: "Effortless legal document management, at your fingertips",
    },
    {
      image:
        "https://i.pinimg.com/474x/60/a4/18/60a4185dbc79deeda1cce9db170e52e4.jpg",
      text: "Access your legal documents securely, anytime, anywhere",
    },
    {
      image:
        "https://i.pinimg.com/474x/0c/ef/9c/0cef9c026b8706a8507afbdb16043074.jpg",
      text: "Stay organized and in control of your contracts with Legalit",
    },
  ];

  const toggelTermsConditions = () => {
    setTermConditions(!termConditions);
  };

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [carouselItems.length]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="image-carousel">
          {carouselItems.map((item, index) => (
            <div
              className={`carousel-slide ${
                index === activeSlide ? "active" : ""
              }`}
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              {/* Overlay */}
              <div className="carousel-overlay"></div>

              <div className="image-carousel-top">
                <img className="logo" src={Logo} />
                <div className="navigation-button">Back to website</div>
              </div>
              <div className="image-carousel-text">{item.text}</div>
            </div>
          ))}
          <div className="image-carousel-slider">
            <div
              className="slider"
              style={{
                backgroundColor: activeSlide === 0 ? "white" : "grey",
                width: activeSlide === 0 ? 54 : 50,
                height: activeSlide === 0 ? 3 : 2,
              }}
            ></div>
            <div
              className="slider"
              style={{
                backgroundColor: activeSlide === 1 ? "white" : "grey",
                width: activeSlide === 1 ? 54 : 50,
                height: activeSlide === 1 ? 3 : 2,
              }}
            ></div>
            <div
              className="slider"
              style={{
                backgroundColor: activeSlide === 2 ? "white" : "grey",
                width: activeSlide === 2 ? 54 : 50,
                height: activeSlide === 2 ? 3 : 2,
              }}
            ></div>
          </div>
        </div>

        <div className="auth-form">
          <div className="auth-form-heading-container">
            <h2 className="auth-form-heading">Create an account</h2>
            <p className="switch-auth">
              Already have an account?{" "}
              <a className="switch-auth-link" href="#">
                Sign in
              </a>
            </p>
          </div>
          <form className="auth-form-fields">
            <div className="input-field-row">
              <div className="auth-input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="First Name"
                  required
                  pattern="[A-Za-z]+"
                />
              </div>
              <div className="auth-input">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Last Name"
                  required
                  pattern="[A-Za-z]+"
                />
              </div>
            </div>
            <div className="auth-input">
              <input
                type="text"
                className="input-field"
                placeholder="Email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
            <div className="auth-input">
              <input
                type="text"
                className="input-field"
                placeholder="Enter your password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least 8 characters, including uppercase letters, lowercase letters, and numbers."
              />
            </div>
            <p className="terms-conditions">
              <div onClick={toggelTermsConditions}>
                {termConditions ? (
                  <IoCheckbox className="checkbox-icon" />
                ) : (
                  <IoCheckboxOutline className="checkbox-icon" />
                )}
              </div>
              I agree to the <a href="#">Terms & Conditions</a>
            </p>
          </form>
          <div className="buttons-container">
            <button
              className="submit-form-button"
              type="submit"
              disabled={!termConditions || loading}
            >
              Sign up
            </button>
            <div className="divider-container">
              <div className="divider"></div>
              <p className="divider-text">Or sign up with</p>
              <div className="divider"></div>
            </div>
            <div className="social-media-login-container">
              <div className="social-media-login">
                <FcGoogle className="social-media-icon" />
                <p>Google</p>
              </div>

              <div className="social-media-login">
                <FaApple className="social-media-icon" />
                <p>Apple</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
