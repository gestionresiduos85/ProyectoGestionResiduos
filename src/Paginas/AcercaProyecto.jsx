// Importa React para crear el componente funcional.
import React from 'react';

const AcercaProyecto = () => {
  return (
    // Contenedor principal con padding y un ancho máximo de 3xl, centrado en la pantalla.
    <div className="p-6 max-w-3xl mx-auto font-sans text-gray-800">
      {/* Título principal de la página */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">Acerca del Proyecto</h1>
      
      {/* Párrafo introductorio sobre el propósito del proyecto */}
      <p className="mb-6">
        Bienvenido a nuestro sistema de <strong>gestión de residuos</strong>, una plataforma diseñada para facilitar el registro, administración y control de residuos. Este proyecto busca contribuir al cuidado del medio ambiente optimizando la forma en que se gestionan los desechos, promoviendo prácticas de reciclaje y un uso más eficiente de los recursos.
      </p>
      
      {/* Subtítulo y lista de funcionalidades principales del sistema */}
      <h2 className="text-2xl font-semibold text-green-600 mb-3">Funcionalidades Principales</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        {/* Cada funcionalidad del sistema detallada en una lista */}
        <li>
          <strong>Registro y gestión de residuos:</strong> Los usuarios pueden registrar nuevos residuos, editarlos y eliminarlos según sea necesario, facilitando un control preciso de la información.
        </li>
        <li>
          <strong>Gestión de generadores y transporte:</strong> El sistema permite gestionar los generadores de residuos (como empresas o individuos) y los transportes utilizados para movilizar dichos desechos.
        </li>
        <li>
          <strong>Guía de reciclaje:</strong> Incluye una sección con una pequeña guía de reciclaje, que orienta a los usuarios sobre prácticas adecuadas para separar y reciclar distintos tipos de materiales.
        </li>
        <li>
          <strong>Sistema de autenticación:</strong> Contamos con un sistema de <em>login</em> y <em>signup</em> que permite a los usuarios registrarse en la plataforma mediante correo electrónico y contraseña.
          {/* Lista anidada con detalles sobre el sistema de autenticación */}
          <ul className="list-disc list-inside ml-6">
            <li>Los usuarios pueden actualizar su correo electrónico y contraseña para mantener la seguridad de su cuenta.</li>
          </ul>
        </li>
      </ul>

      {/* Subtítulo sobre la importancia del proyecto para el medio ambiente */}
      <h2 className="text-2xl font-semibold text-green-600 mb-3">Importancia para el Medio Ambiente</h2>
      {/* Párrafos explicando la contribución del proyecto al cuidado ambiental */}
      <p className="mb-6">
        Este proyecto no solo busca simplificar la gestión de residuos, sino también promover una <strong>conciencia ambiental</strong> y fomentar una comunidad más responsable con el planeta. Al centralizar y mejorar la gestión de los desechos, ayudamos a reducir la contaminación y a <strong>optimizar los procesos de reciclaje</strong>, lo cual es fundamental para proteger los ecosistemas y combatir el cambio climático.
      </p>
      <p className="mb-6">
        Cada pequeño esfuerzo en el manejo adecuado de residuos suma para lograr un <strong>impacto positivo</strong> en el medio ambiente. Al proporcionar herramientas accesibles y prácticas, este proyecto busca incentivar tanto a individuos como a empresas a gestionar sus desechos de forma responsable, contribuyendo a reducir la huella de carbono y promoviendo un futuro más sostenible.
      </p>
      
      {/* Subtítulo que describe la interfaz visual del sistema */}
      <h2 className="text-2xl font-semibold text-green-600 mb-3">Interfaz y Estilo Visual</h2>
      {/* Párrafo que explica el enfoque visual del diseño */}
      <p className="mb-6">
        La interfaz de usuario ha sido diseñada con un enfoque visual ambiental, usando colores y elementos gráficos que evocan la naturaleza y la sostenibilidad. Esto ayuda a crear una experiencia intuitiva y coherente con la misión del proyecto.
      </p>

      {/* Subtítulo sobre las tecnologías utilizadas en el proyecto */}
      <h2 className="text-2xl font-semibold text-green-600 mb-3">Tecnologías Utilizadas</h2>
      {/* Párrafo que menciona las tecnologías principales usadas */}
      <p className="mb-6">
        Este proyecto está desarrollado con <strong>React</strong>, beneficiándose de su modularidad para facilitar futuras expansiones y mantenimiento.
      </p>
      
      {/* Párrafo final con un mensaje sobre el impacto esperado del proyecto */}
      <p className="text-lg font-medium text-green-700">
        A medida que se despliegue, se espera que el sistema facilite el manejo adecuado de los desechos, promoviendo una comunidad más responsable con el medio ambiente.
      </p>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
export default AcercaProyecto;
