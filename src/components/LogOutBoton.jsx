// Importa el cliente de Supabase para interactuar con la autenticación de la base de datos.
import { supabase } from "../../backend/client";

// Define el componente funcional 'LogOutBoton', que maneja el cierre de sesión.
const LogOutBoton = () => {

    // Función asincrónica para manejar el cierre de sesión del usuario.
    const handleLogOut = async () => {
        try {
            // Llama al método 'signOut' de Supabase para cerrar la sesión del usuario.
            await supabase.auth.signOut();
            // Redirige al usuario a la página principal después de cerrar sesión.
            window.location.href = '/';
        } catch (error) {
            // Si ocurre un error durante el cierre de sesión, lo imprime en la consola.
            console.log(error);
        }
    }

    // Retorna un botón estilizado que, cuando se hace clic, ejecuta 'handleLogOut'.
    return (
        <button 
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleLogOut}
        >
            Cerrar sesión
        </button>
    )
};

// Exporta el componente 'LogOutBoton' para que pueda ser utilizado en otras partes de la aplicación.
export default LogOutBoton;
