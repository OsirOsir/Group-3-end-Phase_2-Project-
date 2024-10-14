import React, { useState, useEffect } from 'react';
import './WhatsNew.css';


const WhatsNew = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/whatsNew')
      .then(response => response.json())
      .then(data => setNewProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCartClick = (item) => {
    if(cart.includes(item.id)){
      onRemoveFromCart(item.id)
    } else {
      onAddToCart(item)
    };
  }

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
            <button className="add-to-cart" onClick={() => handleCartClick(product)}>{cart.includes(product.id) ? "Remove From Cart" : "Add To Cart"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;