// // import React, { useState, useEffect } from 'react';
// // import './ShoesSection.css';

// // const ShoesSection = () => {
// //   const [shoesData, setShoesData] = useState([]);
// //   const [cart, setCart] = useState([]);

// //   useEffect(() => {
// //     fetch('http://localhost:5500/shoes')
// //       .then(response => response.json())
// //       .then(data => setShoesData(data))
// //       .catch(error => console.error('Error fetching data:', error));
// //   }, []);

// //   const addToCart = (shoe) => {
// //     console.log('Adding to cart:', shoe);
// //     setCart(prevCart => [...prevCart, shoe]);
// //   };

// //   return (
// //     <div className="shoes-section">
// //       <h2>Shoes</h2>
// //       <div className="shoes-grid">
// //         {shoesData.map((shoe, index) => (
// //           <div key={shoe.id} className="shoe-card">
// //             <div className="image-placeholder">
// //               <img src={shoe.image} alt={shoe.description} />
// //             </div>
// //             <div className="shoe-details">
// //               <p className="description">{shoe.description}</p>
// //               <p className="price">
// //                 {shoe.price} <span className="original-price">{shoe.originalPrice}</span>
// //               </p>
// //               <button className="add-to-cart" onClick={() => addToCart(shoe)}>Add to Cart</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="cart">
// //         <h3>Cart</h3>
// //         {cart.map((item, index) => (
// //           <div key={index}>
// //             {item.description} - {item.price}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShoesSection;

// import React, { useState, useEffect } from 'react';
// import './ShoesSection.css';

// const ShoesSection = () => {
//   const [shoesData, setShoesData] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5500/shoes')
//       .then(response => response.json())
//       .then(data => setShoesData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const addToCart = (shoe) => {
//     console.log('Adding to cart:', shoe);
//     setCart(prevCart => [...prevCart, shoe]);
//   };

//   const removeFromCart = (itemId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
//   };

//   return (
//     <div className="shoes-section">
//       <h2>Shoes</h2>
//       <div className="shoes-grid">
//         {shoesData.map((shoe) => (
//           <div key={shoe.id} className="shoe-card">
//             <div className="image-placeholder">
//               <img src={shoe.image} alt={shoe.description} />
//             </div>
//             <div className="shoe-details">
//               <p className="description">{shoe.description}</p>
//               <p className="price">
//                 {shoe.price} <span className="original-price">{shoe.originalPrice}</span>
//               </p>
//               <button className="add-to-cart" onClick={() => addToCart(shoe)}>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="cart">
//         <h3>Cart</h3>
//         {cart.map((item) => (
//           <div key={item.id} className="cart-item">
//             <span>{item.description} - {item.price}</span>
//             <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShoesSection;

import React, { useState, useEffect } from 'react';
import './ShoesSection.css';

const ShoesSection = () => {
  const [shoesData, setShoesData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://server-db-json.onrender.com/shoes')
      .then(response => response.json())
      .then(data => setShoesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addToCart = (shoe) => {
    console.log('Adding to cart:', shoe);
    setCart(prevCart => [...prevCart, shoe]);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Function to format price
  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="shoes-section">
      <h2>Shoes</h2>
      <div className="shoes-grid">
        {shoesData.map((shoe) => (
          <div key={shoe.id} className="shoe-card">
            <div className="image-placeholder">
              <img src={shoe.image} alt={shoe.description} />
            </div>
            <div className="shoe-details">
              <p className="description">{shoe.description}</p>
              <p className="price">
                {formatPrice(shoe.price)} <span className="original-price">{formatPrice(shoe.originalPrice)}</span>
              </p>
              <button className="add-to-cart" onClick={() => addToCart(shoe)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.description} - {formatPrice(item.price)}</span>
            <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoesSection;

