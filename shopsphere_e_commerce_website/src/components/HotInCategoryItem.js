import React from 'react';

function HotInCategoryItem({ item, onAddToCart, onRemoveFromCart, inCart }) {

  const handleCartClick = () => {
    if(inCart) {
      onRemoveFromCart(item)
    } else {
      onAddToCart(item)
    };
  }
  
  // Modify
  return (
    <div className="hot-in-category-card">
      <img src={item.image_url} alt={item.item_name} />
      <h4>{item.item_name}</h4>
      <p>ksh {item.price}</p>
      <div className='items_available'><p>Items available: {item.items_available}</p></div>
      <button onClick={handleCartClick}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>

    </div>
  )
}

export default HotInCategoryItem;