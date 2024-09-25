import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ThemeContextProvider } from "./theme/theme";
import Dashboard from "./pages/Dashboard";
import { useTheme } from "@mui/material";

const App = () => {
  const theme = useTheme();
  return (
    <ThemeContextProvider>
      <Dashboard />
    </ThemeContextProvider>
  );
};

export default App;
