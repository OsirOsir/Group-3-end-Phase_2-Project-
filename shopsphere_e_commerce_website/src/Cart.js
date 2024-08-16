import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    alert('Checkout successful!'); // This simulates a checkout action
    // You can also add further logic to process the checkout
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <h3>No items in cart</h3>
      ) : (
        <div className="cart-content">
          <h4 className="cart-quantity">You have {cartItems.length} items in your cart</h4>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemoveFromCart={removeFromCart}
                inCart={true}
              />
            ))}
          </div>
          <h3 className="cart-total">Total: ksh{total.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;