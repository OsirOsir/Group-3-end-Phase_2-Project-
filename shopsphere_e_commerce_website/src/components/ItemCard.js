import React from 'react';

const ItemCard = ({ item, onAddToCart, onRemoveFromCart, inCart }) => {

  const handleCartClick = () => {
    if(inCart){
      onRemoveFromCart(item)
    } else {
      onAddToCart(item)
    };
  }

  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.author || item.artist}</p>
      <p>ksh. {item.price}</p>
      <button onClick={handleCartClick}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>
    </div>
  );
};

export default ItemCard;