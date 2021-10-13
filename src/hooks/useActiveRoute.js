import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const useActiveRoute = (ruta) => {
  const location = useLocation();
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    console.log(location, ruta);
    if (location.pathname.includes(ruta)) {
      setisActive(true);
    } else {
      setisActive(false);
    }
  }, [location, ruta]);
  return isActive;
};

export default useActiveRoute;
