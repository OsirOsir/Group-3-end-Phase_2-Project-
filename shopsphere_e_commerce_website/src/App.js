import './App.css';
import Navbar from './components/Navbar'
import Categories from './components/Categories';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
      </header>
      <Categories />
    </div>
  );
}

export default App;
