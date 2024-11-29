// Auth.js - Componente de React para la Página de Registro/Iniciar Sesión
import React, { useState } from 'react';
import '../Estilos/Auth.css'; // Estilos CSS para el componente Auth
import Login from './Login'; // Importar el componente Login
import { FaEnvelope } from 'react-icons/fa'; // Iconos para los campos de entrada

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Iniciar Sesión y Registrarse
  const [username, setUsername] = useState('');
  const [paternalSurname, setPaternalSurname] = useState(''); // Apellido paterno
  const [maternalSurname, setMaternalSurname] = useState(''); // Apellido materno
  const [userId, setUserId] = useState(''); // user_id
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(''); // Estado para almacenar el token de autenticación

  // Manejar la presentación del formulario para registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Datos a enviar a la API
    const data = {
      tenant_id: "Cineplanet", // Tenant ID fijo
      user_id: userId, // User ID ingresado por el usuario
      email: username, // Correo electrónico ingresado por el usuario
      nombre: username.split('@')[0], // Nombre extraído del correo
      apell_pat: paternalSurname, // Apellido paterno ingresado por el usuario
      apell_mat: maternalSurname, // Apellido materno ingresado por el usuario
      password: password // Contraseña ingresada por el usuario
    };

    try {
      const response = await fetch('https://1sx1ltgqg8.execute-api.us-east-1.amazonaws.com/dev/usuario/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Usuario creado:', result);
        setAuthToken(result.token); // Suponiendo que el token se devuelve al crear el usuario
        setIsLogin(true); // Cambia a la vista de inicio de sesión
        // Limpiar campos
        setUsername('');
        setPaternalSurname('');
        setMaternalSurname('');
        setUserId('');
        setPassword('');
      } else {
        console.error('Error al crear el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <main className="auth-page-container">
      {/* Lado izquierdo con ilustración */}
      <div className="auth-illustration">
        <img
          src="https://www.lavanguardia.com/andro4all/hero/2024/11/chill-guy.png?width=768&aspect_ratio=16:9&format=nowebp" // Cambia a tu URL de imagen deseada
          alt="Ilustración"
          className="illustration-image"
        />
      </div>

      {/* Lado derecho con el formulario de autenticación */}
      <div className="auth-form-container">
        <div className="auth-form-content">
          <h2 className="auth-title">{isLogin ? 'Inicio de Sesión' : 'Registrarse'}</h2>
          {isLogin ? (
            <Login onAuthSuccess={onAuthSuccess} authToken={authToken} /> // Pasar el token de autenticación
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="input-group">
                <label htmlFor="userId">User ID (Número):</label>
                <input
                  type="number"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Introduce tu User ID"
                  required
                  min="0" // Asegura que el user_id sea un número positivo
                />
              </div>
              <div className="input-group">
                <label htmlFor="paternalSurname">Apellido Paterno:</label>
                <input
                  type="text"
                  id="paternalSurname"
                  value={paternalSurname}
                  onChange={(e) => setPaternalSurname(e.target.value)}
                  placeholder="Introduce tu apellido paterno"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="maternalSurname">Apellido Materno:</label>
                <input
                  type="text"
                  id="maternalSurname"
                  value={maternalSurname}
                  onChange={(e) => setMaternalSurname(e.target.value)}
                  placeholder="Introduce tu apellido materno"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">
                  <FaEnvelope className="icon" /> {/* Icono de correo electrónico */}
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Introduce tu correo"
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
                  placeholder="Introduce tu contraseña"
                  required
                />
              </div>
              <button type="submit" className="auth-button">Registrarse</button>
            </form>
          )}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Auth; // Exportar el componente Auth
