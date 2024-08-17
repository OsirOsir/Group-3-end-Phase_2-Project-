import React, { useState, useEffect } from 'react';
import './ClothesSection.css';

const ClothesSection = () => {
  const [ClothesData, setClothesData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/clothes')
      .then(response => response.json())
      .then(data => setClothesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addToCart = (Clothes) => {
    console.log('Adding to cart:', Clothes);
    setCart(prevCart => [...prevCart, Clothes]);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    });
    return formatter.format(amount);
  };

  return (
    <div className="Clothes-section">
      <h2>Clothes</h2>
      <div className="Clothes-grid">
        {ClothesData.map((Clothes) => (
          <div key={Clothes.id} className="Clothes-card">
            <div className="image-placeholder">
              <img src={Clothes.image} alt={Clothes.description} />
            </div>
            <div className="Clothes-details">
              <p className="description">{Clothes.description}</p>
              <p className="price">
                {formatCurrency(Clothes.price)} 
                {/* <span className="original-price">{formatCurrency(Clothes.originalPrice)}</span> */}
              </p>
              <button className="add-to-cart" onClick={() => addToCart(Clothes)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.description} - {formatCurrency(item.price)}</span>
            <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;