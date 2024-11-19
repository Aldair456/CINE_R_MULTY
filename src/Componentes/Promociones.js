import React from 'react';
import HeaderClient from './HeaderClient';

function Promociones() {
  return (
    <div>
      <HeaderClient />
      <div className="promociones-content">
        <h1>Promociones</h1>
        <p>Aprovecha las mejores promociones para disfrutar de nuestras películas y servicios.</p>
      </div>
    </div>
  );
}

export default Promociones;
