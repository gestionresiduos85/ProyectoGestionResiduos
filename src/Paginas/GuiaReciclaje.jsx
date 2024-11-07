import React from 'react';

const GuiaReciclaje = () => {
  // Lista de materiales reciclables con sus características y consejos.
  const materiales = [
    {
      nombre: 'Papel y Cartón',  // Nombre del material
      imagen: '/papel.jpg',  // Ruta de la imagen asociada al material
      ejemplos: 'Revistas, periódicos, cajas de cartón, hojas de papel',  // Ejemplos comunes del material
      consejos: 'Asegúrate de que el papel esté limpio y seco. Evita reciclar papel encerado, plastificado o sucio, ya que estos no se pueden procesar correctamente.',  // Consejos para el reciclaje adecuado
    },
    {
      nombre: 'Plástico',
      imagen: '/plastico.jpg',
      ejemplos: 'Botellas de bebidas, envases de productos de limpieza, bolsas plásticas',
      consejos: 'Lava los envases para eliminar restos de alimentos o líquidos. Revisa el número de reciclaje en el envase para identificar su tipo de plástico y su reciclabilidad.',
    },
    {
      nombre: 'Vidrio',
      imagen: '/vidrio.jpg',
      ejemplos: 'Botellas de bebidas, frascos de alimentos',
      consejos: 'Evita mezclar vidrio con materiales como cerámica, espejos o vidrios rotos, que no se pueden reciclar en las mismas plantas. Limpia los frascos y botellas antes de reciclarlos.',
    },
    {
      nombre: 'Metal',
      imagen: '/metal.jpg',
      ejemplos: 'Latas de refrescos, latas de comida, envases de aluminio',
      consejos: 'Aplasta las latas para ahorrar espacio. Limpia los restos de comida antes de reciclar y verifica si tu centro de reciclaje acepta aerosoles o envases metálicos especiales.',
    },
    {
      nombre: 'Orgánico',
      imagen: '/organico.jpg',
      ejemplos: 'Restos de comida, cáscaras de frutas y vegetales, restos de poda',
      consejos: 'Separa los residuos orgánicos para hacer compost. Evita incluir materiales inorgánicos como plásticos o metales en los residuos orgánicos.',
    },
    {
      nombre: 'Residuos Peligrosos',
      imagen: '/bateria.jpg',
      ejemplos: 'Pilas, baterías, dispositivos electrónicos',
      consejos: 'Estos residuos deben llevarse a centros de acopio especializados. No los deseches en la basura común, ya que contienen sustancias tóxicas que pueden contaminar el medio ambiente.',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 text-gray-800">
      {/* Título principal de la sección */}
      <h2 className="text-3xl font-bold mb-6 underline">Guía de Reciclaje</h2>
      {/* Descripción introductoria */}
      <p className="mb-8 text-lg">
        Aprende cómo reciclar correctamente cada tipo de material para reducir la contaminación y contribuir al medio ambiente.
      </p>
      {/* Contenedor de materiales en una cuadrícula responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Iteración sobre la lista de materiales para mostrar cada uno */}
        {materiales.map((material, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
            {/* Imagen del material reciclable */}
            <img
              src={material.imagen}
              alt={`Imagen de ${material.nombre}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            {/* Nombre del material */}
            <h3 className="text-xl font-semibold mb-2">{material.nombre}</h3>
            {/* Ejemplos de objetos que pertenecen a este material */}
            <p className="text-gray-600"><strong>Ejemplos:</strong> {material.ejemplos}</p>
            {/* Consejos para el reciclaje adecuado de este material */}
            <p className="text-gray-700 mt-2"><strong>Consejos:</strong> {material.consejos}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuiaReciclaje;
