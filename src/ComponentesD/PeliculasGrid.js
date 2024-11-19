import React, { useState, useEffect } from 'react';
import '../Estilos/PeliculasGrid.css';

function PeliculasGrid({ userType }) {
  // Estado para almacenar las películas
  const [peliculas, setPeliculas] = useState([]);

  // Cargar las películas almacenadas en localStorage al montar el componente
  useEffect(() => {
    const storedPeliculas = JSON.parse(localStorage.getItem('peliculasGrid'));
    if (storedPeliculas) {
      setPeliculas(storedPeliculas);
    } else {
      // Si no hay películas almacenadas, utilizar estas como predeterminadas
      setPeliculas([
        {
          titulo: 'Gladiador II',
          img: 'https://m.media-amazon.com/images/I/81-349iYbfL._AC_SY679_.jpg',
          estreno: true,
        },
        {
          titulo: 'Robot Salvaje',
          img: 'https://andesfilms.cl/wp-content/thumbgen_cache/91ee9d4b67da1b240bcd8c63b598ebd9.jpg',
          estreno: false,
        },
        {
          titulo: 'Venom - El Último Baile',
          img: 'https://andesfilms.cl/wp-content/thumbgen_cache/91ee9d4b67da1b240bcd8c63b598ebd9.jpg',
          estreno: false,
        },
        {
          titulo: 'Código Traje Rojo',
          img: 'https://andesfilms.cl/wp-content/thumbgen_cache/91ee9d4b67da1b240bcd8c63b598ebd9.jpg',
          estreno: false,
        },
        {
          titulo: 'El Tiempo que Tenemos',
          img: 'https://andesfilms.cl/wp-content/thumbgen_cache/91ee9d4b67da1b240bcd8c63b598ebd9.jpg',
          estreno: false,
        },
      ]);
    }
  }, []);

  // Guardar las películas en localStorage siempre que cambien
  useEffect(() => {
    localStorage.setItem('peliculasGrid', JSON.stringify(peliculas));
  }, [peliculas]);

  // Función para añadir una nueva película
  const addPelicula = () => {
    const titulo = prompt('Ingrese el título de la película:');
    const img = prompt('Ingrese la URL de la imagen de la película:');
    const estreno = window.confirm('¿Es un estreno?'); // Preguntar si es estreno

    if (titulo && img) {
      const newPelicula = { titulo, img, estreno };
      setPeliculas([...peliculas, newPelicula]);
    }
  };

  // Función para eliminar una película por su índice
  const deletePelicula = (index) => {
    const updatedPeliculas = peliculas.filter((_, i) => i !== index);
    setPeliculas(updatedPeliculas);
  };

  return (
    <div className="peliculas-grid-container">
      <h1 className="peliculas-titulo">Películas</h1>
      <div className="peliculas-nav">
        <span className="nav-item active">En cartelera</span>
        <span className="nav-item">Próximos estrenos</span>
      </div>
      <div className="peliculas-grid">
        {peliculas.map((pelicula, index) => (
          <div key={index} className="pelicula-item">
            <img src={pelicula.img} alt={pelicula.titulo} className="pelicula-imagen" />
            {pelicula.estreno && <span className="estreno-badge">Estreno</span>}
            {userType === 'developer' && (
              <button onClick={() => deletePelicula(index)} className="delete-button">
                Eliminar
              </button>
            )}
          </div>
        ))}
        <div className="pelicula-item ver-mas">
          <span>Ver más películas</span>
        </div>
      </div>
      {userType === 'developer' && (
        <button onClick={addPelicula} className="add-button">
          Añadir Película
        </button>
      )}
    </div>
  );
}

export default PeliculasGrid;
