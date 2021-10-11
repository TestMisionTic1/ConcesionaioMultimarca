import { useDarkMode } from "contex/darkMode";
import React from "react";

const Index = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex h-full bg-gray-${darkMode ? "900" : "50"}`}>
      contenido Landing consesionario1
    </div>
  );
};

export default Index;
