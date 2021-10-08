import React, { useEffect, useState } from 'react'

const Vehiculos = () => {

    const [edad, setEdad] = useState(0);
    const [esMenorEdad, setesMenorEdad] = useState(false);
    const [mostrarCamposAdicionales, setmostrarCamposAdicionales] = useState(false)

    useEffect(() => {
        if (edad >= 18) {
            setesMenorEdad(false);
        } else {
            setesMenorEdad(true);
        }

    }, [edad])




    return (
        <form className='flex flex-col'>
            <h2>Formulario de Creacion de Vehiculos</h2>
            <label htmlFor="edad">
                Por favor ingrese su edad
            </label>
            <input value={edad} onChange={(e) => { setEdad(e.target.value) }} className='boder border-gray-600' name='edad' type="number" />
            {esMenorEdad ? (
                <span className='text-3xl text-red-500'>
                    !Usted es menor de edad, no puede hacer pagos!</span>

            ) : (
                <span className='text-3xl text-green-500'>!Usted es mayor de edad, si puede hacer pagos!</span>
            )}
            <button 
            type='button' 
            onClick={() => setmostrarCamposAdicionales(!mostrarCamposAdicionales)}
             className='text-white bg-indigo-500'>
                 Mostrar campos adicionales</button>

            {mostrarCamposAdicionales &&
                <div>
                    <input className='border bg-gray-400 my-2 p-3' placeholder='Dato Nuevo' type="text" />
                    <input className='border bg-gray-400 my-2 p-3' placeholder='Dato Nuevo' type="text" />
                    <input className='border bg-gray-400 my-2 p-3' placeholder='Dato Nuevo' type="text" />
                    <input className='border bg-gray-400 my-2 p-3' placeholder='Dato Nuevo' type="text" />
                    <input className='border bg-gray-400 my-2 p-3' placeholder='Dato Nuevo' type="text" />
                </div>
            
            }
        </form>
    )
}

export default Vehiculos
