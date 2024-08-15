import './App.css';
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
      <Navbar />
      </header>
      <Categories />
    </div>
  );
}

export default App;

