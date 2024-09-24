import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ThemeContextProvider } from "./theme/theme";

const App = () => {
  return (
    <ThemeContextProvider>
      <Home />
    </ThemeContextProvider>
  );
};

export default App;
