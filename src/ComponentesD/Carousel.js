import React from 'react';
import Slider from 'react-slick';
import '../Estilos/Carousel.css'; // Asegúrate de crear y ajustar los estilos aquí

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Transición un poco más lenta para un efecto elegante
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Desplazamiento automático
    autoplaySpeed: 4000, // Tiempo entre desplazamientos (4 segundos)
    pauseOnHover: true, // Pausar el desplazamiento cuando el usuario pasa el cursor
  };

  return (
    <Slider {...settings} className="carousel-container">
      <div className="carousel-slide">
        <img src="https://hips.hearstapps.com/hmg-prod/images/sin-novedad-en-el-frente-pelicula-netflix-66addae05da60.jpg?crop=1xw:1xh;center,top&resize=1200:*" alt="Imagen 1" className="carousel-image" />
        <div className="carousel-content">
          <h2>El Asesino del Juego de las Citas</h2>
          <p>Basada en una historia real que supera cualquier ficción, esta película explora los inquietantes sucesos que envolvieron a Rodney Alcala y Cheryl Bradshaw.</p>
          <button className="buy-button">Comprar</button>
        </div>
      </div>
      <div className="carousel-slide">
        <img src="https://www.spgtalleres.com/_images/news/248/7562_modal.jpg" alt="Imagen 2" className="carousel-image" />
        <div className="carousel-content">
          <h2>Otra Película Destacada</h2>
          <p>Disfruta de otra historia increíble con giros inesperados que te mantendrán al borde de tu asiento.</p>
          <button className="buy-button">Comprar</button>
        </div>
      </div>
      <div className="carousel-slide">
        <img src="https://i.blogs.es/e393df/diseno-sin-titulo/500_333.jpeg" alt="Imagen 3" className="carousel-image" />
        <div className="carousel-content">
          <h2>Una Historia Impactante</h2>
          <p>Esta es la historia que no querrás perderte. Una trama que desafía los límites de la imaginación.</p>
          <button className="buy-button">Comprar</button>
        </div>
      </div>
    </Slider>
  );
}

export default Carousel;
