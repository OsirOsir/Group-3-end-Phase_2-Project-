import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const Artwork = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/artworks')
      .then(response => response.json())
      .then(data => setArtworks(data));
  }, []);

  return (
    <div className="artwork-container">
      <h4 className='subhead'>Artwork</h4>
      <div className="items-grid">
        {artworks.map(artwork => (
          <ItemCard key={artwork.id} item={artwork} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(artwork)} />
        ))}
      </div>
    </div>
  );
};

export default Artwork;