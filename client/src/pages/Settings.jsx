import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserDetails,
  deleteUserAccount,
  uploadProfileImage,
} from "../redux/actions/userAction";
import Sidenav from "../components/Global/Sidenav";
import {
  IoMdPerson,
  IoMdLock,
  IoMdNotifications,
  IoMdBusiness,
  IoMdTrash,
  IoMdCloud,
  IoMdColorPalette,
  IoMdGlobe,
} from "react-icons/io";
import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { user, loading, error } = userState;

  // Profile States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");

  // Business Settings States
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessSize, setBusinessSize] = useState("small");

  // UI States
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfileImage(user.profileImage || "");
      setBio(user.bio || "");
      setCompanyName(user.business?.name || "");
      setIndustry(user.business?.industry || "");
      setBusinessSize(user.business?.size || "small");
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        bio,
        business: {
          name: companyName,
          industry,
          size: businessSize,
        },
      };

      await dispatch(updateUserDetails(userData));
      setNotification({
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await dispatch(uploadProfileImage(formData));
      setNotification({
        type: "success",
        message: "Profile image updated successfully!",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to upload image",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserAccount());
      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to delete account",
      });
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <Sidenav />

      <div className="settings-content">
        <h1>Settings</h1>

        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <IoMdPerson /> Profile
          </button>
          <button
            className={`tab ${activeTab === "business" ? "active" : ""}`}
            onClick={() => setActiveTab("business")}
          >
            <IoMdBusiness /> Business
          </button>
          <button
            className={`tab ${activeTab === "danger" ? "active" : ""}`}
            onClick={() => setActiveTab("danger")}
          >
            <IoMdTrash /> Danger Zone
          </button>
        </div>

        {activeTab === "profile" && (
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="profile-image-section">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Profile"
                className="profile-image"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
                hidden
              />
              <label htmlFor="image-upload" className="upload-button">
                Change Photo
              </label>
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </div>

            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {activeTab === "business" && (
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="form-group">
              <label>Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="legal">Legal</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Business Size</label>
              <select
                value={businessSize}
                onChange={(e) => setBusinessSize(e.target.value)}
              >
                <option value="small">Small (1-50 employees)</option>
                <option value="medium">Medium (51-250 employees)</option>
                <option value="large">Large (251+ employees)</option>
              </select>
            </div>

            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Saving..." : "Save Business Info"}
            </button>
          </form>
        )}

        {activeTab === "danger" && (
          <div className="settings-form danger-zone">
            <h3>Danger Zone</h3>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              type="button"
              className="delete-account-button"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <IoMdTrash /> Delete Account
            </button>
          </div>
        )}

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
            <button
              onClick={() => setNotification(null)}
              className="close-notification"
            >
              ×
            </button>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Delete Account</h2>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="modal-buttons">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} className="delete-button">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
