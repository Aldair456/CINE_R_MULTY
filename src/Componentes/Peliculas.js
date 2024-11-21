import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { FaTicketAlt, FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import '../Estilos/Peliculas.css';

function Peliculas() {
  const location = useLocation(); // Para recibir datos desde otra página
  const navigate = useNavigate(); // Para redirigir al componente Pago2
  const peliculasData = location.state?.movies || []; // Lista de películas, vacía si no hay datos

  const [filteredGenre, setFilteredGenre] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    genre: false,
    day: false,
    language: false,
    format: false,
    cinema: false,
  });

  const handleGenreFilterChange = (genre) => {
    setFilteredGenre(genre);
  };

  const toggleFilter = (filter) => {
    setExpandedFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const filteredMovies = peliculasData.filter((movie) => {
    return filteredGenre === '' || movie.genre === filteredGenre;
  });

  const handleBuyClick = (movie) => {
    navigate('/socio', { state: { movie } }); // Redirige a Pago2 y envía los datos de la película seleccionada
  };

  return (
    <div>
      <HeaderClient />
      <div className="peliculas-container">
        <div className="filter-section">
          <h3>Filtrar Por:</h3>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('genre')}>
              Género {expandedFilters.genre ? <FaMinus /> : <FaPlus />}
            </h4>
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
          {/* Otros filtros omitidos para brevedad */}
        </div>
        <div className="peliculas-content">
          <h1>Películas</h1>
          <div className="movie-list">
            {filteredMovies.map((movie, index) => (
              <div key={index} className="movie-card">
                <div className="release-status">
                  {movie.releaseStatus && (
                    <span className="release-badge">{movie.releaseStatus}</span>
                  )}
                </div>
                <img src={movie.image} alt={movie.title} />
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>
                    {movie.genre}, {movie.duration}, {movie.rating}.
                  </p>
                </div>
                <div className="movie-overlay">
                  <button className="btn-buy" onClick={() => handleBuyClick(movie)}>
                    <FaTicketAlt /> Comprar
                  </button>
                  <button className="btn-details">
                    <FaInfoCircle /> Ver Detalles
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

export default Peliculas;
