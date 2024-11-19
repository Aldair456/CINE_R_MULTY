import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeClient from './HomeClient';
import Peliculas from './Peliculas';
import Cines from './Cines';
import Promociones from './Promociones';
import Socio from './Socio';
import Dulceria from './Dulceria';
import Corporativo from './Corporativo';

function ClientRoutesConfig() {
  console.log("Cliente Mounted");

  return (
    <Routes>
      <Route path="/" element={<HomeClient />} />
      <Route path="/peliculas" element={<Peliculas />} />
      <Route path="/cines" element={<Cines />} />
      <Route path="/promociones" element={<Promociones />} />
      <Route path="/socio" element={<Socio />} />
      <Route path="/dulceria" element={<Dulceria />} />
      <Route path="/corporativo" element={<Corporativo />} />
    </Routes>
  );
}

export default ClientRoutesConfig;
