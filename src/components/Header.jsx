// Importa React para usar JSX y crear componentes de React.
import React from 'react';
// Importa el componente 'LogOutButton', que probablemente maneja la acción de cerrar sesión.
import LogOutButton from './LogOutBoton';
// Importa 'Link' de 'react-router-dom' para manejar la navegación sin recargar la página.
import { Link } from 'react-router-dom';

// Define el componente funcional 'Header', que representa la cabecera de la aplicación.
const Header = () => {
  return (
    // Contenedor principal del encabezado con un fondo de color y un poco de sombra.
    <header className="w-full bg-lime-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center hover:cursor-pointer hover:underline">
        
        {/* Enlace que redirige a la página principal de la aplicación. */}
        <Link to="/app" className="text-2xl sm:text-3xl font-bold text-black">
          App Web de Gestión de Residuos
        </Link>
        
        {/* Contenedor para el botón de cerrar sesión (LogOutButton) */}
        <nav className="mt-4 sm:mt-0">
          <LogOutButton />
        </nav>
      </div>
    </header>
  )
}

// Exporta el componente 'Header' para que pueda ser utilizado en otras partes de la aplicación.
export default Header;
