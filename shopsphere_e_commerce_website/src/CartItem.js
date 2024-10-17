// // CartItem.js
// import React from 'react';

// const CartItem = ({ item, onRemoveFromCart, inCart }) => (
//   <div className="cart-item">
    
//     <h4>{item.title}</h4>
//     <p>Ksh {item.price.toFixed(2)}</p>
//     {inCart && (
//       <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
//     )}
//   </div>
// );

// export default CartItem;

import React from 'react';

const CartItem = ({ item, onRemoveFromCart, inCart }) => {
  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ksh {item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Available Stock: {item.items_available}</p> {/* Show stock availability */}
        {inCart && (
          <button onClick={() => onRemoveFromCart(item.id)} className="remove-btn">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
