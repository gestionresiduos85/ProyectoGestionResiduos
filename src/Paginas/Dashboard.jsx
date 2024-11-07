import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    // Contenedor principal del dashboard con un diseño de grilla
    <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-3 gap-4 p-6 h-screen bg-gray-300 ">
      
      {/* Card Acerca del proyecto */}
      <Link to="/app/acerca-proyecto"
        className="relative col-span-1 row-span-1 md:col-span-1 md:row-span-3 p-6 bg-green-700 text-black rounded-lg shadow-lg transition 
        duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/container1.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h2
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-2xl pb-3">
            Acerca del proyecto</h2>
          <p className='text-lg'>Conoce acerca del proyecto, el motivo y el propósito de la aplicación.</p>
        </div>
      </Link>

      {/* Card Gestionador */}
      <Link to="/app/gestion"
        className="relative p-6 md:row-span-2 md:col-span-1 bg-green-700 text-black rounded-lg shadow-lg transition duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/container2.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h1
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-3xl pb-3">
            Gestionador</h1>
          <p className='text-lg '>Aquí puedes gestionar tus residuos, asegúrate de haber registrado tus transportes y generadores antes dejar de registrar los residuos.</p>
        </div>
      </Link>

      {/* Card Generadores */}
      <Link to="/app/generadores"
        className="relative p-6 col-span-1 bg-green-700 text-black rounded-lg shadow-lg transition duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/caracol.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h2
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-2xl pb-3">
            Generadores</h2>
          <p className='text-lg '>Aquí puedes gestionar tus entidades que generan residuos.</p>
        </div>
      </Link>

      {/* Card Transporte */}
      <Link to="/app/transporte"
        className="relative p-6 bg-green-700 text-black rounded-lg shadow-lg transition duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/truck.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h2
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-2xl pb-3">
            Transporte</h2>
          <p className='text-lg '>Aquí puedes gestionar tus medios de transporte, en los cuales se transportan los residuos.</p>
        </div>
      </Link>

      {/* Card Guia de Reciclaje */}
      <Link to="/app/guia-reciclaje"
        className="relative col-span-1 p-6 bg-green-700 text-black rounded-lg shadow-lg transition duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/container4.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h2
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-2xl pb-3">
            Guía de Reciclaje</h2>
          <p className='text-lg '>Pequeña guía de reciclaje de residuos, para que puedas reciclar tus residuos.</p>
        </div>
      </Link>

      {/* Card Perfil */}
      <Link to="/app/perfil"
        className="relative p-6  bg-green-700 text-black rounded-lg shadow-lg transition duration-300 flex items-center justify-center group">
        
        {/* Imagen de fondo que se desvanece al hacer hover */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 group-hover:opacity-0 rounded-lg" style={{ backgroundImage: `url('/profile2.jpg')` }}></div>
        
        {/* Contenido del card */}
        <div className='text-justify'>
          <h2
            className="underline opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-bold text-2xl pb-3">
            Perfil</h2>
          <p className='text-lg '>Aquí puedes gestionar tu perfil personales, actualizar tu correo y contraseña.</p>
        </div>
      </Link>
    </div>
  )
}

export default Dashboard

