import React from 'react';

function FlashSaleItem({ item, onAddToCart, onRemoveFromCart, inCart }) {
  
  const handleCartClick = () => {
    if(inCart){
      onRemoveFromCart(item)
    } else {
      onAddToCart(item)
    };
  }
  
  // Modify
  return (
    <div className="flash-sale-card">
      <img src={item.image_url} alt={item.item_name} />
      <h4>{item.item_name}</h4>
      <div className='flash-sale-prices'>
        <p>ksh {item.offer_price}</p>
        <p><span>ksh {item.price}</span></p>
      </div>
      <div className='items_available'><p>Items available: {item.items_available}</p></div>
      
      <button onClick={handleCartClick}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>

    </div>
  )
}

export default FlashSaleItem;