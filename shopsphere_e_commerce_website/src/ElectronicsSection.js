import React, { useState, useEffect } from 'react';
import './ElectronicSection.css';

const ElectronicsSection = ({ cart = [], onAddToCart, onRemoveFromCart }) => {
  const [electronicsData, setElectronicsData] = useState([]);

  useEffect(() => {
    fetch('/api/electronics')
      .then(response => response.json())
      .then(data => setElectronicsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCartClick = (item) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      onRemoveFromCart(itemInCart);
    } else {
      onAddToCart(item);
    }
  };

  const formatPrice = (price) => {
    return `ksh ${price.toLocaleString()}`;
  };

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
              <p className="price">{formatPrice(item.price)}</p>
              <div className='items_available'><p>Items available: {item.items_available}</p></div>

              <button className="add-to-cart" onClick={() => handleCartClick(item)}>
                {cart.includes(item.id) ? "Remove From Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsSection;
