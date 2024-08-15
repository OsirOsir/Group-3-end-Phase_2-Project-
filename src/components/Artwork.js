import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const Artwork = ({ addToCart }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/artworks')
      .then(response => response.json())
      .then(data => setArtworks(data));
  }, []);

  return (
    <div className="artwork-container">
      <h4 className='subhead'>Artwork</h4>
      <div className="items-grid">
        {artworks.map(artwork => (
          <ItemCard key={artwork.id} item={artwork} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Artwork;
