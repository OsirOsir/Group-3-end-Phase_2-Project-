import React, { useState, useEffect } from 'react';
import FlashSale from './components/FlashSale';
import HotInCategory from './components/HotInCategory';
import Cartlist from './components/CartList';
import './App.css';

import Footer from './components/Footer';
import './components/Cart.css';
import './components/FlashSale.css';
import Book from './components/Book';
import Artwork from './components/Artwork';
import Cart from './Cart';
import ShoesSection from './ShoesSection';
import ElectronicsSection from './ElectronicsSection';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar'
import Categories from './components/Categories';

function App() {

  const [ flashSaleItems, setFlashSaleItems ] = useState([]);
  const [ hotItems, setHotItems ] = useState([]);
  const [ cart, setCart ] = useState([]);
  

  const addToCart = item => {
    setCart([...cart, item]);
  };
  

  const removeFromCart = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };

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
      <Categories />
      <FlashSale flashSaleItems={flashSaleItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <HotInCategory hotItems={hotItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>
      <Cartlist cart={cart} onRemoveFromCart={handleRemoveFromCart}/>
      <div className="containers">
        <Book addToCart={addToCart} />
        <Artwork addToCart={addToCart} />
      </div>
      <ShoesSection />
        <ElectronicsSection />
      <Cart cartItems={cart} removeFromCart={removeFromCart} />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;

