import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
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
  const [cines, setCines] = useState(() => {
    const savedCines = localStorage.getItem('cines');
    return savedCines ? JSON.parse(savedCines) : initialCinesData;
  });
  
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
  
  const [filters, setFilters] = useState({
    departamento: '',
    provincia: '',
    distrito: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Nuevo estado para controlar la búsqueda

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cines', JSON.stringify(cines));
  }, [cines]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCine({ ...newCine, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAddCine = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await fetch('https://5rzsfqz8qb.execute-api.us-east-1.amazonaws.com/dev/cine/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`,
        },
        body: JSON.stringify(newCine),
      });

      const responseData = await response.json();
      if (response.ok) {
        setCines([...cines, newCine]);
        setResponseMessage(`Cine creado: ${newCine.nombre}`);
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
        setShowForm(false);
      } else {
        setError(responseData.message || 'Error al crear el cine.');
      }
    } catch (error) {
      setError('Hubo un problema con la conexión. Intenta de nuevo.');
    }
  };

  const handleDeleteCine = (index) => {
    const updatedCines = cines.filter((_, i) => i !== index);
    setCines(updatedCines);
    setResponseMessage('Cine eliminado correctamente.');
  };

  const buscarCines = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    const filtersWithTenant = {
      ...filters,
      tenant_id: "Cineplanet" // Agregar tenant_id por defecto
    };

    try {
      const response = await fetch('https://5rzsfqz8qb.execute-api.us-east-1.amazonaws.com/dev/cine/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`,
        },
        body: JSON.stringify(filtersWithTenant),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        setError(data.message || 'Error desconocido');
        return;
      }

      setSearchResults(data.data || []);
      setResponseMessage('Búsqueda completada.');
      setError(''); // Limpiar errores al buscar
      setIsSearching(true); // Cambiar estado a buscando

    } catch (error) {
      setError('Hubo un problema con la conexión. Intenta de nuevo.');
    }
  };

  const filteredCines = isSearching ? searchResults : cines.filter(cine => {
    return (
      (filters.departamento === '' || cine.departamento.toLowerCase().includes(filters.departamento.toLowerCase())) &&
      (filters.provincia === '' || cine.provincia.toLowerCase().includes(filters.provincia.toLowerCase())) &&
      (filters.distrito === '' || cine.distrito.toLowerCase().includes(filters.distrito.toLowerCase()))
    );
  });

  return (
    <div>
      <HeaderClient />
      <div className="cines-container-new">   
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

          {/* Filtros */}
          <div className="filters">
            <h2>Filtrar Cines</h2>
            <input 
              type="text" 
              name="departamento" 
              placeholder="Filtrar por Departamento" 
              value={filters.departamento} 
              onChange={handleFilterChange} 
            />
            <input 
              type="text" 
              name="provincia" 
              placeholder="Filtrar por Provincia" 
              value={filters.provincia} 
              onChange={handleFilterChange} 
            />
            <input 
              type="text" 
              name="distrito" 
              placeholder="Filtrar por Distrito" 
              value={filters.distrito} 
              onChange={handleFilterChange} 
            />
            <button onClick={buscarCines}>Buscar Cines</button>
          </div>

          {/* Sección de Tarjetas de Cines Guardados */}
          {!isSearching && (
            <div className="cine-list-new">
              {cines.map((cine, index) => (
                <div key={cine.nombre} className="cine-card-new">
                  <img src={cine.imagen} alt={cine.nombre} />
                  <div className="cine-info-new">
                    <h2>{cine.nombre}</h2>
                    <p><strong>Departamento:</strong> {cine.departamento}</p>
                    <p><strong>Provincia:</strong> {cine.provincia}</p>
                    <p><strong>Distrito:</strong> {cine.distrito}</p>
                    <p><strong>Dirección:</strong> {cine.direccion}</p>
                    <p><strong>Contacto:</strong> {cine.contacto}</p>
                    <button onClick={() => handleDeleteCine(index)} className="delete-button">
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sección de Resultados de Búsqueda */}
          {isSearching && (
            <div className="cine-list-new">
              {filteredCines.length > 0 ? (
                filteredCines.map((cine, index) => {
                  // Extraer departamento, provincia y distrito del cine_id
                  const [departamento, provincia, distrito] = cine.cine_id.split('#');
                  return (
                    <div key={cine.nombre} className="cine-card-new">
                      <img src={cine.imagen} alt={cine.nombre} />
                      <div className="cine-info-new">
                        <h2>{cine.nombre}</h2>
                        <p><strong>Departamento:</strong> {departamento || 'N/A'}</p>
                        <p><strong>Provincia:</strong> {provincia || 'N/A'}</p>
                        <p><strong>Distrito:</strong> {distrito || 'N/A'}</p>
                        <p><strong>Dirección:</strong> {cine.direccion}</p>
                        <p><strong>Contacto:</strong> {cine.contacto}</p>
                        <button onClick={() => handleDeleteCine(index)} className="delete-button">
                          <FaTrash /> Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No se encontraron cines con esos filtros.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cines;
