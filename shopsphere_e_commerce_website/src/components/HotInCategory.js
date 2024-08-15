import React from 'react';
import HotInCategoryItem from './HotInCategoryItem';

function HotInCategory({ hotItems, onAddToCart, onRemoveFromCart,  cart }) {

  return (
    <div  className="hot-in-category-container">
      <h2>Hot In Category</h2>

      <div className="hot-in-category-items">
        {hotItems.map((item) => (
          <HotInCategoryItem key={item.id} item={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(item)}/>
        ))}

      </div>
    </div>
  )
}

export default HotInCategory;