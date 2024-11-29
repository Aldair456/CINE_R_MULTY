import React, { useState } from 'react';
import '../Estilos/Login.css'; // Archivo CSS opcional para darle estilo al Login

function Login({ onAuthSuccess }) {
  const [userId, setUserId] = useState(''); // Estado para user_id
  const [password, setPassword] = useState(''); // Estado para contraseña
  const [error, setError] = useState(''); // Estado para manejar los errores

  // Manejar el evento de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tenant_id: "Cineplanet", // Tenant ID fijo
      user_id: userId,
      password: password,
    };

    console.log('Datos enviados:', JSON.stringify(data)); // Verificar los datos enviados

    try {
      // Enviar la solicitud de inicio de sesión
      const response = await fetch('https://1sx1ltgqg8.execute-api.us-east-1.amazonaws.com/dev/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json(); // Obtener la respuesta en formato JSON

      if (response.ok) {
        console.log('Autenticación exitosa:', responseData);
        
        // Recibir el token de autenticación
        const authToken = responseData.token; // Asegúrate de que el token esté en la respuesta
        if (authToken) {
          localStorage.setItem('authToken', authToken); // Guardar el token en localStorage
          onAuthSuccess(authToken); // Pasar el token al padre si es necesario
        } else {
          setError('Usuario o contraseña incorrectos.'); // Mensaje genérico cuando no se recibe el token
        }
        
        // Limpiar campos
        setUserId('');
        setPassword('');
      } else {
        // Mostrar mensaje de error específico según el código de estado
        let errorMessage;
        switch (response.status) {
          case 401:
            errorMessage = 'Usuario o contraseña incorrectos.';
            break;
          case 404:
            errorMessage = 'La URL de la API no se encontró.';
            break;
          case 500:
            errorMessage = 'Ocurrió un error en el servidor. Intenta de nuevo más tarde.';
            break;
          default:
            errorMessage = responseData.message || 'Ocurrió un error. Intenta de nuevo.';
            break;
        }
        setError(errorMessage); // Mostrar mensaje de error específico
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Hubo un problema con la conexión. Intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="userId">Usuario:</label>
          <input 
            type="text" 
            id="userId" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>} {/* Mostrar el error si hay uno */}

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
