import React from "react";
import Home from "./pages/Home";
import { ThemeContextProvider } from "./theme/theme";
import { useTheme } from "@mui/material";

const App = () => {
  const theme = useTheme();
  return (
    <ThemeContextProvider>
      <Home />
    </ThemeContextProvider>
  );
};

export default App;
