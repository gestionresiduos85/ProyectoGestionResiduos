import React from 'react'
import { Link } from 'react-router-dom'  // Link de React Router para navegar entre páginas

const Profile = () => {
  return (
    // Contenedor principal con diseño flexible y un espacio de relleno
    <div className="flex flex-col gap-4 p-6 h-screen bg-white rounded shadow-lg">
        
        {/* Título de la sección */}
        <h1 className="text-xl font-bold underline">Ajustes de Perfil</h1>
        
        {/* Descripción explicativa sobre lo que el usuario puede hacer */}
        <p className='text-lg'>En este espacio puedes cambiar tu correo y contraseña</p>
        
        {/* Botón para cambiar la contraseña */}
        <div className='mt-4'>
          <Link to="/actualizar-password">  {/* Enlace a la página de actualización de contraseña */}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-black rounded"  // Estilos de color y espaciado para el botón
            >
              Cambiar Contraseña
            </button>
          </Link>
        </div>
        
        {/* Botón para cambiar el correo */}
        <div className='mt-4'>
          <Link to="/app/actualizar-correo">  {/* Enlace a la página de actualización de correo */}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-black rounded"  // Estilos similares para el botón
            >
              Cambiar Correo
            </button>
          </Link>
        </div>
      
    </div>
  )
}

export default Profile
