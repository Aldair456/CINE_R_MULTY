import React, { useState } from 'react';
import { DoorOpen } from 'lucide-react';
import { MdEventSeat } from 'react-icons/md';
import Seat from '../ComponentesD/Seat';
import HeaderClient from '../Componentes/HeaderClient';
import '../Estilos/SeatSelectionApp.css';
import { useNavigate } from 'react-router-dom';

function SeatSelectionApp() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalRows = 6;
  const seatsPerRow = 13;
  const occupiedSeats = [14, 15, 28, 42, 43]; // Example occupied seats

  const navigate = useNavigate();

  const getSeatStatus = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return 'occupied';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handlePaymentClick = () => {
    console.log('Selected seats:', selectedSeats);
    navigate('/dulceria', { state: { selectedSeats } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <HeaderClient />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">SELECCIONE SUS BUTACAS</h1>
        
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <MdEventSeat className="w-8 h-8 text-red-500" />
            <span>Ocupados</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEventSeat className="w-8 h-8 text-black" />
            <span>Libres</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEventSeat className="w-8 h-8 text-green-500" />
            <span>Elegidos</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-13 gap-1">
              {Array.from({ length: totalRows * seatsPerRow }).map((_, index) => (
                <Seat
                  key={index}
                  status={getSeatStatus(index)}
                  onClick={() => handleSeatClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Exit signs */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <DoorOpen className="w-8 h-8" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <DoorOpen className="w-8 h-8" />
          </div>
        </div>

        {/* Screen */}
        <div className="relative">
          <div className="w-full h-8 bg-black mb-4 text-center">
            <span className="text-sm">PANTALLA</span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 font-bold rounded"
            onClick={handlePaymentClick}
          >
            HAZ TU PAGO ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelectionApp;
