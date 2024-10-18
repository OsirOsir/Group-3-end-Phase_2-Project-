import React, { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => { // Accept onAddToCart as a prop
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    // Fetch items when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/items'); // Adjust the URL as needed
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError(error.message); // Update the error state
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="error-message">Error: {error}</div>; // Display error message if any
    }

    return (
        <div className="product-list">
            <h2>Available Products</h2>
            <div className="grid-container">
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="product-card">
                            <img src={item.image_url} alt={item.item_name} className="product-image" />
                            <h3>{item.item_name}</h3>
                            <p>{item.description || 'No description available.'}</p>
                            <p>Price: ksh {item.price}</p>
                            <p>Available: {item.items_available}</p>
                            <button onClick={() => onAddToCart(item)}>Add to Cart</button> {/* Add item to cart */}
                        </div>
                    ))
                ) : (
                    <p>No items available</p> // Message when there are no items
                )}
            </div>
        </div>
    );
};

export default ProductList;
