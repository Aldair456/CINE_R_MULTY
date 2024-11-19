import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import '../Estilos/HeaderClient.css'; // Archivo CSS para el Header del Cliente

function HeaderClient() {
  const [logo, setLogo] = useState(null);

  // Cargar el logo desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedLogo = localStorage.getItem('developerLogo');
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  return (
    <nav className="header-client">
      <div className="header-logo">
        <img
          src={logo || "/path/to/default-logo.png"} // Si hay un logo personalizado, se usa; si no, el logo por defecto
          alt="Logo Cineplanet"
          className="logo-img"
        />
      </div>
      <ul className="nav-links">
        {/* Estos <Link> permiten la navegación entre las distintas rutas configuradas */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/peliculas">Películas</Link></li>
        <li><Link to="/cines">Cines</Link></li>
        <li><Link to="/promociones">Promociones</Link></li>
        <li><Link to="/socio">Socio</Link></li>
        <li><Link to="/dulceria">Dulcería</Link></li>
        <li><Link to="/corporativo">Corporativo</Link></li>
      </ul>
      <div className="header-icons">
        <button className="join-btn">Únete</button>
        <i className="fas fa-user-circle icon"></i> {/* Icono de perfil */}
        <i className="fas fa-search icon"></i> {/* Icono de búsqueda */}
        <i className="fas fa-comment icon"></i> {/* Icono de mensajes */}
      </div>
    </nav>
  );
}

export default HeaderClient;
