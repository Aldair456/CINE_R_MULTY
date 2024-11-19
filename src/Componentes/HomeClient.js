import React, { useEffect, useState } from 'react';
import HeaderClient from './HeaderClient'; // Importa el Header del Cliente
import '../Estilos/HomeClient.css'; // Archivo CSS para el estilo del Home del Cliente

function HomeClient() {
  const [content, setContent] = useState("Este es el contenido que se muestra al cliente.");

  // Cargar el contenido almacenado cuando el componente se monta
  useEffect(() => {
    const storedContent = localStorage.getItem('developerContent');
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  return (
    <div>
      <HeaderClient />
    </div>
  );
}

export default HomeClient;
