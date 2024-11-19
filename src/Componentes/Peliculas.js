// React component code
import React, { useState } from 'react';
import { FaTicketAlt, FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import '../Estilos/Peliculas.css'; // Assuming the CSS is saved in Peliculas.css

const peliculasData = [
  {
    "title": "Aluvión",
    "genre": "Acción",
    "duration": "1h 50min",
    "rating": "+14",
    "city": "Arequipa",
    "releaseStatus": "Estreno",
    "image": "https://hips.hearstapps.com/hmg-prod/images/gladiator-2-poster-2-66f18818a0141.jpg?crop=1xw:1xh;center,top&resize=980:*"
  },
  {
    "title": "El Asesino del Juego de las Citas",
    "genre": "Terror",
    "duration": "1h 40min",
    "rating": "+14",
    "city": "Arequipa",
    "releaseStatus": "Estreno",
    "image": "https://hips.hearstapps.com/hmg-prod/images/gladiator-2-poster-2-66f18818a0141.jpg?crop=1xw:1xh;center,top&resize=980:*"
  },
  {
    "title": "Gladiador II",
    "genre": "Acción",
    "duration": "2h 30min",
    "rating": "+14",
    "city": "Arequipa",
    "releaseStatus": "Estreno",
    "image": "https://es.web.img3.acsta.net/pictures/23/02/06/17/15/3568166.jpg"
  },
  {
    "title": "Kinra",
    "genre": "Drama",
    "duration": "2h 40min",
    "rating": "+14",
    "city": "Arequipa",
    "releaseStatus": "Estreno",
    "image": "url_to_image_4"
  },
  {
    "title": "La Confesión del Diablo",
    "genre": "Terror",
    "duration": "2h",
    "rating": "+14",
    "city": "Arequipa",
    "releaseStatus": "Estreno",
    "image": "url_to_image_5"
  }
];

function Peliculas() {
  const [filteredCity, setFilteredCity] = useState('');
  const [filteredGenre, setFilteredGenre] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    city: false,
    genre: false,
    day: false,
    language: false,
    format: false,
    cinema: false
  });

  const handleCityFilterChange = (city) => {
    setFilteredCity(city);
  };

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
    return (
      (filteredCity === '' || movie.city === filteredCity) &&
      (filteredGenre === '' || movie.genre === filteredGenre)
    );
  });

  return (
    <div>
      <HeaderClient />
      <div className="peliculas-container">
        <div className="filter-section">
          <h3>Filtrar Por:</h3>
          <div className="filter-category">
            <h4 onClick={() => toggleFilter('city')}>Ciudad {expandedFilters.city ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.city && (
              <ul>
                {['', 'Lima', 'Arequipa', 'Cajamarca', 'Chiclayo', 'Cusco', 'Huancayo', 'Huánuco', 'Juliaca', 'Piura', 'Pucallpa', 'Puno', 'Tacna', 'Trujillo'].map((city, index) => (
                  <li key={index} onClick={() => handleCityFilterChange(city)}>
                    {city || 'Todas'}
                  </li>
                ))}
              </ul>
            )}
          </div>
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