// Importa el módulo React necesario para crear el componente.
import React from 'react';

// Define el componente funcional 'Footer', que representa el pie de página de la aplicación.
const Footer = () => {
  return (
    // Define el contenedor principal del pie de página, aplicando clases de estilo para el fondo y la alineación.
    <footer className='bg-lime-600 text-black py-4 flex flex-wrap justify-center items-center'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 max-w-full'>
        
        {/* Sección de derechos de autor y texto en general */}
        <div className='text-sm text-center sm:text-left mb-4 sm:mb-0'>
          <p>© 2024 App Web de Gestión de Residuos. Todos los derechos reservados.</p>
        </div>
        
        {/* Enlace con información sobre el proyecto */}
        <div className='flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0'>
          <a href="/app/acerca-proyecto" className='text-sm hover:underline'>Acerca del proyecto</a>
        </div>
      </div>
    </footer>
  )
}

// Exporta el componente Footer para que pueda ser usado en otras partes de la aplicación.
export default Footer;
