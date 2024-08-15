
import React, { useState, useEffect } from 'react';
import ClothesSection from './components/ClothesSection';
import WhatsNew from './components/WhatsNew';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);  // Add setProducts here
  const [showClothes, setShowClothes] = useState(true);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:5500/products')
      .then(response => response.json())
      .then(data => setProducts(data));  // Use setProducts here
  }, []);

  return (
    <div className="App">
      <nav>
        <button onClick={() => { setShowClothes(true); setShowWhatsNew(false); }}>Clothes</button>
        <button onClick={() => { setShowClothes(false); setShowWhatsNew(true); }}>What's New</button>
      </nav>

      {showClothes && <ClothesSection />}
      {showWhatsNew && <WhatsNew />}
    </div>
  );
}

export default App;