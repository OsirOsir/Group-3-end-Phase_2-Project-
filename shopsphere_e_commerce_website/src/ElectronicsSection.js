import React, { useState, useEffect } from 'react';
import './ElectronicSection.css';

const ElectronicsSection = () => {
  const [electronicsData, setElectronicsData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/electronics')
      .then(response => response.json())
      .then(data => setElectronicsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    setCart(prevCart => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  return (
    <div className="electronics-section">
      <h2>Electronics</h2>
      <div className="electronics-grid">
        {electronicsData.map(item => (
          <div key={item.id} className="electronic-card">
            <div className="image-placeholder">
              <img src={item.image} alt={item.description} />
            </div>
            <div className="electronic-details">
              <p className="description">{item.description}</p>
              <p className="price">
                {item.price} <span className="original-price">{item.originalPrice}</span>
              </p>
              <button className="add-to-cart" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h3>Cart</h3>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.description} - {item.price}</span>
            <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsSection;


