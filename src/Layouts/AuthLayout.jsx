// Importa React para crear el componente de layout.
import React from 'react';
// Importa 'Outlet' desde 'react-router-dom' para renderizar las rutas hijas dentro de este layout.
import { Outlet } from 'react-router-dom';
// Importa los componentes Header y Footer que serán usados en el layout.
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define el componente 'AuthLayout', que será usado como el layout principal para las páginas autenticadas.
const AuthLayout = () => {
    return (
        <>
            {/* Contenedor principal que usa flexbox y asegura que el contenido ocupe al menos toda la pantalla */}
            <div className='flex flex-col min-h-screen'>
              
                {/* Componente Header, que representa la cabecera de la página */}
                <Header />
                
                {/* El contenido principal que puede variar dependiendo de la ruta interna (renderizado por 'Outlet') */}
                <main className='flex-grow pb-5'>
                    <Outlet />
                </main>

                {/* Componente Footer, que representa el pie de página */}
                <Footer />
            </div>
        </>
    )
}

// Exporta el componente AuthLayout para que pueda ser utilizado en las rutas de la aplicación.
export default AuthLayout;
