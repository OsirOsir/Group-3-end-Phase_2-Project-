import React from 'react';

const ItemCard = ({ item, addToCart }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.author || item.artist}</p>
      <p>ksh. {item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default ItemCard;