import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeDeveloper from './HomeDeveloper';
import Peliculas from '../Componentes/Peliculas';
import Cines from '../Componentes/Cines';
import Promociones from '../Componentes/Promociones';
import Socio from '../Componentes/Socio';
import Dulceria from '../Componentes/Dulceria';
import Corporativo from '../Componentes/Corporativo';

function DeveloperRoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomeDeveloper />} />
      <Route path="/peliculas" element={<Peliculas />} />
      <Route path="/cines" element={<Cines />} />
      <Route path="/promociones" element={<Promociones />} />
      <Route path="/socio" element={<Socio />} />
      <Route path="/dulceria" element={<Dulceria />} />
      <Route path="/corporativo" element={<Corporativo />} />
    </Routes>
  );
}

export default DeveloperRoutesConfig;
