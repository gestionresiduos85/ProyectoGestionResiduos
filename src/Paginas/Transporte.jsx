import React, { useState, useEffect } from 'react';
import { supabase } from '../../backend/client'

const Transporte = () => {

  // Estado para manejar mensajes de éxito y error
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estado para saber si estamos editando un transporte
  const [editando, setEditando] = useState(false);

  // Estado para almacenar el transporte que estamos editando
  const [transporte, setTransporte] = useState(null);

  // Estado para controlar si el modal está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Estado para almacenar la lista de transportes obtenidos desde la base de datos
  const [data, setData] = useState([]);

  // Estado para almacenar el correo electrónico del usuario autenticado
  const [userEmail, setUserEmail] = useState('');

  // Estado para controlar el estado de carga
  const [cargando, setCargando] = useState(false);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    via_transporte: '',
    contacto: '',
    matricula: '',
    correo_id: '',
  });

  // useEffect para obtener el correo del usuario autenticado al cargar el componente
  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);  // Establece el correo del usuario
      }
    };

    getUserEmail();  // Llama la función para obtener el email
  }, []); // Este useEffect solo se ejecuta una vez al cargar el componente

  // Función para obtener transportes desde la base de datos
  const obtenerTransporte = async () => {
    if (userEmail) {
      // Realiza una consulta para obtener transportes filtrados por correo del usuario
      const { data: transporte, error } = await supabase
        .from('transporte')
        .select('*')
        .eq('correo_id', userEmail);

      if (error) {
        console.log(error);
      } else {
        setData(transporte);  // Almacena los transportes en el estado 'data'
      }
    }
  };

  // Función para manejar la eliminación de un transporte
  const manejarEliminar = async (id) => {
    const resultado = window.confirm('¡Advertencia! Al eliminar este transporte, también se eliminarán los registros relacionados en residuos. ¿Estás seguro de que quieres continuar?');  // Confirmación antes de eliminar
    if (!resultado) {
      alert('Operación cancelada');
      return;
    }

    // Elimina el transporte desde la base de datos
    const { error } = await supabase
      .from('transporte')
      .delete()
      .eq('id', id);

    if (error) {
      setErrorMessage('Error al eliminar el transporte: ' + error.message);  // Si ocurre un error, muestra un mensaje
    } else {
      alert('Transporte eliminado exitosamente');
      obtenerTransporte();  // Vuelve a obtener los transportes actualizados
      setFormData({ via_transporte: '', contacto: '', matricula: '' });  // Resetea el formulario
    }
  };

  // Función para manejar la edición de un transporte
  const manejarEditar = (item) => {
    setTransporte(item);  // Establece el transporte que se está editando
    setFormData({
      via_transporte: item.via_transporte,
      contacto: item.contacto,
      matricula: item.matricula,
    });  // Rellena el formulario con los datos del transporte
    setEditando(true);  // Marca que estamos en modo edición
    setIsOpen(true);  // Abre el modal
  };

  // useEffect que se ejecuta cuando el correo electrónico del usuario cambia
  useEffect(() => {
    obtenerTransporte();  // Vuelve a obtener los transportes con el nuevo correo
  }, [userEmail]);

  // Función para manejar los cambios en los campos del formulario
  const manejarFormulario = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));  // Actualiza el campo específico del formulario
  };

  // Función para manejar el envío del formulario (ya sea para agregar o editar)
  const manejarSubmit = async (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario
    setCargando(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (editando && transporte) {
      // Si estamos editando, actualizamos el transporte en la base de datos
      const { error } = await supabase
        .from('transporte')
        .update({
          via_transporte: formData.via_transporte,
          contacto: formData.contacto,
          matricula: formData.matricula
        })
        .eq('id', transporte.id);

      if (error) {
        setErrorMessage('Error al editar el transporte: ' + error.message);  // Si hay error, muestra el mensaje
        setCargando(false);
      } else {
        setSuccessMessage('Transporte editado exitosamente');  // Mensaje de éxito
        setEditando(false);  // Cambia el estado de edición
        setTransporte(null);  // Resetea el transporte
        obtenerTransporte();  // Vuelve a obtener los transportes actualizados

        // Resetea el formulario y cierra el modal después de 2 segundos
        setTimeout(() => {
          setFormData({ via_transporte: '', contacto: '', matricula: '' });
          setIsOpen(false);
        }, 2000);
      }
    } else {
      // Si no estamos editando, insertamos un nuevo transporte
      const { error } = await supabase
        .from('transporte')
        .insert([{
          via_transporte: formData.via_transporte,
          contacto: formData.contacto,
          matricula: formData.matricula,
          correo_id: userEmail
        }]);

      if (error) {
        setErrorMessage('Error al guardar el transporte: ' + error.message);  // Si hay error, muestra el mensaje
      } else {
        setSuccessMessage('Transporte guardado exitosamente');  // Mensaje de éxito
        setFormData({ nombre: '', contacto: '', matricula: '' });  // Resetea el formulario
        obtenerTransporte();  // Vuelve a obtener los transportes actualizados
        setIsOpen(false);  // Cierra el modal
      }
    }

    setTimeout(() => {
      setSuccessMessage('')
      setCargando(false);
    }, 2000); // Resetea el mensaje de éxito después de 3 segundos
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-xl font-bold underline">Transporte</h1>
      <p className='text-lg m-4'>En este espacio puedes agregar, editar y eliminar transportes, presiona el boton para agregar</p>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setIsOpen(true);
            setEditando(false);
          }}
          className="px-6 py-3 bg-green-500 text-white text-2xl rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Agregar Transporte
        </button>
      </div>

      {/* Modal para agregar o editar transporte */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
            <h2 className="text-lg font-bold">{editando ? 'Editar' : 'Agregar'} Transporte encargado de transportar el material</h2>
            {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
            {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}
            <form onSubmit={manejarSubmit}>
              {/* Campos del formulario */}
              <div className="mb-4">
                <label className="block mb-1">Via de transporte del material</label>
                <input
                  type="text"
                  name="via_transporte"
                  placeholder="Medio de transporte o servicio de transporte"
                  className="border rounded w-full p-2"
                  value={formData.via_transporte}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  placeholder="Teléfono o correo electrónico, del transporte"
                  className="border rounded w-full p-2"
                  value={formData.contacto}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Matricula del transporte</label>
                <input
                  type="text"
                  name="matricula"
                  className="border rounded w-full p-2"
                  value={formData.matricula}
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
                onClick={() => setIsOpen(false)}
                className="ml-2 px-4 py-2 bg-red-500 text-black rounded"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold">Transportes Guardados:</h2>
        <div className='mt-4 h-[500px] overflow-y-auto'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Muestra la lista de transportes guardados */}
            {data.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 border">
                <h3 className="text-xl font-semibold">{item.via_transporte}</h3>
                <p className="text-gray-600">Contacto: {item.contacto}</p>
                <p className="text-gray-600">Matricula del transporte: {item.matricula}</p>
                <div className="flex justify-end space-x-2 mt-4">
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
}

export default Transporte;
