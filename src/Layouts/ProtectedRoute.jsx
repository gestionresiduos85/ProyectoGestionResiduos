// Importa 'Navigate' y 'Outlet' desde 'react-router-dom' para manejar la navegación y la renderización de rutas hijas.
import { Navigate, Outlet } from "react-router-dom";
// Importa el hook 'useAuth' para acceder al estado de autenticación.
import { useAuth } from "../hook/Auth";

// Define el componente 'ProtectedRoute', que controla el acceso a las rutas protegidas.
const ProtectedRoute = () => {
    // Desestructura el 'user' del contexto de autenticación utilizando el hook 'useAuth'.
    const { user } = useAuth();

    // Si no hay un usuario autenticado (es decir, 'user' es nulo), redirige al usuario a la página de inicio ("/").
    if (!user) {
        return <Navigate to="/" />;
    }

    // Si el usuario está autenticado, renderiza las rutas hijas (usando 'Outlet').
    return <Outlet />;
};

// Exporta el componente 'ProtectedRoute' para su uso en la configuración de rutas.
export default ProtectedRoute;
