import React, { useState,useEffect } from "react";

export default function ThemeToggle({ setTheme }) {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setTheme(isDark);
  }, [isDark])


  return (
    <label className="switch">
      <input
        type="checkbox"
        onClick={() => setIsDark((prevTheme) => !prevTheme)}
        id="toggleBtn"
      />
      <span className="slider round"></span>
    </label>

  );
}