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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />

            {/* Protected Routes */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Router>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
