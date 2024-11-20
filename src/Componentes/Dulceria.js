import React, { useState } from 'react';
import { FaChair } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import '../Estilos/Dulceria.css'; 

function Dulceria() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = [
    "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"
  ];
  const seatsPerRow = 33;

  const toggleSeatSelection = (row, seat) => {
    const seatId = `${row}${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div>
      <HeaderClient />
      <div className="dulceria-content">
        <h1>Dulcería</h1>
        <p>Disfruta de nuestros deliciosos combos de palomitas, nachos y bebidas.</p>
      </div>
      <div className="seat-selection">
        <h2>Selecciona tus asientos</h2>
        <div className="screen">Pantalla</div>
        <div className="seats-container">
          {rows.map((row) => (
            <div key={row} className="row">
              {Array.from({ length: seatsPerRow }, (_, index) => {
                const seatNumber = index + 1;
                const seatId = `${row}${seatNumber}`;
                const isSelected = selectedSeats.includes(seatId);
                const seatClass = isSelected ? "seat selected" : "seat available";
                return (
                  <div
                    key={seatId}
                    className={seatClass}
                    onClick={() => toggleSeatSelection(row, seatNumber)}
                  >
                    <FaChair className="seat-icon" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dulceria;
