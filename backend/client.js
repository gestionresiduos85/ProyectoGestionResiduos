// Importa la función 'createClient' desde el paquete 'supabase-js',
// la cual permite interactuar con la base de datos de Supabase.
import { createClient } from '@supabase/supabase-js';

// Obtiene la URL de Supabase desde las variables de entorno definidas en el archivo .env.
// 'import.meta.env' es una forma de acceder a las variables de entorno en entornos como Vite.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Obtiene la clave anónima de Supabase desde las variables de entorno.
// Esta clave se utiliza para autenticar las solicitudes a la base de datos sin necesidad de un usuario autenticado.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crea una instancia del cliente Supabase utilizando la URL y la clave anónima obtenidas anteriormente.
// El objeto de configuración adicional permite especificar detalles sobre la autenticación, en este caso:
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Habilita la actualización automática del token de autenticación cuando sea necesario.
    autoRefreshToken: true,
    // Configura la persistencia de la sesión para mantenerla activa entre recargas de la página.
    persistSession: true,
  },
});
