import React from 'react';

function FlashSaleItem({ item, onAddToCart, onRemoveFromCart, inCart }) {
  
  const handleCartClick = () => {
    if(inCart){
      onRemoveFromCart(item)
    } else {
      onAddToCart(item)
    };
  }
    
  return (
    <div className="flash-sale-card">
      <img src={item.productImage} alt={item.productDescription} />
      <h4>{item.productDescription}</h4>
      <div className='flash-sale-prices'>
        <p>ksh {item.productPrice}</p>
        <p><span>ksh {item.productPreviousPrice}</span></p>
      </div>
      
      <button onClick={handleCartClick}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>

    </div>
  )
}

export default FlashSaleItem;