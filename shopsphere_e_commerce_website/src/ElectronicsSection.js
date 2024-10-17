import React, { useState, useEffect } from 'react';
import './ElectronicSection.css';

// Modify
const ElectronicsSection = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [electronicsData, setElectronicsData] = useState([]);
  // const [cart, setCart] = useState([]);

  // Modify
  useEffect(() => {
    fetch('/api/electronics')
      .then(response => response.json())
      .then(data => setElectronicsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCartClick = (item) => {
    if(cart.includes(item.id)){
      onRemoveFromCart(item.id)
    } else {
      onAddToCart(item)
    };
  }

  // Modify
  return (
    <div className="electronics-section">
      <h2>Electronics</h2>
      <div className="electronics-grid">
        {electronicsData.map(item => (
          <div key={item.id} className="electronic-card">
            <div className="image-placeholder">
              <img src={item.image_url} alt={item.item_name} />
            </div>
            <div className="electronic-details">
              <p className="description">{item.item_name}</p>
              <p className="price">ksh {item.price}</p>
              <button className="add-to-cart" onClick={() => handleCartClick(item)}>{cart.includes(item.id) ? "Remove From Cart" : "Add To Cart"}</button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="cart">
        <h3>Cart</h3>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.description} - {item.price}</span>
            <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ElectronicsSection;


