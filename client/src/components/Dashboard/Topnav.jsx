import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Topnav.css";

const Topnav = ({ user, documents }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim()) {
      setIsLoading(true);

      setTimeout(() => {
        const results = documents?.length
          ? documents.filter((doc) => {
              // Check if the query matches any of the searchable fields
              const fields = [
                doc.name,
                doc.type,
                doc.description,
                ...(doc.tags || []),
              ];
              return fields.some((field) =>
                field?.toString().toLowerCase().includes(query)
              );
            })
          : [];

        setFilteredDocuments(results);
        setIsLoading(false);
      }, 500); // Simulate a delay for animations
    } else {
      setFilteredDocuments([]);
    }
  };

  const highlightQuery = (text) => {
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="topnav-container">
      <div className="topnav-searchbar-container">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IoIosCloseCircle
          className="icon"
          onClick={() => {
            setSearchQuery("");
            setFilteredDocuments([]);
          }}
        />
      </div>

      <div className="nav-options">
        <FaCog className="icon" />
        <LuBell className="icon" />
        <div
          className="profile-card"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {!user.profileImage ? (
            <div className="noProfileImage">{user.firstname[0]}</div>
          ) : (
            <img src={user.profileImage} alt="Profile" />
          )}

          <div className="details">
            <h4>Personal</h4>
            <p>
              {user.firstname} {user.lastname}
            </p>
          </div>
          <IoIosArrowDown className={`icon ${showDropdown ? "rotated" : ""}`} />

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>
                  {user.firstname} {user.lastname}
                </strong>
                <span>{user.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Modal */}
      {searchQuery && (
        <div className={`search-results-modal ${isLoading ? "loading" : ""}`}>
          {isLoading ? (
            <div className="loader">Searching...</div>
          ) : filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div key={doc._id} className="search-result-item">
                <div className="document-header">
                  <FaFileAlt className="document-icon" />
                  <div>
                    <p className="document-name">
                      {highlightQuery(doc.name || "Unnamed Document")}
                    </p>
                    <p className="document-date">
                      Created: {formatDate(doc.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="document-matching-section">
                  {doc.type && (
                    <p className="document-trigger">
                      <span className="trigger-label">Type:</span>{" "}
                      {highlightQuery(doc.type)}
                    </p>
                  )}
                  {doc.description && (
                    <p className="document-trigger">
                      <span className="trigger-label">Description:</span>{" "}
                      {highlightQuery(doc.description)}
                    </p>
                  )}
                  {doc.tags &&
                    doc.tags.map((tag, index) => (
                      <p className="document-trigger" key={index}>
                        <span className="trigger-label">Tag:</span>{" "}
                        {highlightQuery(tag)}
                      </p>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No matching documents found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;
