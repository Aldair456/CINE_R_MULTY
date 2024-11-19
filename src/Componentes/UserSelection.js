import React from 'react';
import '../Estilos/UserSelection.css';

function UserSelection({ onSelectUserType }) {
  return (
    <div className="user-selection">
      <h2>¿Eres un Desarrollador o un Cliente?</h2>
      <button onClick={() => onSelectUserType("developer")} className="select-button">
        Desarrollador
      </button>
      <button onClick={() => onSelectUserType("client")} className="select-button">
        Cliente
      </button>
    </div>
  );
}

export default UserSelection;
