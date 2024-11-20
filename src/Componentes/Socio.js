import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Estilos/Pago2.css';

function Pago2() {

  const location = useLocation();
  const movie = location.state?.movie || {
    title: 'Película no seleccionada',
    image: '../images/gladiador2.jpg',
    duration: '147 min',
    rating: 'M14',
    genre: '2D DOBLADA'
  };

  return (
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
            <img src={movie.image} alt={movie.title} />
          </div>
          
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <div className="movie-metadata">
              <span className="rating">{movie.rating}</span>
              <span className="duration">{movie.duration}</span>
              <span className="genre">{movie.genre}</span>
            </div>

            <div className="showtime-section">
              <div className="date-selector">
                <div className="date active">
                  <span className="day">MIÉ.</span>
                  <span className="date-number">20 NOV, 2024</span>
                </div>
                <div className="date">
                  <span className="day">JUE.</span>
                  <span className="date-number">21 NOV, 2024</span>
                </div>
                <div className="date">
                  <span className="day">VIE.</span>
                  <span className="date-number">22 NOV, 2024</span>
                </div>
                <div className="date">
                  <span className="day">SÁB.</span>
                  <span className="date-number">23 NOV, 2024</span>
                </div>
                <div className="date">
                  <span className="day">DOM.</span>
                  <span className="date-number">24 NOV, 2024</span>
                </div>
              </div>

              <div className="showtime-options">
                <div className="format-info">
                  <div className="format-badges">
                    <span className="badge">2D</span>
                    <span className="badge">DOBLADA</span>
                  </div>
                  <span className="seat-type">ASIENTO: GENERAL</span>
                </div>
                <div className="times">
                  <button className="time-btn">15:00</button>
                  <button className="time-btn">18:00</button>
                  <button className="time-btn">21:00</button>
                </div>
              </div>

              <div className="showtime-options">
                <div className="format-info">
                  <div className="format-badges">
                    <span className="badge">2D</span>
                    <span className="badge">DOBLADA</span>
                  </div>
                  <span className="seat-type">ASIENTO: GENERAL</span>
                </div>
                <div className="times">
                  <button className="time-btn">17:00</button>
                  <button className="time-btn">20:00</button>
                </div>
              </div>

              <div className="showtime-options">
                <div className="format-info">
                  <div className="format-badges">
                    <span className="badge">2D</span>
                    <span className="badge">DOBLADA</span>
                    <span className="badge">XD</span>
                    <span className="badge">DBOX</span>
                  </div>
                  <span className="seat-type">ASIENTO: GENERAL</span>
                </div>
                <div className="times">
                  <button className="time-btn">16:00</button>
                  <button className="time-btn">19:00</button>
                  <button className="time-btn">22:00</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pago2;
