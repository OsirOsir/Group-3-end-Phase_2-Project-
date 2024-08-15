import React from 'react';

function HotInCategoryItem({ item, onAddToCart, onRemoveFromCart, inCart }) {

  const handleCartClick = () => {
    if(inCart) {
      onRemoveFromCart(item)
    } else {
      onAddToCart(item)
    };
  }
  
  return (
    <div className="hot-in-category-card">
      <img src={item.productImage} alt={item.productDescription} />
      <h4>{item.productDescription}</h4>
      <p>ksh {item.productPrice}</p>
      <button onClick={handleCartClick}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>

    </div>
  )
}

export default HotInCategoryItem;