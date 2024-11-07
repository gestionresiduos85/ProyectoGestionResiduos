import React, { useState } from 'react';
import { supabase } from '../../backend/client'; // Importa el cliente de Supabase
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Hooks de navegación

const ActualizarPassword = () => {

    const [newPassword, setNewPassword] = useState(''); // Almacena la nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Almacena la confirmación de la contraseña
    const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de las contraseñas

    const navigate = useNavigate(); // Hook para redirigir al usuario
    const location = useLocation(); // Hook para obtener la ubicación actual

    // Obtiene el token de la URL (aunque no se está utilizando)
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('token');

    // Función para alternar la visibilidad de las contraseñas
    const visbilidadPassword = () => {
        setShowPassword(!showPassword); // Alterna el estado de la visibilidad de las contraseñas
    }

    // Maneja la actualización de la contraseña
    const manejarPasswordUpdate = async (e) => {
        e.preventDefault();

        // Verifica que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setSuccessMessage('');
            return;
        }

        // Intenta actualizar la contraseña en Supabase
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        
        // Si ocurre un error, muestra un mensaje de error, de lo contrario, muestra un mensaje de éxito
        if (error) {
            setErrorMessage(`Error: ${error.message}`);
            setSuccessMessage('');
        } else {
            setSuccessMessage('Contraseña actualizada con éxito.');
            setErrorMessage('');
            // Redirige a la página de inicio de sesión después de la actualización exitosa
            navigate('/');
        }
    };

    return (
        <div className='bg-white'>
            <div className='relative flex h-screen flex-col items-center justify-center bg-cover bg-center'
                style={{ backgroundImage: `url('/plant.jpg')` }}>
                <div className="absolute inset-0 bg-white bg-opacity-50 blur-sm"></div>

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
                    <div className='mb-8 space-y-3'>
                        <p className='text-xl font-semibold text-center my-10'>
                            Actualiza tu contraseña, ingresa tu nueva contraseña
                        </p>
                    </div>

                    {/* Muestra los mensajes de error o éxito */}
                    {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
                    {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}

                    <form className='w-full' onSubmit={manejarPasswordUpdate}>
                        <div className='mb-4 space-y-3'>
                            {/* Campo para la nueva contraseña */}
                            <div className='space-y-1'>
                                <div className='relative'>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                        id="newPassword"
                                        type={showPassword ? 'text' : 'password'} // Muestra u oculta la contraseña
                                        placeholder="Introduce tu nueva contraseña"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} // Actualiza el estado al cambiar el valor
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 rounded-e-md"
                                        onClick={visbilidadPassword} // Alterna la visibilidad
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Campo para confirmar la nueva contraseña */}
                            <div className='space-y-1'>
                                <div className='relative'>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'} // Muestra u oculta la contraseña
                                        placeholder="Confirma tu nueva contraseña"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado al cambiar el valor
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 rounded-e-md"
                                        onClick={visbilidadPassword} // Alterna la visibilidad
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Botón para enviar el formulario */}
                            <button className="flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 disabled:opacity-50" type="submit">
                                Actualizar Contraseña
                            </button>
                        </div>
                    </form>

                    {/* Enlace para regresar al inicio de sesión */}
                    <div className="text-center">
                        <Link className='text-blue-500 underline' to={'/'}>Regresar a Iniciar Sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActualizarPassword;
