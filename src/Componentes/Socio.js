import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Estilos/Pago2.css';
import HeaderClient from '../Componentes/HeaderClient';

function Pago2() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recibir los datos de la película seleccionada desde el estado de navegación
  const movie = location.state?.movie || {
    title: 'Película no seleccionada',
    image: '../images/default.jpg', // Imagen predeterminada si no hay datos
    duration: 'N/A',
    rating: 'N/A',
    genre: 'N/A',
  };

  const handleTimeClick = (time) => {
    navigate('/promociones', { state: { movie, time } });
  };

  return (
    <div>
      <HeaderClient />
      <div className="pago2-container">
        <header className="cinema-header">
          <h1>CINEMARK HUANCAYO</h1>
          <div className="tabs">
            <button className="tab active">EN CARTELERA</button>
            <button className="tab">PREVENTA</button>
          </div>
        </header>

        <div className="content-container">
          <div className="location-info">
            <h2>DIRECCIÓN</h2>
            <p>Av. Ferrocarril 146 - 150 esquina con prolongación San Carlos</p>
            <button className="location-btn">VER UBICACIÓN</button>
            <button className="services-btn">SERVICIOS</button>
          </div>

          <div className="movie-details">
            <div className="movie-poster">
              {/* Mostrar la imagen dinámica de la película seleccionada */}
              <img src={movie.image} alt={movie.title} />
            </div>

            <div className="movie-info">
              {/* Mostrar el título, duración, calificación y género dinámicamente */}
              <h2>{movie.title}</h2>
              <div className="movie-metadata">
                <span className="rating">{movie.rating}</span>
                <span className="duration">{movie.duration}</span>
                <span className="genre">{movie.genre}</span>
              </div>

              <div className="showtime-section">
                <div className="date-selector">
                  {['20 NOV, 2024', '21 NOV, 2024', '22 NOV, 2024', '23 NOV, 2024', '24 NOV, 2024'].map((date, index) => (
                    <div className={`date ${index === 0 ? 'active' : ''}`} key={index}>
                      <span className="day">{['MIÉ.', 'JUE.', 'VIE.', 'SÁB.', 'DOM.'][index]}</span>
                      <span className="date-number">{date}</span>
                    </div>
                  ))}
                </div>

                {[ // Información de horarios y formatos
                  { badges: ['2D', 'DOBLADA'], times: ['15:00', '18:00', '21:00'] },
                  { badges: ['2D', 'DOBLADA'], times: ['17:00', '20:00'] },
                  { badges: ['2D', 'DOBLADA', 'XD', 'DBOX'], times: ['16:00', '19:00', '22:00'] },
                ].map((option, index) => (
                  <div className="showtime-options" key={index}>
                    <div className="format-info">
                      <div className="format-badges">
                        {option.badges.map((badge, badgeIndex) => (
                          <span className="badge" key={badgeIndex}>{badge}</span>
                        ))}
                      </div>
                      <span className="seat-type">ASIENTO: GENERAL</span>
                    </div>
                    <div className="times">
                      {option.times.map((time, timeIndex) => (
                        <button className="time-btn" key={timeIndex} onClick={() => handleTimeClick(time)}>{time}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pago2;
