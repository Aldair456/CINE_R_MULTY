import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom para la navegación sin recargar

import '../Estilos/HeaderDeveloper.css'; // Archivo CSS para el estilo
function HeaderDeveloper() {
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
    <nav className="header-developer">
      <div className="header-logo">
        <img
          src={logo || "/path/to/default-logo.png"} // Si hay un logo personalizado, se usa; si no, el logo por defecto
          alt="Logo Cineplanet"
          className="logo-img"
        />
        <div className="logo-edit">
          <label htmlFor="logo-upload">
            <i className="fas fa-upload upload-icon"></i> {/* Icono para subir el logo */}
          </label>
          <input 
            type="file" 
            id="logo-upload" 
            accept="image/*" 
            onChange={handleFileUpload}
            style={{ display: 'none' }} // Ocultamos el input, se activará con el icono
          />
          <button onClick={() => document.getElementById('logo-upload').click()} className="edit-logo-btn">
            Editar Logo
          </button>
        </div>
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
        <button className="edit-mode-btn">Modo Edición</button> 
        <button className="join-btn">Únete</button>
        <i className="fas fa-user-circle icon"></i> {/* Icono de perfil */}
        <i className="fas fa-search icon"></i> {/* Icono de búsqueda */}
        <i className="fas fa-comment icon"></i> {/* Icono de mensajes */}
      </div>
    </nav>
  );
}

export default HeaderDeveloper;
