import logo from './logo.svg';
import './App.css';
import { useState, createContext, useContext, useEffect, useRef, useMemo, useReducer, useCallback } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ theme, children }) {
  const parentTheme = useContext(ThemeContext);
  const mergedTheme = useMemo(() => ({
    ...parentTheme,
    ...theme
  }), [parentTheme, theme]);
  console.log(mergedTheme);
  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

//const useTheme = 
const useTheme = (key) => {
  const theme = useContext(ThemeContext);
  return theme?.[key];
}

const Box = ({ children }) => {
  const background = useTheme("background");
  const color = useTheme("color");
  console.log("Box + background + " + background + " + color + " + color);

  return (
    <div style={{ padding: "20px", background, color, borderRadius: "8px" }}>
      {children}
    </div>
  )
}

const Button = ({ children }) => {
  const primary = useTheme("primary");
  console.log("Button +  primary + " + primary);

  return (
    <button style={{ background: primary, padding: "10px", border: "none", borderRadius: "5px", color: "white" }}>
      {children}
    </button>
  )
}

const App = () => {

  return (
    <ThemeProvider
      theme={{
        background: "#282c34",
        color: "#ffffff",
        primary: "#61dafb"
      }}>
      <Box>
        Default Themed Box
        <Button>Default Button</Button>
      </Box>

      {/* Override theme in a nested provider */}
      <ThemeProvider
        theme={{
          background: "#444",
          primary: "#ff4081"
        }}>
        <Box>
          Nested ThemedBox
          <Button>Nested Button</Button>
        </Box>
      </ThemeProvider>
    </ThemeProvider>
  )
}

export default App;
