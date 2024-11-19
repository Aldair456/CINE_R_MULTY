import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom para la navegación sin recargar
import '../Estilos/HeaderDeveloper.css'; // Archivo CSS para el estilo

function HeaderDeveloper({ primaryColor, secondaryColor, backgroundColor }) {
  // Estado para almacenar el logo (puede ser un archivo o una URL)
  const [logo, setLogo] = useState(null);

  // Cargar el logo almacenado cuando el componente se monta
  useEffect(() => {
    const storedLogo = localStorage.getItem('developerLogo');
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  // Manejar la subida del archivo de logo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('developerLogo', reader.result); // Guardar la imagen en base64 en localStorage
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="header-developer" style={{ backgroundColor: backgroundColor, color: primaryColor }}>
      <div className="header-logo">
        <img
          src={logo || "/path/to/default-logo.png"} // Si hay un logo personalizado, se usa; si no, el logo por defecto
          alt="Logo Cineplanet"
          className="logo-img"
        />
        <div className="logo-edit">
          <label htmlFor="logo-upload">
            <i className="fas fa-upload upload-icon" style={{ color: secondaryColor }}></i> {/* Icono para subir el logo */}
          </label>
          <input 
            type="file" 
            id="logo-upload" 
            accept="image/*" 
            onChange={handleFileUpload}
            style={{ display: 'none' }} // Ocultamos el input, se activará con el icono
          />
          <button onClick={() => document.getElementById('logo-upload').click()} className="edit-logo-btn" style={{ backgroundColor: secondaryColor, color: '#fff' }}>
            Editar Logo
          </button>
        </div>
      </div>
      <ul className="nav-links">
        {/* Estos <Link> permiten la navegación entre las distintas rutas configuradas */}
        <li><Link to="/" style={{ color: primaryColor }}>Home</Link></li>
        <li><Link to="/peliculas" style={{ color: primaryColor }}>Películas</Link></li>
        <li><Link to="/cines" style={{ color: primaryColor }}>Cines</Link></li>
        <li><Link to="/promociones" style={{ color: primaryColor }}>Promociones</Link></li>
        <li><Link to="/socio" style={{ color: primaryColor }}>Socio</Link></li>
        <li><Link to="/dulceria" style={{ color: primaryColor }}>Dulcería</Link></li>
        <li><Link to="/corporativo" style={{ color: primaryColor }}>Corporativo</Link></li>
      </ul>
      <div className="header-icons">
        <button className="edit-mode-btn" style={{ backgroundColor: secondaryColor, color: '#fff' }}>Modo Edición</button> 
        <button className="join-btn" style={{ backgroundColor: primaryColor, color: '#fff' }}>Únete</button>
        <i className="fas fa-user-circle icon" style={{ color: primaryColor }}></i> {/* Icono de perfil */}
        <i className="fas fa-search icon" style={{ color: primaryColor }}></i> {/* Icono de búsqueda */}
        <i className="fas fa-comment icon" style={{ color: primaryColor }}></i> {/* Icono de mensajes */}
      </div>
    </nav>
  );
}

export default HeaderDeveloper;
