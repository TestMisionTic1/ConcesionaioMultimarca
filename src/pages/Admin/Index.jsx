import { useDarkMode } from "contex/darkMode";
import React from "react";

const Admin = () => {
  const { darkMode, setdarkMode } = useDarkMode();
  return (
    <div className={`flex w-full h-full bg-gray-${darkMode ? "900" : "50"}`}>
      Contenido
    </div>
  );
};

export default Admin;
