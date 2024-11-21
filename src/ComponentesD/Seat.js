import React from 'react';
import classNames from 'classnames';
import { MdEventSeat } from 'react-icons/md';
import '../Estilos/Seat.css'; // Importa los estilos aquí

function Seat({ status, onClick }) {
  return (

    <button

      onClick={onClick}
      disabled={status === 'occupied'}
      className={classNames(
        'w-12 h-12 m-1 rounded-lg transition-colors border-2 shadow-md',
        'flex items-center justify-center',
        status === 'occupied' && 'cursor-not-allowed bg-red-600 border-red-700',
        status === 'available' && 'bg-gray-700 border-gray-800 hover:bg-gray-600',
        status === 'selected' && 'bg-green-500 border-green-600 hover:bg-green-400'
      )}
      aria-label={`Asiento ${status}`}
    >
      <MdEventSeat
        className={classNames(
          'w-8 h-8',
          status === 'occupied' && 'text-red-600',
          status === 'available' && 'text-gray-700',
          status === 'selected' && 'text-green-500'
        )}
      />
    </button>
  );
}

export default Seat;
