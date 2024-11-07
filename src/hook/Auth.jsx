// Importa hooks y funciones necesarias de React.
import { useState, useEffect, createContext, useContext } from 'react';
// Importa el cliente de Supabase para interactuar con la autenticación.
import { supabase } from '../../backend/client';

// Crea el contexto de autenticación para compartir el estado de la sesión y usuario en la aplicación.
const AuthContext = createContext({
    session: null,  // Almacena la sesión actual (por defecto null).
    user: null,     // Almacena el usuario autenticado (por defecto null).
    signOut: () => { } // Función vacía para la acción de cerrar sesión (se implementa más adelante).
});

// Componente 'AuthProvider' que proporciona el contexto de autenticación a la aplicación.
export const AuthProvider = ({ children }) => {
    // Define los estados locales para usuario, sesión y estado de carga.
    const [user, setUser] = useState(null);       // Usuario autenticado.
    const [session, setSession] = useState(null); // Sesión actual.
    const [loading, setLoading] = useState(true); // Estado para controlar si los datos están cargando.

    // useEffect para manejar la carga inicial de la sesión y escuchar cambios en la autenticación.
    useEffect(() => {
        const setData = async () => {
            // Obtiene la sesión actual de Supabase.
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.log(error); // Si hay error, lo muestra en la consola.
            }

            // Establece la sesión y el usuario (si existe).
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false); // Indica que la carga ha terminado.
        }

        // Escucha los cambios de estado de autenticación (iniciar sesión, cerrar sesión, etc.).
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            // Actualiza el estado de sesión y usuario cuando cambia el estado de autenticación.
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false); // Finaliza el estado de carga cuando hay un cambio.
        });

        // Llama a la función 'setData' para cargar la sesión al montar el componente.
        setData();

        // Limpia el listener de eventos al desmontar el componente para evitar fugas de memoria.
        return () => {
            listener?.subscription.unsubscribe();
        }
    }, []); // Solo se ejecuta una vez al montar el componente.

    // El valor del contexto que se proporciona a los componentes hijos.
    const value = {
        session, // La sesión actual.
        user,    // El usuario autenticado.
        loading, // Si los datos aún están cargando.
        signOut: async () => {
            // Función para cerrar sesión.
            await supabase.auth.signOut();
            setUser(null);    // Limpia el usuario.
            setSession(null); // Limpia la sesión.
        },
    };

    return (
        // Proporciona el contexto a los componentes hijos.
        <AuthContext.Provider value={value}>
            {/* No muestra los hijos del componente hasta que la carga haya terminado */}
            {!loading && children} 
        </AuthContext.Provider>
    )
}

// Hook personalizado para consumir el contexto de autenticación en otros componentes.
export const useAuth = () => {
    return useContext(AuthContext); // Accede al contexto de autenticación.
}
