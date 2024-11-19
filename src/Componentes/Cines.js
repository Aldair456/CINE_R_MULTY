import React from 'react';
import HeaderClient from './HeaderClient';

function Cines() {
  return (
    <div>
      <HeaderClient />
      <div className="cines-content">
        <h1>Cines</h1>
        <p>Encuentra todos nuestros cines disponibles.</p>
      </div>
    </div>
  );
}

export default Cines;
