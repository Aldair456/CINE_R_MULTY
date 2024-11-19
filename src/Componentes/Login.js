import React, { useState } from 'react';
import '../Estilos/Login.css'; // Archivo CSS opcional para darle estilo al Login

function Login() {
  // Estados para manejar los valores de usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manejar el evento de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de autenticación
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default Login;
