// Importaciones necesarias para la configuración de rutas en la aplicación.
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hook/Auth' // Contexto para la autenticación de usuarios.
import AuthLayout from './Layouts/AuthLayout' // Layout común para las rutas privadas.
import Login from './Paginas/Login' // Página de login para usuarios no autenticados.
import Registrar from './Paginas/Registrar' // Página para registro de nuevos usuarios.
import OlvidePassword from './Paginas/OlvidePassword' // Página para recuperación de contraseña.
import Dashboard from './Paginas/Dashboard' // Página principal del usuario después de iniciar sesión.
import ProtectedRoute from './Layouts/ProtectedRoute' // Componente para proteger rutas privadas.
import ActualizarPassword from './Paginas/ActualizarPassword' // Página para cambiar la contraseña.
import Perfil from './Paginas/Perfil' // Página donde el usuario puede ver o editar su perfil.
import AcercaProyecto from './Paginas/AcercaProyecto' // Página con información sobre el proyecto.
import GuiaReciclaje from './Paginas/GuiaReciclaje' // Página que probablemente explique la guía de reciclaje.
import Generadores from './Paginas/Generadores' // Página para gestionar generadores de material reciclable.
import Transporte from './Paginas/Transporte' // Página para gestionar los transportes.
import Gestion from './Paginas/Gestion' // Página de gestión, puede ser de administración o supervisión.
import ActualizarCorreo from './Paginas/ActualizarCorreo' // Página para actualizar el correo electrónico del usuario.

function App() {
  return (
    <BrowserRouter> {/* Componente que envuelve toda la aplicación para permitir el enrutamiento con React Router */}
      <AuthProvider> {/* Proveedor de autenticación que gestiona el estado de autenticación globalmente */}
        <Routes> {/* Componente que define las rutas y sus elementos asociados */}
          
          {/* Parte pública: Rutas accesibles sin necesidad de estar autenticado */}
          <Route index element={<Login />} /> {/* Página de login que se muestra cuando el usuario no está autenticado */}
          <Route path='/registrar' element={<Registrar />} /> {/* Ruta para registrar nuevos usuarios */}
          <Route path='/olvide-password' element={<OlvidePassword />} /> {/* Ruta para recuperación de contraseña */}
          <Route path='/actualizar-password' element={<ActualizarPassword />} /> {/* Ruta para actualizar contraseña */}
          
          {/* Parte privada: Rutas protegidas, accesibles solo por usuarios autenticados */}
          <Route element={<ProtectedRoute />}> {/* El componente ProtectedRoute verifica si el usuario está autenticado antes de permitir el acceso */}
            <Route path='/app' element={<AuthLayout />}> {/* Layout general para las rutas privadas dentro de '/app' */}
              <Route index element={<Dashboard />} /> {/* Página principal del usuario autenticado (Dashboard) */}
              <Route path='/app/perfil' element={<Perfil />} /> {/* Página de perfil del usuario */}
              <Route path='/app/acerca-proyecto' element={<AcercaProyecto />} /> {/* Página con información del proyecto */}
              <Route path='/app/guia-reciclaje' element={<GuiaReciclaje />} /> {/* Página con la guía de reciclaje */}
              <Route path='/app/generadores' element={<Generadores />} /> {/* Página para gestionar generadores */}
              <Route path='/app/transporte' element={<Transporte />} /> {/* Página para gestionar transporte */}
              <Route path='/app/gestion' element={<Gestion />} /> {/* Página para gestión administrativa */}
              <Route path='/app/actualizar-correo' element={<ActualizarCorreo />} /> {/* Página para actualizar el correo electrónico */}
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
