// CartItem.js
import React from 'react';

const CartItem = ({ item, onRemoveFromCart, inCart }) => (
  <div className="cart-item">
    
    <h4>{item.title}</h4>
    <p>Ksh {item.price.toFixed(2)}</p>
    {inCart && (
      <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
    )}
  </div>
);

export default CartItem;