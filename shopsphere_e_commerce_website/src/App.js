import React from 'react';
import './App.css';
import ShoesSection from './ShoesSection';
import ElectronicsSection from './ElectronicsSection';

function App() {
  return (
    <div className="App">
     <main>
        <ShoesSection />
        <ElectronicsSection />
      </main>
    </div>
  );
}

export default App;
