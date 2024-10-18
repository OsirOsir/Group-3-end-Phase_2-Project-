import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import FlashSale from './components/FlashSale';
import HotInCategory from './components/HotInCategory';
import Cartlist from './components/CartList';
import './components/Cart.css';
import './components/FlashSale.css';
import './App.css';
import Book from './components/Book';
import Artwork from './components/Artwork';
import ShoesSection from './ShoesSection';
import ElectronicsSection from './ElectronicsSection';
import ClothesSection from './components/ClothesSection';
import WhatsNew from './components/WhatsNew';
import Payment from './Payment';
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
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  

  // const addToCart = item => {
  //   setCart([...cart, item]);
  // };
  

  // const removeFromCart = itemId => {
  //   setCart(cart.filter(item => item.id !== itemId));
  // };

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  // Modify
  useEffect(() => {
    fetch("/api/flashsale")
    .then(response => response.json())
    .then((items) => setFlashSaleItems(items))
  }, []);

  // Modify
  useEffect(() => {
    fetch("/api/hot_in_category")
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
      <Navbar cart={cart} />
      </header>
      <Categories />

      <FlashSale flashSaleItems={flashSaleItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <HotInCategory hotItems={hotItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart}/>
      <Cartlist cart={cart} onRemoveFromCart={handleRemoveFromCart}/>
      <nav>
        <button onClick={() => { setShowClothes(true); setShowWhatsNew(false); }}>Clothes</button>
        <button onClick={() => { setShowClothes(false); setShowWhatsNew(true); }}>What's New</button>
      </nav>
      {showClothes && <ClothesSection  cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />}
      {showWhatsNew && <WhatsNew  cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />}
      <div className="containers">
        <Book cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        <Artwork cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      </div>
      <ShoesSection  cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <ElectronicsSection  cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      {/* <Cart cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} /> */}
      <FAQ />
      <Footer />
      {/* Button to show the Payment component */}
      <button onClick={() => setIsPaymentVisible(true)}>Proceed to Payment</button>

      {/* Conditionally render Payment component */}
      {isPaymentVisible && <Payment />}
    </div>
  );
}

export default App;

