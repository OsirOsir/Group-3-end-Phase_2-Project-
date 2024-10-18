import React, { useState, useEffect } from 'react';
import './WhatsNew.css';


const WhatsNew = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const [newProducts, setNewProducts] = useState([]);

  // Modify
  useEffect(() => {
    fetch('/api/whats_new')
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

  // Modify
  return (
    <div className="whats-new">
      <h2>What's New</h2>
      <div className="product-list">
        {newProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.item_name} />
            <h3>{product.item_name}</h3>
            {/* <p>{product.description}</p> */}
            <p>ksh {product.price}</p>
            <div className='items_available'><p>Items available: {product.items_available}</p></div>
            <button className="add-to-cart" onClick={() => handleCartClick(product)}>{cart.includes(product.id) ? "Remove From Cart" : "Add To Cart"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;