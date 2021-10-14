import { nanoid } from "nanoid";
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
      <div className='flex flex-col w-full '>
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
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='text-2xl font-extrabold text-gray-800 '>
        Todos Los Vehiculos
      </h2>
      <table className='tabla'>
        <thead className=''>
          <tr>
            <th>Nombre del Vehiculo</th>
            <th>Marca del Vehiculo</th>
            <th>Modelo del Vehiculo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map((vehiculo) => {
            return <FilaVehiculo key={nanoid()} vehiculo={vehiculo} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaVehiculo = ({ vehiculo }) => {
  const [edit, setedit] = useState(false);
  const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
    nombre: vehiculo.nombre,
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
  });

  const actualizarVehiculo = () => {
    console.log(infoNuevoVehiculo);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
              type='text'
              value={infoNuevoVehiculo.nombre}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  nombre: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
              type='text'
              value={infoNuevoVehiculo.marca}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  marca: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
              type='text'
              value={infoNuevoVehiculo.modelo}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  modelo: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{vehiculo.nombre}</td>
          <td>{vehiculo.marca}</td>
          <td>{vehiculo.modelo}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <i
              onClick={() => actualizarVehiculo()}
              className='fas fa-check text-green-700 hover:text-green-500'
            />
          ) : (
            <i
              onClick={() => setedit(!edit)}
              className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
            />
          )}
          <i className='fas fa-trash text-red-700 hover:text-red-500' />
        </div>
      </td>
    </tr>
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
