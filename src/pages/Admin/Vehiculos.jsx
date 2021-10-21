import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import { obtenerVehiculos } from "utils/api";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Vehiculos = () => {
  const [mostrarTabla, setmostrarTabla] = useState(true);
  const [vehiculos, setvehiculos] = useState([]);
  const [textoBoton, settextoBoton] = useState("Crear Nuevo Vehiculo");
  const [colorBoton, setcolorBoton] = useState("indigo");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log("consulta", ejecutarConsulta);
    obtenerVehiculos(setvehiculos, setEjecutarConsulta);
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

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
        <TablaVehiculos
          listaVehiculos={vehiculos}
          setEjecutarConsulta={setEjecutarConsulta}
        />
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

const TablaVehiculos = ({ listaVehiculos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("");
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState(listaVehiculos);

  useEffect(() => {
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
              return (
                <FilaVehiculo
                  key={nanoid()}
                  vehiculo={vehiculo}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {vehiculosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
              <span>{el.brand}</span>
              <span>{el.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVehiculo = ({ vehiculo, setEjecutarConsulta }) => {
  console.log("vehiculo", vehiculo);
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
    name: vehiculo.name,
    brand: vehiculo.brand,
    model: vehiculo.model,
  });

  const actualizarVehiculo = async () => {
    const options = {
      method: "PATCH",
      url: "http://localhost:5000/vehiculos/editar",
      headers: { "Content-Type": "application/json" },
      data: { ...infoNuevoVehiculo, id: vehiculo._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Vehiculo modificado con Exito");
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error modificando el Vehiculo");
        console.error(error);
      });
  };
  const eliminarVehiculo = async () => {
    const options = {
      method: "DELETE",
      url: "http://localhost:5000/vehiculos/eliminar",
      headers: { "Content-Type": "application/json" },
      data: { id: vehiculo._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Vehiculo eliminado con Exito");
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error eliminando el Vehiculo");
      });
    setOpenDialog(false);
  };
  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
              type='text'
              value={infoNuevoVehiculo.name}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  name: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
              type='text'
              value={infoNuevoVehiculo.brand}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  brand: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
              type='text'
              value={infoNuevoVehiculo.model}
              onChange={(e) =>
                setInfoNuevoVehiculo({
                  ...infoNuevoVehiculo,
                  model: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{vehiculo.name}</td>
          <td>{vehiculo.brand}</td>
          <td>{vehiculo.model}</td>
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
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Vehiculo' arrow>
                <i
                  onClick={() => setEdit(!edit)}
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
              <button
                onClick={() => eliminarVehiculo()}
                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              >
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

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoVehiculo = {};
    fd.forEach((value, key) => {
      nuevoVehiculo[key] = value;
    });

    const options = {
      method: "POST",
      url: "http://localhost:5000/vehiculos/nuevo",
      headers: { "Content-Type": "application/json" },
      data: {
        name: nuevoVehiculo.name,
        brand: nuevoVehiculo.brand,
        model: nuevoVehiculo.model,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Vehiculo agregado con Exito");
      })
      .catch(function (error) {
        console.error(error);
        toast.success("Error creando Vehiculo");
      });
    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col  items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800 '>
        Crear Nuevo Vehiculo
      </h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label htmlFor='name' className='flex flex-col'>
          Nombre del Vehiculo
          <input
            required
            name='name'
            className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
            type='text'
            placeholder='Corolla'
          />
        </label>
        <label htmlFor='brand' className='flex flex-col'>
          Marca del Vehiculo
          <select
            required
            name='brand'
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
        <label htmlFor='model' className='flex flex-col'>
          Modelo del Vehiculo
          <input
            required
            name='model'
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
