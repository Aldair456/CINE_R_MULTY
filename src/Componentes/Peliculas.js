import React from 'react';
import HeaderClient from './HeaderClient';

function Peliculas() {
  return (
    <div>
      <HeaderClient />
      <div className="peliculas-content">
        <h1>Películas</h1>
        <p>Aquí encontrarás todas las películas disponibles.</p>
      </div>
    </div>
  );
}

export default Peliculas;
