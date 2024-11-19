import React, { useState } from 'react';
import '../Estilos/Auth.css';

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login y Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manejador de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí debería estar la lógica de autenticación o registro
    onAuthSuccess(); // Simulando autenticación/registro exitoso
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrar'}</h2>
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
        <button type="submit" className="auth-button">
          {isLogin ? 'Iniciar Sesión' : 'Registrar'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
      </button>
    </div>
  );
}

export default Auth;
