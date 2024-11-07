import React from 'react'
import { supabase } from '../../backend/client';  // Importa el cliente de supabase
import { Link } from 'react-router-dom';  // Importa Link de react-router para la navegación
import { useState } from 'react';  // Importa useState para manejar los estados

const Registrar = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Función para mostrar u ocultar la contraseña
    const visbilidadPassword = () => {
        setShowPassword(!showPassword);
    }

    // Función para manejar el registro
    const manejarRegistro = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (recarga de página)
        setErrorMessage('');  // Limpia los mensajes previos
        setSuccessMessage('');

        // Validaciones de los campos
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            // Registro en Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 'http://localhost:5173/app',  // URL de redirección después de la confirmación del correo
                    shouldCreateUser: true  // Crear el usuario en Supabase
                }
            });

            // Manejo de errores o éxito
            if (error) {
                setErrorMessage(error.message);
            } else {
                setSuccessMessage('Registración exitosa!, revisar tu correo para confirmar tu cuenta');
                // Limpiar los campos después de un registro exitoso
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setErrorMessage("Error inesperado, intentalo de nuevo");
        }
    }

    return (
        <div className='bg-white'>
            <div className='relative flex h-screen flex-col items-center justify-center bg-cover bg-center' 
                 style={{ backgroundImage: `url('/plant.jpg')` }}>

                {/* Capa de fondo */}
                <div className="absolute inset-0 bg-white bg-opacity-50 blur-sm"></div>

                {/* Contenedor principal del formulario */}
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
                        <p className='text-xl font-semibold text-center my-10 mx-10'>
                            Llena este formulario para empezar a <span className='text-green-500'>Gestionar residuos</span>
                        </p>
                    </div>
                    {/* Mostrar mensajes de error o éxito */}
                    {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
                    {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}
                    
                    {/* Formulario */}
                    <form className='w-full' onSubmit={manejarRegistro}>
                        <div className='mb-4 space-y-3'>
                            <div className='space-y-1'>
                                {/* Campo de email */}
                                <div className='space-y-2'>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                        id="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {/* Campo de contraseña */}
                                <div className='relative'>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4 pr-10"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password (Debe contener al menos 8 caracteres )"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {/* Botón para mostrar/ocultar contraseña */}
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 rounded-e-md"
                                        onClick={visbilidadPassword}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {/* Campo de confirmar contraseña */}
                                <div className='relative'>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4 pr-10"
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirmar Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {/* Botón para mostrar/ocultar contraseña */}
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 rounded-e-md"
                                        onClick={visbilidadPassword}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>
                            {/* Botón de envío */}
                            <button className="flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 disabled:opacity-50" type="submit">
                                Regístrarse
                            </button>
                        </div>
                    </form>
                    {/* Enlace para ir a la página de inicio de sesión */}
                    <div className="text-center">
                        Ya tienes una cuenta? <Link className='text-blue-500 underline' to={'/'}>Inicia Sesión</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registrar
