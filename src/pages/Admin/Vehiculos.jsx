import React, { useEffect, useState } from 'react'

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

    useEffect(()=>{
        setvehiculos(vehiculosBackEnd)
    },[])


    useEffect(() => {
        if (mostrarTabla) {
            settextoBoton('Crear Nuevo Vehiculo')
        } else {
            settextoBoton('Mostrar Todos Los Vehiculos')

        }

    }, [mostrarTabla])


    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col '>
                <h2 className='text-3xl font-extrabold text-gray-900'>Pagina Administracion de Vehiculos</h2>
                <button onClick={() => { setmostrarTabla(!mostrarTabla) }}
                    className='text-white bg-indigo-500 p-5 rounded-full m-6 w-28 self-end' >
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? <TablaVehiculos listaVehiculos={vehiculos} /> : <FormularioCreacionVehiculos />}
        </div>
    )
}

const TablaVehiculos = ({listaVehiculos}) => {
    useEffect(()=>{
        console.log("este es el listado de vehiculos en el componente de tabla", listaVehiculos)
    },[listaVehiculos])
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
                        return(
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
const FormularioCreacionVehiculos = () => {
    return (
        <div className='flex flex-col  items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800 '>Crear Nuevo Vehiculo</h2>
            <form className='grid grid-cols-2'>
                <input className=' bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border  ' type="text" />
                <input className=' bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border ' type="text" />
                <input className=' bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border ' type="text" />
                <input className=' bg-gray-50 border-gray-600 p-2 rounded-lg m-2 border ' type="text" />
                <button className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'>Guardar vehiculo</button>
            </form>
        </div>
    )
}

export default Vehiculos

