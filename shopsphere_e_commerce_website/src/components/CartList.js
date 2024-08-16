import React from 'react';
import CartItem from './CartItem';

function Cartlist({ cart, onRemoveFromCart }) {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? <h3>No items in cart</h3> :
      <div className="cart-content">
        <h4 className="cart-quantity">You have {cart.length} items in your cart</h4>
        <div className="cart-items">
        {cart.map((item) => (
          <CartItem 
            key={item.id}
            item={item} 
            onRemoveFromCart={onRemoveFromCart} 
            inCart={true}
          />
        ))}
        </div>
      </div>
       }

      {cart.length === 0 ? null :
         <button className="checkout-btn">Checkout</button>
        }
       
    </div>
  )
}

export default Cartlist;