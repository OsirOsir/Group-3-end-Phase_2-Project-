import React, { useState } from 'react';
import '../styles/Categories.css';

import ElectronicsSection from '../ElectronicsSection';
import ShoesSection from '../ShoesSection';
import Artwork from './Artwork';
import Book from './Book';
import ClothesSection from './ClothesSection'


function Categories()   {
  const categories = ["Clothes", "Shoes", "Artwork", "Electronics", "Books"];
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "Clothes":
        return <ClothesSection />;
      case "Electronics":
        return <ElectronicsSection />;
      case "Shoes":
        return <ShoesSection />;
      case "Artwork":
        return <Artwork />;
      case "Books":
        return <Book />;
      default:
        return <p>Please select a category.</p>;
    }
  };


  return (
    <div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category} <span className="dropdown-icon">▼</span>
          </div>
        ))}
      </div>

      {/* This will display content based on the active category */}
      <div className="category-content">
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default Categories;