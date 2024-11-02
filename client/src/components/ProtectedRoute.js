// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null while checking

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8000/api/auth/verify-token"
        ); // Ensure this is the correct endpoint
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication, you can return a loading spinner here
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return children;
};

export default ProtectedRoute;
