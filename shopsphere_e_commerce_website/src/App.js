import React, { useState, useEffect } from 'react';
import FlashSale from './components/FlashSale';
import HotInCategory from './components/HotInCategory';
import Cartlist from './components/CartList';
import './App.css';
import './components/Cart.css';
import './components/FlashSale.css';

import Navbar from './components/Navbar'
import Categories from './components/Categories';

function App() {

  const [ flashSaleItems, setFlashSaleItems ] = useState([]);
  const [ hotItems, setHotItems ] = useState([]);
  const [ cart, setCart ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/flashSale")
    .then(response => response.json())
    .then((items) => setFlashSaleItems(items))
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/hotInCategory")
    .then(response => response.json())
    .then((items) => setHotItems(items))
  }, []);

  const handleAddToCart = (item) => {
    if(!cart.includes(item)){
      setCart([...cart, item])
    };}

    const handleRemoveFromCart = (item) => {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id))
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SHOPSPHERE</h1>
        <button className="cart-button">View Cart</button>
      <Navbar />
      </header>
      <FlashSale flashSaleItems={flashSaleItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <HotInCategory hotItems={hotItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>
      <Cartlist cart={cart} onRemoveFromCart={handleRemoveFromCart}/>
      <Categories />
    </div>
  );
}

export default App;

