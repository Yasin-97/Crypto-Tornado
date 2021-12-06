import React, { useState } from "react";

export default function BtnToggle({ setTheme }) {
  const [isDark, setIsDark] = useState(false);
  setTheme(isDark);
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