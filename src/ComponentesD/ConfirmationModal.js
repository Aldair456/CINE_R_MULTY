import React from 'react';
import '../Estilos/ConfirmationModal.css';
import { useNavigate } from 'react-router-dom';

function ConfirmationModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="checkmark">
            <span>&#10004;</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Cobrado correctamente!</h2>
          <p className="mb-4">Puede ir a ver sus tickets!</p>
          <div className="modal-actions">
            <button className="button red-button" onClick={() => navigate('/')}>
              Regresar!
            </button>
            <button className="button yellow-button" onClick={onClose}>
              QUEDARME AQUÍ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
