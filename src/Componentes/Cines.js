import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import '../Estilos/Cines.css';

const initialCinesData = [
  {
    tenant_id: "Cineplanet",
    departamento: "Lima",
    provincia: "Lima",
    distrito: "Miraflores",
    nombre: "Cineplanet Plaza Lima",
    direccion: "Av. Larco 123, Miraflores",
    contacto: "+51 987 654 321",
    imagen: "https://1000marcas.net/wp-content/uploads/2022/12/Cinemark-Logo.jpg"
  },
  // Puedes agregar más cines iniciales aquí si es necesario
];

function Cines() {
  const [cines, setCines] = useState(initialCinesData);
  const [newCine, setNewCine] = useState({
    tenant_id: "Cineplanet",
    departamento: '',
    provincia: '',
    distrito: '',
    nombre: '',
    direccion: '',
    contacto: '',
    imagen: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Verificar el token al cargar el componente
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('Token recuperado:', authToken); // Imprimir el token recuperado
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCine({ ...newCine, [name]: value });
  };

  const handleAddCine = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    console.log('Token de autenticación:', authToken); // Imprimir el token antes de la solicitud

    try {
      const response = await fetch('https://5rzsfqz8qb.execute-api.us-east-1.amazonaws.com/dev/cine/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newCine),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Respuesta de la API:', responseData);
        console.log('Datos enviados:', newCine);
        // Agregar el cine creado a la lista de cines
        setCines([...cines, newCine]);
        setResponseMessage(`Cine creado: ${newCine.nombre}`);
        // Limpiar el formulario
        setNewCine({
          tenant_id: "Cineplanet",
          departamento: '',
          provincia: '',
          distrito: '',
          nombre: '',
          direccion: '',
          contacto: '',
          imagen: ''
        });
        setShowForm(false); // Cerrar el formulario
      } else {
        console.error('Error en la respuesta de la API:', responseData);
        setError(responseData.message || 'Error al crear el cine.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Hubo un problema con la conexión. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <HeaderClient />
      <div className="cines-container-new">
        <div className="filter-section-new">
          {/* Aquí puedes agregar filtros si lo deseas */}
        </div>

        <div className="cines-content-new">
          <h1>Cines</h1>
          <button onClick={() => setShowForm(true)} className="add-cine-button">
            <FaPlus /> Agregar Cine
          </button>

          {showForm && (
            <div className="add-cine-form">
              <h2>Agregar Nuevo Cine</h2>
              <input type="text" name="nombre" placeholder="Nombre" value={newCine.nombre} onChange={handleInputChange} />
              <input type="text" name="departamento" placeholder="Departamento" value={newCine.departamento} onChange={handleInputChange} />
              <input type="text" name="provincia" placeholder="Provincia" value={newCine.provincia} onChange={handleInputChange} />
              <input type="text" name="distrito" placeholder="Distrito" value={newCine.distrito} onChange={handleInputChange} />
              <input type="text" name="direccion" placeholder="Dirección" value={newCine.direccion} onChange={handleInputChange} />
              <input type="text" name="contacto" placeholder="Contacto" value={newCine.contacto} onChange={handleInputChange} />
              <input type="text" name="imagen" placeholder="URL de la imagen" value={newCine.imagen} onChange={handleInputChange} />
              <button onClick={handleAddCine}>Agregar Cine</button>
              <button onClick={() => setShowForm(false)}>Cancelar</button>
              {error && <div className="error-message">{error}</div>}
              {responseMessage && <div className="response-message">{responseMessage}</div>}
            </div>
          )}

          <div className="cine-list-new">
            {cines.map((cine, index) => (
              <div key={index} className="cine-card-new">
                <img src={cine.imagen} alt={cine.nombre} />
                <div className="cine-info-new">
                  <h2>{cine.nombre}</h2>
                  <p><strong>Departamento:</strong> {cine.departamento}</p>
                  <p><strong>Provincia:</strong> {cine.provincia}</p>
                  <p><strong>Distrito:</strong> {cine.distrito}</p>
                  <p><strong>Dirección:</strong> {cine.direccion}</p>
                  <p><strong>Contacto:</strong> {cine.contacto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cines;
