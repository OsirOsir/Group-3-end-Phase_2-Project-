import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

// Modify
const Artwork = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [artworks, setArtworks] = useState([]);

  // Modify
  useEffect(() => {
    fetch('/api/artwork')
      .then(response => response.json())
      .then(data => setArtworks(data));
  }, []);

  // Modify
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