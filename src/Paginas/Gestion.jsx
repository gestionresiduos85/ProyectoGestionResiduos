import React, { useState, useEffect } from 'react'
import { supabase } from '../../backend/client'
import { Link, useNavigate } from 'react-router-dom'

const Gestion = () => {

  // Declaración de varios estados usados en la gestión de residuos.
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [transportes, setTransportes] = useState([]);
  const [generadores, setGeneradores] = useState([]);
  const [gestion, setGestion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    tipo: '',
    cantidad: '',
    condicion: '',
    fecha_coleccion: '',
    preparacion: '',
    observaciones: '',
    generador_id: '',
    transporte_id: '',
    imagen_url: '',
  });

  // Obtiene el correo del usuario logueado
  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };

    getUserEmail();
  }, []);

  // Muestra un mensaje de alerta si no hay transportes ni generadores.
  useEffect(() => {
    if (transportes.length === 0 || generadores.length === 0) {
      setMensajeAlerta('Debe agregar al menos un transporte y un generador, para poder registrar un residuo!!');
    } else {
      setMensajeAlerta('');
    }
  }, [transportes, generadores]);

  // Obtiene los datos de los residuos, generadores y transportes
  useEffect(() => {
    obtenerResiduos();
    obtenerGeneradores();
    obtenerTransportes();
  }, [userEmail]);

  // Función para reiniciar el formulario y limpiar los datos
  const reiniciarFormulario = () => {
    setEditando(false);
    setGestion(null);
    obtenerResiduos();
    setTimeout(() => {
      setFormData({
        tipo: '',
        cantidad: '',
        condicion: '',
        fecha_coleccion: '',
        preparacion: '',
        observaciones: '',
        generador_id: '',
        transporte_id: '',
        imagen_url: '',
      });
      setIsOpen(false);
    }, 2000);
  }

  // Obtiene los residuos del usuario en la base de datos
  const obtenerResiduos = async () => {
    if (userEmail) {
      const { data: residuos, error } = await supabase
        .from('residuos')
        .select(`*, transporte (via_transporte, matricula), generadores (nombre)`)
        .eq('correo_id', userEmail);

      if (error) {
        console.log(error);
      } else {
        setData(residuos);
      }
    }
  };

  // Obtiene los generadores del usuario
  const obtenerGeneradores = async () => {
    if (userEmail) {
      const { data: generadoresData, error: generadoresError } = await supabase
        .from('generadores')
        .select('id, nombre')
        .eq('correo_id', userEmail);

      if (generadoresError) {
        console.log(generadoresError);
      } else {
        setGeneradores(generadoresData);
      }
    }
  };

  // Obtiene los transportes del usuario
  const obtenerTransportes = async () => {
    if (userEmail) {
      const { data: transportesData, error: transportesError } = await supabase
        .from('transporte')
        .select('id, via_transporte, matricula')
        .eq('correo_id', userEmail);

      if (transportesError) {
        console.log(transportesError);
      } else {
        setTransportes(transportesData);
      }
    }
  }

  // Maneja el cambio de imagen seleccionada
  const manejarImagenChange = (e) => {
    setImagen(e.target.files[0]);
  }

  // Sube la imagen al almacenamiento y retorna la URL pública
  const subirImagen = async () => {
    const nombreImagen = `${Date.now()}_${imagen.name}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(nombreImagen, imagen);

    if (error) {
      console.log(error);
      return
    }

    const { data: publicUrlData } = await supabase.storage
      .from('images')
      .getPublicUrl(nombreImagen);

    return publicUrlData ? publicUrlData.publicUrl : null;
  }

  // Elimina la imagen del almacenamiento
  const eliminarImagen = async (id) => {
    const { data: imagen, error } = await supabase
      .from('residuos')
      .select('imagen_url')
      .eq('id', id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    const nombreImagen = imagen.imagen_url.split('/').pop();
    const { error: deleteError } = await supabase.storage
      .from('images')
      .remove([nombreImagen]);
    if (deleteError) {
      console.log(deleteError);
    }
  }

  // Función para eliminar un residuo
  const manejarEliminar = async (id) => {
    const resultado = confirm('¿Esta seguro de eliminar este residuo?');
    if (!resultado) {
      alert('Operacion cancelada');
      return;
    }

    await eliminarImagen(id);
    const { error } = await supabase
      .from('residuos')
      .delete()
      .eq('id', id);

    if (error) {
      setErrorMessage('Error al eliminar el residuo: ' + error.message);
    } else {
      alert('Residuo eliminado exitosamente');
      obtenerResiduos();
      setFormData({
        tipo: '',
        cantidad: '',
        condicion: '',
        fecha_coleccion: '',
        preparacion: '',
        observaciones: '',
        generador_id: '',
        transporte_id: '',
        imagen_url: '',
      });
    }
  };

  // Función para editar un residuo
  const manejarEditar = (item) => {
    setGestion(item);
    setFormData({
      tipo: item.tipo,
      cantidad: item.cantidad,
      condicion: item.condicion,
      fecha_coleccion: item.fecha_coleccion,
      preparacion: item.preparacion,
      observaciones: item.observaciones,
      generador_id: item.generador_id,
      imagen_url: item.imagen_url,
      transporte_id: item.transporte_id
    });
    setEditando(true);
    setIsOpen(true);
  };

  // Maneja el cambio de datos en el formulario
  const manejarFormulario = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorMessage('');
    setSuccessMessage('');

    let imagenUrl = formData.imagen_url;
    imagenUrl = await subirImagen();

    const formularioData = {
      tipo: formData.tipo,
      cantidad: formData.cantidad,
      condicion: formData.condicion,
      fecha_coleccion: formData.fecha_coleccion,
      preparacion: formData.preparacion,
      observaciones: formData.observaciones,
      generador_id: formData.generador_id,
      transporte_id: formData.transporte_id,
      imagen_url: imagenUrl,
      correo_id: userEmail
    };

    // Si estamos editando un residuo, lo actualizamos
    if (editando && gestion) {
      if (gestion.imagen_url) {
        await eliminarImagen(gestion.id);
      }
      if (!imagenUrl) {
        setErrorMessage('Error al subir la imagen');
        setCargando(false);
        return;
      }

      const { error } = await supabase
        .from('residuos')
        .update(formularioData)
        .eq('id', gestion.id);

      if (error) {
        setErrorMessage('Error al editar el residuo: ' + error.message);
      } else {
        setSuccessMessage('Residuo editado exitosamente');
        reiniciarFormulario();
      }

    } else {
      // Si es un nuevo residuo, lo insertamos
      const { error } = await supabase
        .from('residuos')
        .insert([formularioData]);

      if (error) {
        setErrorMessage('Error al agregar el residuo: ' + error.message);
      } else {
        setSuccessMessage('Residuo agregado exitosamente');
        reiniciarFormulario();
      }
    }
    setTimeout(() => {
      setSuccessMessage('')
      setCargando(false);
    }, 2000);
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-xl font-bold underline">Residuos</h1>
      <p className='text-lg m-4'>En este espacio puedes agregar, editar y eliminar residuos, presiona el boton para agregar</p>
      <p className="text-red-500 font-bold m-4 text-3xl">{mensajeAlerta}</p>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setIsOpen(true);
            setEditando(false);
          }}
          className="px-6 py-3 bg-green-500 text-white text-2xl rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Agregar Residuo
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
            <h2 className="text-lg font-bold">{editando ? 'Editar' : 'Agregar'} Transporte</h2>
            {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
            {successMessage && <p className='text-green-500 text-center mb-4'>{successMessage}</p>}
            <form onSubmit={manejarSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block mb-1">Transporte</label>
                <select
                  name="transporte_id"
                  className="border rounded w-full p-2"
                  value={formData.transporte_id}
                  onChange={manejarFormulario}
                  required
                >
                  <option value="">--Selecciona un transporte--</option>
                  {transportes.map((transporte) => (
                    <option key={transporte.id} value={transporte.id}>
                      {transporte.via_transporte}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Generador</label>
                <select
                  name="generador_id"
                  className="border rounded w-full p-2"
                  value={formData.generador_id}
                  onChange={manejarFormulario}
                  required
                >
                  <option value="">--Selecciona un generador--</option>
                  {generadores.map((generador) => (
                    <option key={generador.id} value={generador.id}>
                      {generador.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Tipo del material</label>
                <input
                  type="text"
                  name="tipo"
                  placeholder="Vidrio, Plástico, Metal..."
                  className="border rounded w-full p-2"
                  value={formData.tipo}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Condición del material</label>
                <input
                  type="text"
                  name="condicion"
                  placeholder="Limpio, Sucio, Seco..."
                  className="border rounded w-full p-2"
                  value={formData.condicion}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Cantidad del material en kg</label>
                <input
                  type="text"
                  name="cantidad"
                  placeholder="18.5, 0.5..."
                  className="border rounded w-full p-2"
                  value={formData.cantidad}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Fecha de colección</label>
                <input
                  type="date"
                  name="fecha_coleccion"
                  className="border rounded w-full p-2"
                  value={formData.fecha_coleccion}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Preparación del material</label>
                <input
                  type="text"
                  name="preparacion"
                  placeholder='Compactado, Separado...'
                  className="border rounded w-full p-2"
                  value={formData.preparacion}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Observaciones</label>
                <input
                  type="text"
                  name="observaciones"
                  placeholder="Observaciones adicionales"
                  className="border rounded w-full p-2"
                  value={formData.observaciones}
                  onChange={manejarFormulario}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Imagen del material</label>
                <input
                  type="file"
                  name="imagen_url"
                  className="border rounded w-full p-2"
                  onChange={manejarImagenChange}
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
                disabled={cargando}
                onClick={() => setIsOpen(false)}
                className="ml-2 px-4 py-2 bg-red-500 text-black rounded"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 ">
        <h2 className="text-lg font-bold">Residuos Guardados:</h2>
        <div className="mt-4 h-[500px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (

              <div key={item.id} className="bg-white rounded-lg shadow p-4 border">
                {item.imagen_url && (
                  <img
                    src={item.imagen_url}
                    alt={`Imagen de ${item.tipo}`}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl"><span className="font-bold">Id de la colección:</span> {item.id}</h3>
                <div className='text-gray-600'>
                <p><span className='text-black font-bold'>Tipo:</span> {item.tipo}</p>
                <p><span className='text-black font-bold'>Cantidad:</span> {item.cantidad} kg</p>
                <p><span className='text-black font-bold'>Condición:</span> {item.condicion}</p>
                <p><span className='text-black font-bold'>Fecha de colección:</span> {item.fecha_coleccion}</p>
                <p><span className='text-black font-bold'>Preparación:</span> {item.preparacion}</p>
                <p><span className='text-black font-bold'>Observaciones:</span> {item.observaciones}</p>
                <p>
                  <Link to={`/app/transporte/`} className="hover:underline font-bold text-black hover:text-blue-600">Transporte: </Link>
                  {item.transporte ? item.transporte.via_transporte : 'No especificado'}
                </p>
                <p> <span className='text-black font-bold'>Matricula del transporte:</span> {item.transporte ? item.transporte.matricula : 'No especificado'}
                </p>
                <p>
                  <Link to={`/app/generadores/`} className="hover:underline font-bold text-black hover:text-blue-600">Ver generador: </Link>
                  {item.generadores ? item.generadores.nombre : 'No especificado'}
                </p>
                </div>
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
  )
}

export default Gestion