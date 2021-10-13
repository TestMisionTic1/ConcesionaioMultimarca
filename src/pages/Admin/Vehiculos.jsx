import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const vehiculosBackEnd = [
  {
    nombre: "Corolla",
    marca: "Renault",
    modelo: 2020,
  },

  {
    nombre: "Sandero",
    marca: "Reanult",
    modelo: 2014,
  },

  {
    nombre: "Rav4",
    marca: "Toyota",
    modelo: 2021,
  },

  {
    nombre: "Fiesta",
    marca: "Ford",
    modelo: 2017,
  },

  {
    nombre: "Mazda 3",
    marca: "Mazda",
    modelo: 2014,
  },
  {
    nombre: "Onix",
    marca: "Chevrolet",
    modelo: 2014,
  },
];

const Vehiculos = () => {
  const [mostrarTabla, setmostrarTabla] = useState(true);
  const [vehiculos, setvehiculos] = useState([]);
  const [textoBoton, settextoBoton] = useState("Crear Nuevo Vehiculo");
  const [colorBoton, setcolorBoton] = useState("indigo");

  useEffect(() => {
    setvehiculos(vehiculosBackEnd);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      settextoBoton("Crear Nuevo Vehiculo");
      setcolorBoton("indigo");
    } else {
      settextoBoton("Mostrar Todos Los Vehiculos");
      setcolorBoton("green");
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col '>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Pagina Administracion de Vehiculos
        </h2>
        <button
          onClick={() => {
            setmostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaVehiculos listaVehiculos={vehiculos} />
      ) : (
        <FormularioCreacionVehiculos
          setMostrarTabla={setmostrarTabla}
          listaVehiculos={vehiculos}
          setVehiculos={setvehiculos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVehiculos = ({ listaVehiculos }) => {
  useEffect(() => {
    console.log(
      "este es el listado de vehiculos en el componente de tabla",
      listaVehiculos
    );
  }, [listaVehiculos]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800 '>
        Todos Los Vehiculos
      </h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Vehiculo</th>
            <th>Marca del Vehiculo</th>
            <th>Modelo del Vehiculo</th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map((vehiculo) => {
            return (
              <tr>
                <td>{vehiculo.nombre}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const FormularioCreacionVehiculos = ({
  setMostrarTabla,
  listaVehiculos,
  setVehiculos,
}) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoVehiculo = {};
    fd.forEach((value, key) => {
      nuevoVehiculo[key] = value;
    });
    setMostrarTabla(true);
    setVehiculos([...listaVehiculos, nuevoVehiculo]);
    toast.success("Vehiculo agregado con Exito");
  };

  return (
    <div className='flex flex-col  items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800 '>
        Crear Nuevo Vehiculo
      </h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label htmlFor='nombre' className='flex flex-col'>
          Nombre del Vehiculo
          <input
            required
            name='nombre'
            className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
            type='text'
            placeholder='Corolla'
          />
        </label>
        <label htmlFor='marca' className='flex flex-col'>
          Marca del Vehiculo
          <select
            required
            name='marca'
            className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opcion
            </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label htmlFor='modelo' className='flex flex-col'>
          Modelo del Vehiculo
          <input
            required
            name='modelo'
            className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
            type='number'
            min='1992'
            max='2022'
            placeholder='2021'
          />
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar vehiculo
        </button>
      </form>
    </div>
  );
};

export default Vehiculos;
