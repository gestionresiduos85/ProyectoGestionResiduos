// Importa StrictMode desde React, que ayuda a detectar problemas potenciales en el desarrollo
import { StrictMode } from 'react'
// Importa la función createRoot para inicializar la aplicación en el DOM
import { createRoot } from 'react-dom/client'
// Importa el componente principal de la aplicación
import App from './App.jsx'
// Importa el archivo CSS para los estilos globales de la aplicación
import './index.css'

// Crea un "root" en el contenedor HTML con id 'root' y renderiza la aplicación en ese contenedor
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolviendo la aplicación en StrictMode para ayudar a identificar problemas durante el desarrollo */}
    <App />
  </StrictMode>,
)
