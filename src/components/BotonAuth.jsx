// Importa el módulo React necesario para crear el componente.
import React from 'react';

// Define el componente funcional 'BotonAuth', que recibe tres props:
// - onClick: la función que se ejecuta cuando el botón es clickeado.
// - icon: un componente React que representa el icono del botón.
// - label: el texto que se muestra en el botón.
const BotonAuth = ({ onClick, icon: Icon, label }) => {
    return (
        // El botón que se renderiza con las propiedades definidas anteriormente.
        <button
            // Asocia la función 'onClick' que se pasa como prop al evento de clic del botón.
            onClick={onClick}
            
            // Aplica clases de estilo al botón para diseño y accesibilidad.
            className="flex items-center justify-center w-full h-10 px-4 py-2 mb-2 space-x-2 text-sm font-medium text-black bg-yellow-400 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text"
            
            // Utiliza el texto proporcionado en 'label' como el valor del atributo 'aria-label' para accesibilidad.
            aria-label={label}
        >
            {/* Renderiza el componente icono (pasado como prop) con el tamaño especificado. */}
            <Icon className="w-5 h-5" />
            
            {/* Muestra el texto proporcionado en la prop 'label' dentro del botón. */}
            <span>{label}</span>
        </button>
    );
}

// Exporta el componente BotonAuth para que pueda ser usado en otros archivos de la aplicación.
export default BotonAuth;
