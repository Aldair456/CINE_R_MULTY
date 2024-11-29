// OtroComponente.js
import React, { useEffect } from 'react';

function OtroComponente() {
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Utilizar el token para realizar solicitudes autenticadas
      console.log('Token de autenticación:', authToken);
      // Aquí puedes hacer algo con el token, como enviar una solicitud a la API
    }
  }, []);

  return (
    <div>
      {/* Renderizar el contenido del componente */}
    </div>
  );
}

export default OtroComponente;
