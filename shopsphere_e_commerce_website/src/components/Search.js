// src/Search.js
import React, { useState } from "react";
import "./Search.css"; 
import searchIcon from "./images/search-icon.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch('https://server-db-json.onrender.com/products');
      const products = await response.json();

      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );

      setSearchResults(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button className="search-button">
        <img className="search-icon" src={searchIcon} alt="Search Icon" />
      </button>
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
