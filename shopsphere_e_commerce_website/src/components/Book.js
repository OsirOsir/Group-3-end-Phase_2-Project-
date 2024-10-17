import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const Book = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [books, setBooks] = useState([]);

  // Modify
  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  // Modify
  return (
    <div className="book-container">
      <h4 className='subhead'>Books</h4>
      <div className="items-grid">
        {books.map(book => (
          <ItemCard key={book.id} item={book} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(book)} />
        ))}
      </div>
    </div>
  );
};

export default Book;