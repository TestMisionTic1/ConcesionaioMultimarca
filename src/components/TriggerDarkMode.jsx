import { useDarkMode } from "contex/darkMode";
import React from "react";

const TriggerDarkMode = () => {
  const { darkMode, setdarkMode } = useDarkMode();
  return (
    <button
      onClick={() => {
        setdarkMode(!darkMode);
      }}
    >
      {darkMode ? "Desactivar" : "Activar"} modo Dark
    </button>
  );
};

export default TriggerDarkMode;
