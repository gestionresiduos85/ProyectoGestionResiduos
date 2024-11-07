import React from 'react'
import { supabase } from '../../backend/client'  // Importa el cliente de supabase para interactuar con la base de datos
import { useState } from 'react'  // useState se usa para manejar el estado en los componentes de React
import { Link, useNavigate } from 'react-router-dom'  // Link se usa para crear enlaces de navegación, useNavigate para redireccionar

const Login = () => {

    // Estado para el email, contraseña, mensajes de error, éxito y visibilidad de la contraseña
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()  // Hook para redireccionar al usuario después del login exitoso

    // Función para alternar la visibilidad de la contraseña
    const visbilidadPassword = () => {
        setShowPassword(!showPassword);
    }

    // Maneja el evento de submit del formulario de login
    const manejarSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (que recargue la página)
        setErrorMessage('');  // Limpia los mensajes previos de error y éxito
        setSuccessMessage('');

        // Verifica si los campos están vacíos
        if (!email.trim() || !password.trim()) {
            setErrorMessage('Todos los campos son obligatorios');  // Muestra un error si falta un campo
            return;
        }

        try {
            // Intenta iniciar sesión con Supabase usando el email y la contraseña
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            // Maneja errores de inicio de sesión
            if (error) {
                if (error.message == 'Email not confirmed') {
                    setErrorMessage('Por favor revisar tu correo para confirmar tu cuenta!');
                } else if(error.message == 'Invalid login credentials') {
                    setErrorMessage('Credenciales inválidas, por favor intenta de nuevo');
                }
            } else {
                setSuccessMessage('Login exitoso!');  // Si el login es exitoso, muestra un mensaje de éxito
                setErrorMessage('');
                navigate('/app');  // Redirecciona al usuario a la página principal de la app
            }
        } catch (error) {
            setErrorMessage('Unexpected error occurred. Please try again.');  // Muestra un mensaje si ocurre un error inesperado
        }
    }

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
                        <p className='text-xl font-semibold text-center my-10 mx-10'>
                            Regístrate para acceder y empezar a <br /><span className='text-green-500'>Gestionar residuos</span>
                        </p>
                    </div>
                    <div className="flex flex-rows items-center space-x-4">
                    </div>
                    {/* Mensajes de error y éxito */}
                    {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
                    {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}
                    {/* Formulario de inicio de sesión */}
                    <form className='w-full' onSubmit={manejarSubmit}>
                        <div className='mb-4 space-y-3'>
                            <div className='space-y-1'>
                                <div className='space-y-2'>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email"></label>
                                    <input
                                        className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                        id="email" placeholder="Email" name="email"
                                        onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado del email
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password"></label>
                                    <div className='relative'>
                                        <input
                                            className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                                            id="password" placeholder="Password (Debe contener al menos 8 caracteres )" name="password"
                                            type={showPassword ? 'text' : 'password'}  // Alterna el tipo de input para mostrar u ocultar la contraseña
                                            onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado de la contraseña
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 rounded-e-md"
                                            onClick={visbilidadPassword}  // Cambia la visibilidad de la contraseña
                                        >
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Botón de envío del formulario */}
                            <button className="flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 disabled:opacity-50" type="submit">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <div className='mt-4 flex justify-between'>
                        {/* Enlaces para registro y recuperación de contraseña */}
                        <div className="text-center">
                            No tienes cuenta?<br></br><Link className="text-blue-500 underline" to={'/registrar'}>Crea Una</Link>
                        </div>
                        <div className="text-center">
                            ¿Olvidaste tu contraseña? <br></br><Link className="text-blue-500 underline" to={'/olvide-password'}>Recupérala aquí</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
