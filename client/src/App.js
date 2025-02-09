// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ThemeContextProvider } from "./theme/theme";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import Documents from "./pages/Documents";
import Chats from "./pages/Chats";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Router>
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<EmailVerification />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chats"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
