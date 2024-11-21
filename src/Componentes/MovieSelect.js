import React from 'react';

const MovieSelect = ({ movie, onMovieChange }) => {
  const handleSelectChange = (e) => {
    const [index, price] = e.target.value.split(',');
    onMovieChange(Number(index), Number(price));
  };

  return (
    <div className="movie-container">
      <label>Select a movie:</label>
      <select value={`${movie.index},${movie.price}`} onChange={handleSelectChange}>
        <option value="0,220">Godzilla vs Kong (RS.220)</option>
        <option value="1,320">Radhe (RS.320)</option>
        <option value="2,250">RRR (RS.250)</option>
        <option value="3,260">F9 (RS.260)</option>
      </select>
    </div>
  );
};

export default MovieSelect;
