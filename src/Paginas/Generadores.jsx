import React, { useState, useEffect } from 'react'; // Importa React, y los hooks useState y useEffect para manejar estados y efectos secundarios.
import { supabase } from '../../backend/client' // Importa la instancia de supabase para interactuar con la base de datos.

const Generadores = () => {
  // Estado para manejar mensajes de éxito y error.
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estado para controlar si se está editando o agregando un generador.
  const [editando, setEditando] = useState(false);

  // Estado para almacenar la información del generador que se está editando.
  const [generador, setGenerador] = useState(null);

  // Estado para manejar la visibilidad del modal (formulario).
  const [isOpen, setIsOpen] = useState(false);

  // Estado para almacenar los generadores obtenidos de la base de datos.
  const [data, setData] = useState([]);

  // Estado para almacenar el correo del usuario autenticado.
  const [userEmail, setUserEmail] = useState('');

  // Estado para controlar el estado de carga
  const [cargando, setCargando] = useState(false);

  // Estado para almacenar los datos del formulario.
  const [formData, setFormData] = useState({
    nombre: '',
    encargado: '',
    contacto: '',
    descripcion: '',
  });

  // useEffect para obtener el correo del usuario autenticado.
  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // Obtiene el usuario autenticado desde Supabase.
      if (user) {
        setUserEmail(user.email); // Si el usuario está autenticado, guarda su correo.
      }
    };

    getUserEmail(); // Ejecuta la función.
  }, []); // Solo se ejecuta una vez al montar el componente.

  // Función para obtener los generadores desde la base de datos.
  const obtenerGeneradores = async () => {
    if (userEmail) {
      const { data: generadores, error } = await supabase
        .from('generadores') // Consulta la tabla 'generadores' de la base de datos.
        .select('*')
        .eq('correo_id', userEmail); // Filtra por correo del usuario autenticado.

      if (error) {
        console.log(error); // Si hay un error, lo muestra en la consola.
      } else {
        setData(generadores); // Si la consulta es exitosa, guarda los datos de generadores.
      }
    }
  };

  // Función para eliminar un generador.
  const manejarEliminar = async (id) => {
    const resultado = window.confirm('¡Advertencia! Al eliminar este generador, también se eliminarán los registros relacionados en residuos. ¿Estás seguro de que quieres continuar?');
    // Muestra un cuadro de confirmación.

    if (!resultado) {
      alert('Operacion cancelada'); // Si el usuario cancela la operación, muestra un mensaje.
      return;
    }
    const { error } = await supabase
      .from('generadores') // Realiza una consulta para eliminar el generador.
      .delete()
      .eq('id', id); // Filtra por ID para eliminar el generador correcto.

    if (error) {
      setErrorMessage('Error al eliminar el generador: ' + error.message); // Si hay un error, muestra el mensaje.
    } else {
      alert('Generador eliminado exitosamente'); // Si se elimina con éxito, muestra un mensaje.
      obtenerGeneradores(); // Vuelve a obtener la lista actualizada de generadores.
      setFormData({ nombre: '', encargado: '', contacto: '', descripcion: '' }); // Resetea los datos del formulario.
    }
  };

  // Función para editar un generador.
  const manejarEditar = (item) => {
    setGenerador(item); // Establece el generador a editar.
    setFormData({
      nombre: item.nombre,
      encargado: item.encargado,
      contacto: item.contacto,
      descripcion: item.descripcion
    }); // Rellena el formulario con los datos del generador seleccionado.
    setEditando(true); // Marca el estado como "editando".
    setIsOpen(true); // Abre el modal del formulario.
  };

  // useEffect para obtener los generadores al cargar el componente o cuando el correo del usuario cambia.
  useEffect(() => {
    obtenerGeneradores();
  }, [userEmail]);

  // Función para manejar los cambios en el formulario.
  const manejarFormulario = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Actualiza el estado del formulario.
  };

  // Función para manejar el envío del formulario (agregar o editar generadores).
  const manejarSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario.
    setCargando(true); // Marca el estado de carga como true.
    setErrorMessage(''); // Resetea el mensaje de error.
    setSuccessMessage(''); // Resetea el mensaje de éxito.

    // Si estamos editando un generador:
    if (editando && generador) {
      const { error } = await supabase
        .from('generadores') // Realiza una consulta para actualizar los datos del generador.
        .update({
          nombre: formData.nombre,
          encargado: formData.encargado,
          contacto: formData.contacto,
          descripcion: formData.descripcion
        })
        .eq('id', generador.id); // Filtra por el ID del generador.

      if (error) {
        setErrorMessage('Error al editar el generador: ' + error.message); // Si hay un error, muestra el mensaje.
        setCargando(false);
      } else {
        setSuccessMessage('Generador editado exitosamente'); // Si se edita correctamente, muestra el mensaje.
        setEditando(false); // Resetea el estado de edición.
        setGenerador(null); // Resetea el generador.
        obtenerGeneradores(); // Vuelve a obtener la lista de generadores actualizada.

        setTimeout(() => {
          setFormData({ nombre: '', encargado: '', contacto: '', descripcion: '' }); // Resetea el formulario después de 2 segundos.
          setIsOpen(false); // Cierra el modal.
        }, 2000);
      }

    } else { // Si no estamos editando, agregamos un nuevo generador.
      const { error } = await supabase
        .from('generadores')
        .insert([{
          nombre: formData.nombre,
          encargado: formData.encargado,
          contacto: formData.contacto,
          descripcion: formData.descripcion,
          correo_id: userEmail
        }]); // Inserta un nuevo generador en la base de datos.

      if (error) {
        setErrorMessage('Error al guardar el generador: ' + error.message); // Muestra un mensaje de error si la inserción falla.
      } else {
        setSuccessMessage('Generador guardado exitosamente'); // Si la inserción es exitosa, muestra el mensaje.
        setFormData({ nombre: '', encargado: '', contacto: '', descripcion: '' }); // Resetea el formulario.
        obtenerGeneradores(); // Obtiene la lista actualizada de generadores.
        setIsOpen(false); // Cierra el modal.
      }
    }

    // Resetea el mensaje de éxito después de 3 segundos.
    setTimeout(() => {
      setSuccessMessage('')
      setCargando(false);
    }, 2000);
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-xl font-bold underline">Generadores</h1>
      <p className='text-lg m-4'>En este espacio puedes agregar, editar y eliminar generadores, presiona el boton para agregar</p>

      {/* Botón para abrir el formulario de agregar generador */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setIsOpen(true); // Abre el modal.
            setEditando(false); // Establece que no estamos editando.
          }}
          className="px-6 py-3 bg-green-500 text-white text-2xl rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Agregar generadores
        </button>
      </div>

      {/* Modal para agregar o editar generadores */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
            <h2 className="text-lg font-bold">{editando ? 'Editar' : 'Agregar'} entidad Generadora de Residuos</h2>
            {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
            {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}

            {/* Formulario para agregar o editar generadores */}
            <form onSubmit={manejarSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre de la organización o empresa"
                  className="border rounded w-full p-2"
                  value={formData.nombre}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Persona de contacto</label>
                <input
                  type="text"
                  name="encargado"
                  placeholder="Nombre de la persona encargada"
                  className="border rounded w-full p-2"
                  value={formData.encargado}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  placeholder="Teléfono o correo electrónico"
                  className="border rounded w-full p-2"
                  value={formData.contacto}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  placeholder="Descripción de la organización o empresa"
                  className="border rounded w-full p-2"
                  value={formData.descripcion}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <button
                type="submit"
                className={`px-4 py-2 rounded text-black transition duration-300 ${cargando ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                  }`}
                disabled={cargando}
              >
                {cargando ? 'Procesando...' : editando ? 'Actualizar' : 'Enviar'}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)} // Cierra el modal.
                className="ml-2 px-4 py-2 bg-red-500 text-black rounded"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mostrar generadores existentes */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Generadores Guardados:</h2>
        <div className='mt-4 h-[500px] overflow-y-auto'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {data.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 border">
                <h3 className="text-xl font-semibold">{item.nombre}</h3>
                <p className="text-gray-600">Encargado: {item.encargado}</p>
                <p className="text-gray-600">Contacto: {item.contacto}</p>
                <p className="text-gray-600">Descripción: {item.descripcion}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  {/* Botones para editar o eliminar generadores */}
                  <button
                    onClick={() => manejarEditar(item)}
                    className="px-2 py-1 bg-green-500 text-black rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => manejarEliminar(item.id)}
                    className="px-2 py-1 bg-red-500 text-black rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generadores;
