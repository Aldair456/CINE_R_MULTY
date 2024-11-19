import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UserSelection from './Componentes/UserSelection';
import Auth from './Componentes/Auth';
import ClientRoutesConfig from './Componentes/ClientRoutesConfig'; // Rutas del cliente
import DeveloperRoutesConfig from './ComponentesD/DeveloperRoutesConfig'; // Rutas del desarrollador

function App() {
  const [userType, setUserType] = useState(null); // "developer" o "client"
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Maneja si el usuario está autenticado

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    console.log("User Type:", userType);
    console.log("Is Authenticated:", isAuthenticated);
  };

  return (
    <div className="App">
      {userType === null ? (
        // Mostrar pantalla de selección de usuario si no se ha seleccionado el tipo
        <UserSelection onSelectUserType={setUserType} />
      ) : !isAuthenticated ? (
        // Mostrar pantalla de login o registro si el usuario no está autenticado
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <Router>
          {/* Si el usuario está autenticado, se muestra el contenido según el tipo de usuario */}
          {userType === 'developer' ? (
            <DeveloperRoutesConfig /> // Rutas para desarrollador
          ) : (
            <ClientRoutesConfig /> // Rutas para cliente
          )}
        </Router>
      )}
    </div>
  );
}

export default App;
