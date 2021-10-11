import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBarResponsive = () => {
  const [mostarNavegacion, setmostarNavegacion] = useState(false);
  return (
    <div
      className='sm:hidden'
      onClick={() => {
        setmostarNavegacion(!mostarNavegacion);
      }}
    >
      <i
        className={` mx-2 fas fa-${
          mostarNavegacion ? "times" : "bars"
        } hover:text-yellow-600`}
      />
      {mostarNavegacion && (
        <ul className='bg-gray-900'>
          <ResponsiveRoute nombre='Vehiculos' ruta='/admin/vehiculos' />
          <ResponsiveRoute nombre='Ventas' ruta='/admin/ventas' />
          <ResponsiveRoute nombre='Usuarios' ruta='/admin/usuarios' />
        </ul>
      )}
    </div>
  );
};

const ResponsiveRoute = ({ ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <li className='text-gray-200 border border-gray-300 p-1'>{nombre}</li>
    </Link>
  );
};
export default SideBarResponsive;
