// React component code
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation de react-router-dom
import { FaTicketAlt, FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import '../Estilos/Peliculas.css'; // Assuming the CSS is saved in Peliculas.css

function Peliculas() {
  const location = useLocation(); // Utilizar useLocation para acceder a los datos pasados de 'Cines'
  const peliculasData = location.state?.movies || []; // Tomar las películas desde el estado o lista vacía si no hay datos

  const [filteredGenre, setFilteredGenre] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    genre: false,
    day: false,
    language: false,
    format: false,
    cinema: false
  });

  const handleGenreFilterChange = (genre) => {
    setFilteredGenre(genre);
  };

  const toggleFilter = (filter) => {
    setExpandedFilters(prevState => ({
      ...prevState,
      [filter]: !prevState[filter]
    }));
  };

  const filteredMovies = peliculasData.filter(movie => {
    return (filteredGenre === '' || movie.genre === filteredGenre);
  });

  return (
    <div>
      <HeaderClient />
      <div className="peliculas-container">
        <div className="filter-section">
          <h3>Filtrar Por:</h3>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('genre')}>Género {expandedFilters.genre ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.genre && (
              <ul>
                {['', 'Acción', 'Terror', 'Drama'].map((genre, index) => (
                  <li key={index} onClick={() => handleGenreFilterChange(genre)}>
                    {genre || 'Todos'}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('day')}>Día {expandedFilters.day ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.day && (
              <ul>
                {['Hoy', 'Martes 20', 'Miércoles 21', 'Jueves 22'].map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('language')}>Idioma {expandedFilters.language ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.language && (
              <ul>
                {['Doblada', 'Subtitulada', 'Inglés'].map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('format')}>Formato {expandedFilters.format ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.format && (
              <ul>
                {['2D', '3D', 'IMAX'].map((format, index) => (
                  <li key={index}>{format}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('cinema')}>Cine {expandedFilters.cinema ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.cinema && (
              <ul>
                {['Cineplanet', 'Cinemark', 'Cinepolis'].map((cinema, index) => (
                  <li key={index}>{cinema}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="peliculas-content">
          <h1>Películas</h1>
          <div className="movie-list">
            {filteredMovies.map((movie, index) => (
              <div key={index} className="movie-card">
                <div className="release-status">
                  {movie.releaseStatus && <span className="release-badge">{movie.releaseStatus}</span>}
                </div>
                <img src={movie.image} alt={movie.title} />
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.genre}, {movie.duration}, {movie.rating}.</p>
                </div>
                <div className="movie-overlay">
                  <button className="btn-buy"><FaTicketAlt /> Comprar</button>
                  <button className="btn-details"><FaInfoCircle /> Ver Detalles</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peliculas;
