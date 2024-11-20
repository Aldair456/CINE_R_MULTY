// React component code
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import HeaderClient from './HeaderClient';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate de react-router-dom
import '../Estilos/Cines.css'; // Assuming the CSS is saved in Cines.css
import peliculasData from './PeliculasData'; // Importamos el archivo de datos de películas

const cinesData = [
  {
    "name": "Cineplanet Plaza Lima",
    "department": "Lima",
    "province": "Lima",
    "district": "Miraflores",
    "address": "Av. Larco 123, Miraflores",
    "facilities": ["3D", "IMAX", "Comida gourmet"],
    "rating": "4.5/5",
    "image": "https://1000marcas.net/wp-content/uploads/2022/12/Cinemark-Logo.jpg"
  },
  {
    "name": "Cinemark Mall Aventura",
    "department": "Arequipa",
    "province": "Arequipa",
    "district": "Cayma",
    "address": "Av. Ejercito 456, Cayma",
    "facilities": ["2D", "Doblada", "Sala VIP"],
    "rating": "4.3/5",
    "image": "https://1000marcas.net/wp-content/uploads/2022/12/Cinemark-Logo.jpg"
  },
  {
    "name": "Cinepolis Real Plaza",
    "department": "La Libertad",
    "province": "Trujillo",
    "district": "Trujillo",
    "address": "Av. Salaverry 789, Trujillo",
    "facilities": ["3D", "Doblada", "Butacas reclinables"],
    "rating": "4.8/5",
    "image": "https://www.sdpnoticias.com/resizer/v2/PMV3SX3225BVPLSMVDIPHVPX34.png?smart=true&auth=dd6bb2eb34cdc76d269a72ee36fdc45c3ad319913941532405d62faeccbd5bfd&width=640&height=360"
  },
  {
    "name": "Cineplex Central",
    "department": "Cusco",
    "province": "Cusco",
    "district": "Wanchaq",
    "address": "Av. Cultura 100, Wanchaq",
    "facilities": ["2D", "3D", "Comida gourmet"],
    "rating": "4.7/5",
    "image": "https://example.com/cineplex-central.jpg"
  },
  {
    "name": "CineMax Sur",
    "department": "Piura",
    "province": "Piura",
    "district": "Castilla",
    "address": "Av. Grau 555, Castilla",
    "facilities": ["2D", "Sala VIP", "Butacas reclinables"],
    "rating": "4.2/5",
    "image": "https://example.com/cinemax-sur.jpg"
  },
  {
    "name": "Cinema Norte",
    "department": "Lima",
    "province": "Huaral",
    "district": "Huaral",
    "address": "Jr. Lima 234, Huaral",
    "facilities": ["2D", "3D", "IMAX"],
    "rating": "4.6/5",
    "image": "https://example.com/cinema-norte.jpg"
  }
];

function Cines() {
  const [filteredDepartment, setFilteredDepartment] = useState('');
  const [filteredProvince, setFilteredProvince] = useState('');
  const [filteredDistrict, setFilteredDistrict] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    department: false,
    province: false,
    district: false
  });

  const navigate = useNavigate(); // Instancia para usar navigate

  const handleDepartmentFilterChange = (department) => {
    setFilteredDepartment(department);
    setFilteredProvince(''); // Reset province and district when department changes
    setFilteredDistrict('');
  };

  const handleProvinceFilterChange = (province) => {
    setFilteredProvince(province);
    setFilteredDistrict(''); // Reset district when province changes
  };

  const handleDistrictFilterChange = (district) => {
    setFilteredDistrict(district);
  };

  const toggleFilter = (filter) => {
    setExpandedFilters(prevState => ({
      ...prevState,
      [filter]: !prevState[filter]
    }));
  };

  const filteredCines = cinesData.filter(cine => {
    return (
      (filteredDepartment === '' || cine.department === filteredDepartment) &&
      (filteredProvince === '' || cine.province === filteredProvince) &&
      (filteredDistrict === '' || cine.district === filteredDistrict)
    );
  });

  const handleCineClick = () => {
    // Generar un número aleatorio de películas para mostrar (entre 2 y 5)
    const numberOfMovies = Math.floor(Math.random() * 4) + 2;
    const randomMovies = peliculasData.sort(() => 0.5 - Math.random()).slice(0, numberOfMovies);

    // Navegar a la página de películas con los datos seleccionados
    navigate('/peliculas', { state: { movies: randomMovies } });
  };

  return (
    <div>
      <HeaderClient />
      <div className="cines-container-new">
        <div className="filter-section-new">
          <h3>Filtrar Por:</h3>
          <div className="filter-category-new">
            <h4 onClick={() => toggleFilter('department')}>Departamento {expandedFilters.department ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.department && (
              <ul>
                {['', 'Lima', 'Arequipa', 'La Libertad', 'Cusco', 'Piura'].map((department, index) => (
                  <li key={index} onClick={() => handleDepartmentFilterChange(department)}>
                    {department || 'Todos'}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="filter-category-new">
            <h4 onClick={() => toggleFilter('province')}>Provincia {expandedFilters.province ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.province && (
              <ul>
                {filteredDepartment
                  ? [...new Set(cinesData.filter(cine => cine.department === filteredDepartment).map(cine => cine.province))].map((province, index) => (
                      <li key={index} onClick={() => handleProvinceFilterChange(province)}>
                        {province || 'Todas'}
                      </li>
                    ))
                  : ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura', 'Huaral'].map((province, index) => (
                      <li key={index} onClick={() => handleProvinceFilterChange(province)}>
                        {province}
                      </li>
                    ))}
              </ul>
            )}
          </div>
          <div className="filter-category-new">
            <h4 onClick={() => toggleFilter('district')}>Distrito {expandedFilters.district ? <FaMinus /> : <FaPlus />}</h4>
            {expandedFilters.district && (
              <ul>
                {filteredProvince
                  ? [...new Set(cinesData.filter(cine => cine.province === filteredProvince).map(cine => cine.district))].map((district, index) => (
                      <li key={index} onClick={() => handleDistrictFilterChange(district)}>
                        {district || 'Todos'}
                      </li>
                    ))
                  : ['Miraflores', 'Cayma', 'Trujillo', 'Wanchaq', 'Castilla', 'Huaral'].map((district, index) => (
                      <li key={index} onClick={() => handleDistrictFilterChange(district)}>
                        {district}
                      </li>
                    ))}
              </ul>
            )}
          </div>
        </div>
        <div className="cines-content-new">
          <h1>Cines</h1>
          <div className="cine-list-new">
            {filteredCines.map((cine, index) => (
              <div key={index} className="cine-card-new" onClick={handleCineClick}>
                <img src={cine.image} alt={cine.name} />
                <div className="cine-info-new">
                  <h2>{cine.name}</h2>
                  <p><strong>Departamento:</strong> {cine.department}</p>
                  <p><strong>Provincia:</strong> {cine.province}</p>
                  <p><strong>Distrito:</strong> {cine.district}</p>
                  <p><strong>Dirección:</strong> {cine.address}</p>
                  <p><strong>Facilidades:</strong> {cine.facilities.join(', ')}</p>
                  <p><strong>Calificación:</strong> {cine.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cines;