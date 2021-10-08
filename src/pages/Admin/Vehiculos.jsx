import React, { useEffect, useState } from 'react'

const Vehiculos = () => {

    const [nombreVehiculo, setNombreVehiclo] = useState('');

    useEffect(() => {
        console.log("Hola , Soy un Effect que se ejecuta una vez cuando la pagian se renderiza,pq tiene el array de dependencias vacio "
        );

    }, []);

    useEffect(() => {
        console.log("Esta es una funcion que se jejecuta cada que cmabia el valor de nombre Vehiculo")
        console.log("El valor de la variable es" , nombreVehiculo)
    },[nombreVehiculo]);

    const enviarDatosAlBackEnd =() =>{
        console.log('El Valor de la variables nombreVehiculo es ', nombreVehiculo)        
    }




    return (
        <form className='flex flex-col'>
            <h4>Formulario de Creacion de Vehiculos</h4>
            <input onChange={(e) => {
                setNombreVehiclo(e.target.value);
            }}
                type="text"
                placeholder='Nombre del Vehiculo' />
            <input onChange={(e) => {
                console.log('Marca: ', e.target.value);
            }}
                type="text"
                placeholder='Marca del Vehiculo' />
            <input type="text" placeholder='Modelo del Vehiculo' />
            <button type='button' onClick={enviarDatosAlBackEnd} className='bg-indigo-500 text-white'>Enviar Datos</button>

        </form>
    )
}

export default Vehiculos
