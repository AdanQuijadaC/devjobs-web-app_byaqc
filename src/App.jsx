import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dataJSON from "./data.json";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  const [data, setData] = useState(() => {
    return dataJSON;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [detail, setDetail] = useState({
    idCompany: "",
    isActived: false,
  });

  function toggleDarkMode() {
    if (darkMode) {
      setDarkMode(false);
      localStorage.theme = "light";
    } else {
      setDarkMode(true);
      localStorage.theme = "dark";
    }
  }

  useEffect(() => {
    // dark mode
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            data={data}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            toggleDarkMode={toggleDarkMode}
            detail={detail}
            setDetail={setDetail}
          ></Home>
        }
      ></Route>
      <Route
        path="/:company/detail"
        element={
          <Detail
            data={data}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            toggleDarkMode={toggleDarkMode}
            detail={detail}
            setDetail={setDetail}
          ></Detail>
        }
      ></Route>
    </Routes>
  );
}
export default App;
