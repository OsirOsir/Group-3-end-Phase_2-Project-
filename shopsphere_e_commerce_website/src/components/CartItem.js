import React, { useState } from 'react'

function CartItem({ item, onRemoveFromCart, inCart}) {

    const [ itemQuantity, setItemQuantity] = useState(1);

    const addQuantity = () => {
        setItemQuantity((itemQuantity) => itemQuantity + 1)
    };

    const reduceQuantity = () => {
        if(itemQuantity > 1) {
            setItemQuantity((itemQuantity) => itemQuantity - 1)
        }
    }

    function handleRemoveFromCart () {
        if(inCart){
            onRemoveFromCart(item)
        }
    };

  return (
    <div className="in-cart-card">
        <div className="card-details">
          <img src={item.productImage} alt={item.productDescription} />
          <div className="card-description">
            <h4>{item.productDescription}</h4>
            <p>Item price: <strong>ksh {item.productPrice}</strong></p>
            <p>Summative item price:<strong>ksh {parseInt(item.productPrice * itemQuantity)}</strong></p>
            <div className="item-quantity-cart">
                <p>Quantity</p>
                <button className="subtract-quantity" onClick={reduceQuantity}>-</button>
                <input name="quantity" value={itemQuantity}/>
                <button className="add-quantity" onClick={addQuantity}>+</button>
            </div>
            <button className="remove-from-cart-btn" onClick={handleRemoveFromCart}>Remove From Cart</button>
          </div>
        </div>
     
    </div>
  )
}

export default CartItem;