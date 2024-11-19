// Auth.js - React Component for Login Page
import React, { useState } from 'react';
import '../Estilos/Auth.css'; // CSS styles for the Login component
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Icons for input fields

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication or registration logic here
    onAuthSuccess(); // Simulate successful login/registration
  };

  return (
    <main className="auth-page-container">
      {/* Left side with illustration */}
      <div className="auth-illustration">
        <img
          src="https://cdn.discordapp.com/attachments/1240772639409176603/1308328148609269791/loginPerson.png?ex=673d8b0a&is=673c398a&hm=3866c521d23be12cf4deab8c1fdd98632a9ca913bb2f1d1e581004dc64f0e901&" // Change to your desired image URL
          alt="Illustration"
          className="illustration-image"
        />
      </div>

      {/* Right side with the authentication form */}
      <div className="auth-form-container">
        <div className="auth-form-content">
          <h2 className="auth-title">{isLogin ? 'Inicio de Sesión' : 'Registrarse'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">
                <FaEnvelope className="icon" /> {/* Email icon */}
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
              <label htmlFor="password">
                <FaLock className="icon" /> {/* Password icon */}
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>
            <button type="submit" className="auth-button">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Auth;
