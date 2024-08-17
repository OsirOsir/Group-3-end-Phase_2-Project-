import React, { useState, useEffect } from 'react';
import './WhatsNew.css';


const WhatsNew = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/whatsNew')
      .then(response => response.json())
      .then(data => setNewProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="whats-new">
      <h2>What's New</h2>
      <div className="product-list">
        {newProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Kes{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;