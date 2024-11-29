// Login.js - Componente para la página de inicio de sesión
import React, { useState } from 'react';
import '../Estilos/Login.css'; // Archivo CSS opcional para darle estilo al Login

function Login({ onAuthSuccess }) {
  // Estados para manejar los valores de user_id, contraseña y estado de autenticación
  const [userId, setUserId] = useState(''); // Estado para user_id
  const [password, setPassword] = useState(''); // Estado para contraseña
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

  // Manejar el evento de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tenant_id: "Cineplanet", // Tenant ID fijo
      user_id: userId,
      password: password, // Agregar la contraseña al cuerpo de la solicitud
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
        
        // Guardar el token de autenticación
        const authToken = responseData.token; // Asegúrate de que el token esté en la respuesta
        onAuthSuccess(authToken); // Pasar el token al padre
        setIsAuthenticated(true); // Cambiar el estado de autenticación
        // Limpiar campos
        setUserId('');
        setPassword('');
        setError('');
      } else {
        // Manejo de errores basado en el código de estado
        setError(responseData.body || 'Error al iniciar sesión. Verifica tus credenciales.');
        console.error('Error al iniciar sesión:', responseData);
        setIsAuthenticated(false); // Asegurarse de que el estado de autenticación sea falso
      }
    } catch (error) {
      setError('Error en la conexión.');
      console.error('Error en la conexión:', error);
      setIsAuthenticated(false); // Asegurarse de que el estado de autenticación sea falso
    }
  };

  // Renderizar contenido basado en el estado de autenticación
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userId">User ID:</label>
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
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  // Si está autenticado, puedes redirigir a otra página o mostrar un mensaje
  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Has iniciado sesión correctamente.</p>
      {/* Aquí podrías redirigir o mostrar el contenido de la aplicación */}
    </div>
  );
}

export default Login;
