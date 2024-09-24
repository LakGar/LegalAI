import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a context for theme
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark");

  // Define the light and dark themes with appropriate colors
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1e90ff", // Dark Blue - symbolizes trust and professionalism
      },
      secondary: {
        main: "#455A64", // Blue Gray - complements primary color
      },
      background: {
        default: "#F5F5F5", // Light Gray - clean and neutral background
        paper: "#FFFFFF", // White - for card backgrounds
      },
      text: {
        primary: "#212121", // Dark Gray - for main text
        secondary: "#757575", // Medium Gray - for secondary text
      },
      divider: "#BDBDBD", // Optional: Add divider color
    },
    custom: {
      accent: "#FFC107", // Amber - subtle accent color (gold-like)
      card: "#FFFFFF", // White - consistent with paper background
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: 16,
    },
    spacing: 8,
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1e90ff", // Dark Blue - symbolizes trust and professionalism
      },
      secondary: {
        main: "#B0BEC5", // Light Blue Gray - complements primary color
      },
      background: {
        default: "#263238", // Dark Blue Gray - reduces eye strain
        paper: "#37474F", // Darker Gray - for card backgrounds
      },
      text: {
        primary: "#ECEFF1", // Light Gray - for main text on dark background
        secondary: "#B0BEC5", // Light Blue Gray - for secondary text
      },
      divider: "#757575", // Optional: Add divider color
    },
    custom: {
      accent: "#FFC107", // Amber - consistent accent color
      card: "#37474F", // Matches paper background
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: 16,
    },
    spacing: 8,
  });

  // Memoize the theme to avoid unnecessary recalculations
  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
