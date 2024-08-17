import React, { useState, useEffect } from 'react';
import FlashSale from './components/FlashSale';
import HotInCategory from './components/HotInCategory';
import Cartlist from './components/CartList';
import './App.css';
import './components/Cart.css';
import './components/FlashSale.css';
import Book from './components/Book';
import Artwork from './components/Artwork';
import Cart from './Cart';
import ShoesSection from './ShoesSection';
import ElectronicsSection from './ElectronicsSection';
import ClothesSection from './components/ClothesSection';
import WhatsNew from './components/WhatsNew';

import Navbar from './components/Navbar'
import Categories from './components/Categories';
import Footer from './components/Footer'
import FAQ from './components/FAQ';

function App() {

  const [ flashSaleItems, setFlashSaleItems ] = useState([]);
  const [ hotItems, setHotItems ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [products, setProducts] = useState([]);  // Add setProducts here
  const [showClothes, setShowClothes] = useState(true);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  

  const addToCart = item => {
    setCart([...cart, item]);
  };
  

  const removeFromCart = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("https://server-db-json.onrender.com/flashSale")
    .then(response => response.json())
    .then((items) => setFlashSaleItems(items))
  }, []);

  useEffect(() => {
    fetch("https://server-db-json.onrender.com/hotInCategory")
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
      <Navbar />
      </header>
      <Categories />
      <FlashSale flashSaleItems={flashSaleItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <HotInCategory hotItems={hotItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>
      <Cartlist cart={cart} onRemoveFromCart={handleRemoveFromCart}/>
      <nav>
        <button onClick={() => { setShowClothes(true); setShowWhatsNew(false); }}>Clothes</button>
        <button onClick={() => { setShowClothes(false); setShowWhatsNew(true); }}>What's New</button>
      </nav>
      {showClothes && <ClothesSection />}
      {showWhatsNew && <WhatsNew />}
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

