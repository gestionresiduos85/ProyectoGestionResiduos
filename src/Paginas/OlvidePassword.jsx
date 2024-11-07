import React from 'react'
import { useState } from 'react'  // useState para manejar los estados del componente
import { supabase } from '../../backend/client'  // Supabase se usa para interactuar con el backend
import { Link, useNavigate } from 'react-router-dom'  // Link para navegar a otras rutas y useNavigate para redireccionar programáticamente

const OlvidePassword = () => {

  // Estados para el email, mensajes de error y éxito
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Hook para redirigir programáticamente

  // Función que valida si el correo tiene un formato válido utilizando una expresión regular
  const validarEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);  // Retorna true si el email tiene un formato válido
  }

  // Función para manejar el envío del formulario de restablecimiento de contraseña
  const manejarPassword = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario

    // Verifica si el correo tiene un formato válido
    if (!validarEmail(email)) {
      setErrorMessage('Por favor ingresa un correo valido');  // Si no es válido, muestra el mensaje de error
      setSuccessMessage('');  // Limpia el mensaje de éxito
      return;
    }

    // Llama a la API de Supabase para enviar el correo de restablecimiento de contraseña
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/actualizar-password',  // URL de redirección una vez se confirme el cambio de contraseña
    })

    // Maneja el caso de error al enviar el correo
    if (error) {
      setErrorMessage(error.message);  // Muestra el mensaje de error
      setSuccessMessage('');  // Limpia el mensaje de éxito
    } else {
      // Si no hay error, muestra un mensaje de éxito
      setSuccessMessage('Se envio un correo para restablecer tu contraseña');
      setErrorMessage('');  // Limpia el mensaje de error
    }
  }

  return (
    <div className='bg-white'>
      <div className='relative flex h-screen flex-col items-center justify-center bg-cover bg-center'
        style={{ backgroundImage: `url('/plant.jpg')` }}>

        <div className="absolute inset-0 bg-white bg-opacity-50 blur-sm"></div>  {/* Capa para el fondo con opacidad */}

        <div className='relative max-w-md sm:max-w-md mt-6 px-3 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg'>
          <header className='rounded-t-lg bg-green-800 p-4'>
            <div>
              <img
                src='/img.svg'
                alt='Logo de Reciclaje'
                className='h-16 w-full mx-auto'  // Logo centrado
              />
            </div>
          </header>
          <div className='mb-8 space-y-3'>
            <p className='text-xl font-semibold text-center my-10'>
              Llena este formulario para restablecer tu contraseña
            </p>
          </div>

          {/* Muestra mensajes de error o éxito */}
          {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
          {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}

          {/* Formulario de restablecimiento de contraseña */}
          <form className='w-full' onSubmit={manejarPassword}>
            <div className='mb-4 space-y-3'>
              <div className='space-y-1'>
                {/* Campo de entrada para el email */}
                <input
                  className="border rounded-md h-10 w-full py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 px-4"
                  id="email"
                  type="email"
                  placeholder="Introduce tu email"
                  name="email"
                  value={email}  // El valor del input es el estado email
                  onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado email cuando cambia el valor
                  required  // Campo obligatorio
                />
              </div>
              {/* Botón para enviar el formulario */}
              <button className="flex h-10 w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 disabled:opacity-50" type="submit">
                Enviar
              </button>
            </div>
          </form>

          {/* Enlace para volver a la pantalla de inicio de sesión */}
          <div className="text-center">
            <Link className='text-blue-500 underline' to={'/'}>Regresar a Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OlvidePassword
