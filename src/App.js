import React, { useState } from 'react';
import Book from './components/Book';
import Artwork from './components/Artwork';
import Cart from './Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = item => {
    setCart([...cart, item]);
  };
  

  const removeFromCart = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  return (
    <div className="App">
      <div className="containers">
        <Book addToCart={addToCart} />
        <Artwork addToCart={addToCart} />
      </div>
      <Cart cartItems={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
