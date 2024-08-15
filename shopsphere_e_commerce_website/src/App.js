import './App.css';
import Navbar from './components/Navbar'
import Categories from './components/Categories';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Categories />
      </header>
    </div>
  );
}

export default App;
