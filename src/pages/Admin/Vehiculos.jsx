import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const vehiculosBackEnd = [
    {
        nombre: "Corolla",
        Marca: "Renault",
        Modelo: 2020
    },

    {
        nombre: "Sandero",
        Marca: "Reanult",
        Modelo: 2014
    },

    {
        nombre: "Rav4",
        Marca: "Toyota",
        Modelo: 2021
    },

    {
        nombre: "Fiesta",
        Marca: "Ford",
        Modelo: 2017
    },

    {
        nombre: "Mazda 3",
        Marca: "Mazda",
        Modelo: 2014
    },
    {
        nombre: "Onix",
        Marca: "Chevrolet",
        Modelo: 2014
    }
]

const Vehiculos = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true)
    const [vehiculos, setvehiculos] = useState([])
    const [textoBoton, settextoBoton] = useState('Crear Nuevo Vehiculo')
    const [colorBoton, setcolorBoton] = useState('indigo')

    useEffect(() => {
        setvehiculos(vehiculosBackEnd)
    }, [])


    useEffect(() => {
        if (mostrarTabla) {
            settextoBoton('Crear Nuevo Vehiculo')
            setcolorBoton('indigo')
        } else {
            settextoBoton('Mostrar Todos Los Vehiculos')
            setcolorBoton('green')

        }

    }, [mostrarTabla])


    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col '>
                <h2 className='text-3xl font-extrabold text-gray-900'>Pagina Administracion de Vehiculos</h2>
                <button onClick={() => { setmostrarTabla(!mostrarTabla) }}
                    className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`} >
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (<TablaVehiculos listaVehiculos={vehiculos} />
            ) : (
                <FormularioCreacionVehiculos
                    funcionParaCambiarTabla={setmostrarTabla}
                    listaVehiculos={vehiculos}
                    funcionParaAgregarVehiculoTabla={setvehiculos}
                />
            )}
            <ToastContainer position="bottom-center" autoClose={5000} />
        </div>
    )
}

const TablaVehiculos = ({ listaVehiculos }) => {
    useEffect(() => {
        console.log("este es el listado de vehiculos en el componente de tabla", listaVehiculos)
    }, [listaVehiculos])
    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800 '>Todos Los Vehiculos</h2>
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
                                <td>{vehiculo.Marca}</td>
                                <td>{vehiculo.Modelo}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
const FormularioCreacionVehiculos = ({
    funcionParaCambiarTabla,
    listaVehiculos,
    funcionParaAgregarVehiculoTabla
}) => {
    const [nombre, setnombre] = useState()
    const [marca, setmarca] = useState()
    const [modelo, setmodelo] = useState()

    const enviarAlBackend = () => {
        console.log('Nombre: ', nombre, "Marca: ", marca, "Modelo: ", modelo)
        toast.success('Vehiculo creado con Exito')
        funcionParaCambiarTabla(true)
        funcionParaAgregarVehiculoTabla([
            ...listaVehiculos,
            { nombre: nombre, Marca: marca, Modelo: modelo },
        ])
    }


    return (
        <div className='flex flex-col  items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800 '>Crear Nuevo Vehiculo</h2>
            <form className='flex flex-col'>
                <label htmlFor="nombre" className='flex flex-col'>
                    Nombre del Vehiculo
                    <input
                        name='nombre'
                        className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
                        type="text"
                        placeholder='Corolla'
                        value={nombre}
                        onChange={(e) => {
                            setnombre(e.target.value)
                        }
                        }
                    />
                </label>
                <label htmlFor="Marca" className='flex flex-col'>
                    Marca del Vehiculo
                    <select
                        name='marca'
                        className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
                        value={marca}
                        onChange={(e) => {
                            setmarca(e.target.value)
                        }
                        }
                    >
                        <option disabled>Seleccione una opcion</option>
                        <option >Renault</option>
                        <option >Toyota</option>
                        <option >Ford</option>
                        <option >Mazda</option>
                        <option >Chevrolet</option>
                    </select>
                </label>
                <label htmlFor="Modelo" className='flex flex-col'>
                    Modelo del Vehiculo
                    <input
                        name='Modelo'
                        className='bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border'
                        type="number"
                        min='1992'
                        max='2022'
                        placeholder='2021'
                        value={modelo}
                        onChange={(e) => {
                            setmodelo(e.target.value)
                        }
                        }
                    />
                </label>
                <button
                    type='button'
                    className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
                    onClick={() => {
                        enviarAlBackend()
                    }}
                >    Guardar vehiculo</button>

            </form>
        </div>
    )
}

export default Vehiculos

