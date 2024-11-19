import React, { useState, useEffect } from 'react';
import HeaderDeveloper from './HeaderDeveloper'; // Header del desarrollador
import Carousel from './Carousel'; // Importa el componente del carrusel
import PeliculasGrid from './PeliculasGrid'; // Importa el componente del grid de películas
import Socio from './SocioCineplanet'; // Importa el componente de Socio
import { FaPalette } from 'react-icons/fa'; // Icono de paleta de colores de react-icons
import '../Estilos/HeaderDeveloper.css';

function HomeDeveloper() {
  const [primaryColor, setPrimaryColor] = useState('#e60053'); // Color primario
  const [secondaryColor, setSecondaryColor] = useState('#003366'); // Color secundario
  const [backgroundColor, setBackgroundColor] = useState('#f0f4f8'); // Fondo de página
  const [componentBackgroundColor, setComponentBackgroundColor] = useState('#ffffff'); // Fondo de los componentes
  const [showPalette, setShowPalette] = useState(false); // Mostrar/Ocultar la paleta de colores

  // Cargar configuración de colores desde localStorage
  useEffect(() => {
    const storedPrimaryColor = localStorage.getItem('primaryColor');
    const storedSecondaryColor = localStorage.getItem('secondaryColor');
    const storedBackgroundColor = localStorage.getItem('backgroundColor');
    const storedComponentBackgroundColor = localStorage.getItem('componentBackgroundColor');
    
    if (storedPrimaryColor) setPrimaryColor(storedPrimaryColor);
    if (storedSecondaryColor) setSecondaryColor(storedSecondaryColor);
    if (storedBackgroundColor) setBackgroundColor(storedBackgroundColor);
    if (storedComponentBackgroundColor) setComponentBackgroundColor(storedComponentBackgroundColor);
  }, []);

  // Guardar la configuración de colores en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('componentBackgroundColor', componentBackgroundColor);
  }, [primaryColor, secondaryColor, backgroundColor, componentBackgroundColor]);

  // Función para aplicar un tema predefinido
  const applyTheme = (theme) => {
    setPrimaryColor(theme.primary);
    setSecondaryColor(theme.secondary);
    setBackgroundColor(theme.background);
    setComponentBackgroundColor(theme.componentBackground);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <HeaderDeveloper primaryColor={primaryColor} secondaryColor={secondaryColor} backgroundColor={componentBackgroundColor} />

      {/* Icono de paleta para mostrar/ocultar la paleta de temas */}
      <div className="palette-icon" onClick={() => setShowPalette(!showPalette)}>
        <FaPalette size={35} style={{ color: primaryColor }} />
      </div>

      {/* Paleta de colores: aparecerán como círculos cuando showPalette sea true */}
      {showPalette && (
        <div className="color-palette">
          {/* Diferentes temas representados por círculos de colores */}
          <div
            className="color-circle"
            style={{ backgroundColor: '#e60053' }}
            onClick={() => applyTheme({ primary: '#e60053', secondary: '#003366', background: '#f0f4f8', componentBackground: '#ffffff' })}
          />
          <div
            className="color-circle"
            style={{ backgroundColor: '#ff5722' }}
            onClick={() => applyTheme({ primary: '#ff5722', secondary: '#009688', background: '#ffffff', componentBackground: '#f5f5f5' })}
          />
          <div
            className="color-circle"
            style={{ backgroundColor: '#3f51b5' }}
            onClick={() => applyTheme({ primary: '#3f51b5', secondary: '#f44336', background: '#f5f5f5', componentBackground: '#e0e0e0' })}
          />
          <div
            className="color-circle"
            style={{ backgroundColor: '#4caf50' }}
            onClick={() => applyTheme({ primary: '#4caf50', secondary: '#ff9800', background: '#eeeeee', componentBackground: '#ffffff' })}
          />
          <div
            className="color-circle"
            style={{ backgroundColor: '#9c27b0' }}
            onClick={() => applyTheme({ primary: '#9c27b0', secondary: '#673ab7', background: '#fafafa', componentBackground: '#ffffff' })}
          />
        </div>
      )}

      <Carousel primaryColor={primaryColor} secondaryColor={secondaryColor} backgroundColor={componentBackgroundColor} />
      <PeliculasGrid userType="developer" primaryColor={primaryColor} secondaryColor={secondaryColor} backgroundColor={componentBackgroundColor} />
      <Socio userType="developer" primaryColor={primaryColor} secondaryColor={secondaryColor} backgroundColor={componentBackgroundColor} />
    </div>
  );
}

export default HomeDeveloper;
