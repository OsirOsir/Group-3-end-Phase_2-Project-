
import React, { useState, useEffect } from 'react';
import './ShoesSection.css';

// Modify
const ShoesSection = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [shoesData, setShoesData] = useState([]);
  // const [cart, setCart] = useState([]);

  // Modify
  useEffect(() => {
    fetch('/api/shoes')
      .then(response => response.json())
      .then(data => setShoesData(data))
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
    <div className="shoes-section">
      <h2>Shoes</h2>
      <div className="shoes-grid">
        {shoesData.map((shoe) => (
          <div key={shoe.id} className="shoe-card">
            <div className="image-placeholder">
              <img src={shoe.image_url} alt={shoe.item_name} />
            </div>
            <div className="shoe-details">
              <p className="description">{shoe.item_name}</p>
              <p className="price">ksh {shoe.offer_price}</p>
              <p><span className="original-price">ksh {shoe.price}</span></p>
              <div className='items_available'><p>Items available: {shoe.items_available}</p></div>
                 
              <button className="add-to-cart" onClick={() => handleCartClick(shoe)}>{cart.includes(shoe.id) ? "Remove From Cart" : "Add To Cart"}</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ShoesSection;

