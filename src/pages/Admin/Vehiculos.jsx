import { nanoid } from "nanoid";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

const vehiculosBackEnd = [
  {
    nombre: "Corolla",
    marca: "Renault",
    modelo: 2020,
  },

  {
    nombre: "Sandero",
    marca: "Renault",
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
  const [busqueda, setBusqueda] = useState("");
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState(listaVehiculos);

  useEffect(() => {
    console.log("busqueda", busqueda);
    console.log("lista original", listaVehiculos);
    setVehiculosFiltrados(
      listaVehiculos.filter((elemento) => {
        console.log("elemento", elemento);
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVehiculos]);

  return (
    <div className='flex flex-col items-center justify-center w-full '>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500 '
      />
      <h2 className='text-2xl font-extrabold text-gray-800 '>
        Todos Los Vehiculos
      </h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla '>
          <thead className=''>
            <tr>
              <th>Nombre del Vehiculo</th>
              <th>Marca del Vehiculo</th>
              <th>Modelo del Vehiculo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map((vehiculo) => {
              return <FilaVehiculo key={nanoid()} vehiculo={vehiculo} />;
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {vehiculosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.nombre}</span>
              <span>{el.marca}</span>
              <span>{el.modelo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVehiculo = ({ vehiculo }) => {
  const [edit, setedit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
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
            <>
              <Tooltip title='Confirmar Edicion' arrow>
                <i
                  onClick={() => actualizarVehiculo()}
                  className='fas fa-check text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancelar Edicion' arrow>
                <i className='fas fa-ban text-red-700 hover:text-red-500' />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Vehiculo' arrow>
                <i
                  onClick={() => setedit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Vehiculo' arrow placement='bottom'>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              Esta Seguro de querer eliminar el Vehiculo?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'>
                Si
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
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
