import React, { useState, useEffect } from 'react';
import '../Estilos/SocioCineplanet.css';

function SocioCineplanet({ userType }) {
  const [logoImg, setLogoImg] = useState(null);
  const [title, setTitle] = useState('Bienvenido Socio Cineplanet');
  const [description, setDescription] = useState('¿Estás listo para vivir la más grande experiencia y disfrutar los mejores beneficios? Socio Cineplanet es el programa que esperabas.');

  useEffect(() => {
    // Cargar la imagen almacenada en el localStorage al montar el componente
    const storedLogo = localStorage.getItem('socioLogo');
    if (storedLogo) {
      setLogoImg(storedLogo);
    }
    // Cargar el título y descripción almacenados en el localStorage al montar el componente
    const storedTitle = localStorage.getItem('socioTitle');
    const storedDescription = localStorage.getItem('socioDescription');
    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedDescription) {
      setDescription(storedDescription);
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('socioLogo', reader.result); // Guardar la imagen en base64 en localStorage
        setLogoImg(reader.result); // Actualizar el estado con la nueva imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.innerText;
    setTitle(newTitle);
    localStorage.setItem('socioTitle', newTitle);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.innerText;
    setDescription(newDescription);
    localStorage.setItem('socioDescription', newDescription);
  };

  return (
    <div className="socio-cineplanet-container">
      <div className="socio-card">
        <img
          src={logoImg || 'https://via.placeholder.com/350x200?text=Cineplanet+Socio'}
          alt="Cineplanet Socio"
          className="socio-card-img"
        />
      </div>
      <div className="socio-info">
        <h1
          className="socio-titulo"
          contentEditable={userType === 'developer'}
          suppressContentEditableWarning={true}
          onBlur={handleTitleChange}
          style={{ cursor: userType === 'developer' ? 'text' : 'default' }}
        >
          {title}
        </h1>
        <p
          className="socio-descripcion"
          contentEditable={userType === 'developer'}
          suppressContentEditableWarning={true}
          onBlur={handleDescriptionChange}
          style={{ cursor: userType === 'developer' ? 'text' : 'default' }}
        >
          {description}
        </p>
        <div className="socio-botones">
          <button className="boton-unete">Únete</button>
          <button className="boton-ver-mas">Ver más</button>
          {userType === 'developer' && (
            <>
              <label htmlFor="file-upload" className="boton-actualizar-imagen">
                Actualizar Imagen
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocioCineplanet;
