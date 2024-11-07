// Importa los hooks necesarios de React y el cliente supabase para interactuar con la base de datos.
import React, { useState, useEffect } from 'react';
import { supabase } from '../../backend/client';
import { Link } from 'react-router-dom';

const ActualizarCorreo = () => {
    // Estado local para almacenar el nuevo correo, los mensajes de error y éxito, y el correo del usuario actual.
    const [newEmail, setNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Hook useEffect para obtener el correo electrónico del usuario actual al montar el componente.
    useEffect(() => {
        const getUserEmail = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email);
            }
        };

        getUserEmail();
    }, []);

    // Funciones para actualizar el correo en las tablas correspondientes de la base de datos (residuos, transporte, generadores).
    const actualizarResiduo = async () => {
        const { data, error } = await supabase
            .from('residuos')
            .update({ correo_id: newEmail })
            .eq('correo_id', userEmail);
        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            return;
        }
    }

    const actualizarTransporte = async () => {
        const { data, error } = await supabase
            .from('transporte')
            .update({ correo_id: newEmail })
            .eq('correo_id', userEmail);
        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            return;
        }
    }

    const actualizarGenerador = async () => {
        const { data, error } = await supabase
            .from('generadores')
            .update({ correo_id: newEmail })
            .eq('correo_id', userEmail);
        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            return;
        }
    }

    // Función que maneja la actualización del correo, incluyendo validaciones y llamadas a la base de datos.
    const manejarActualizacion = async (e) => {
        e.preventDefault();

        // Obtener la sesión del usuario actual.
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
            setErrorMessage(`Error: ${userError.message}`);
            setSuccessMessage('');
            return;
        }

        // Verifica si el nuevo correo es el mismo que el correo actual.
        if (user.email === newEmail) {
            setErrorMessage('El correo nuevo no puede ser igual al correo actual.');
            setSuccessMessage('');
            return;
        }

        // Llamadas a funciones para actualizar las tablas correspondientes con el nuevo correo.
        await actualizarResiduo();
        await actualizarTransporte();
        await actualizarGenerador();

        // Actualiza el correo del usuario en la autenticación de Supabase.
        const { error } = await supabase.auth.updateUser({ email: newEmail });

        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            setSuccessMessage('');
        } else {
            setSuccessMessage('Correo actualizado con éxito, revisa tu correo para confirmar la cuenta nueva.');
            setErrorMessage('');
        }
    };

    return (
        <div className='bg-white'>
            {/* Fondo con imagen de planta y efecto de desenfoque */}
            <div className='relative flex h-screen flex-col items-center justify-center bg-cover bg-center'
                style={{ backgroundImage: `url('/plant.jpg')` }}>
                <div className="absolute inset-0 bg-white bg-opacity-50 blur-sm"></div>

                {/* Contenedor principal del formulario con estilo */}
                <div className='relative max-w-md sm:max-w-md mt-6 px-3 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg'>
                    <header className='rounded-t-lg bg-green-800 p-4'>
                        <div>
                            <img
                                src='/img.svg'
                                alt='Logo de Reciclaje'
                                className='h-16 w-full mx-auto'
                            />
                        </div>
                    </header>
                    {/* Título de la sección */}
                    <div className='mb-8 space-y-3'>
                        <p className='text-xl font-semibold text-center my-10'>
                            Actualiza tu correo, ingresa tu nuevo correo
                        </p>
                    </div>

                    {/* Mensajes de error o éxito */}
                    {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
                    {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}

                    {/* Formulario para ingresar el nuevo correo */}
                    <form className='w-full' onSubmit={manejarActualizacion}>
                        <div className='mb-4 space-y-3'>
                            <div className='space-y-1'>
                                <div className='relative'>
                                    {/* Campo de entrada para el nuevo correo */}
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                        id="newCorreo"
                                        type="email"
                                        placeholder="Introduce tu nuevo correo"
                                        name="newCorreo"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Botón para actualizar el correo */}
                            <button className="flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 disabled:opacity-50" type="submit">
                                Actualizar Correo
                            </button>
                        </div>
                    </form>

                    {/* Enlace para regresar a la página de inicio de sesión */}
                    <div className="text-center">
                        <Link className='text-blue-500 underline' to={'/'}>Regresar a Iniciar Sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActualizarCorreo;
