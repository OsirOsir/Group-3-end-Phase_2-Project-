import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const Book = ({ addToCart }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className="book-container">
      <h4 className='subhead'>Books</h4>
      <div className="items-grid">
        {books.map(book => (
          <ItemCard key={book.id} item={book} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Book;