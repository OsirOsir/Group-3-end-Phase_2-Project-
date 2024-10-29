import React from 'react';

const Payment = ({ cartItems, total }) => {
  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment successful!'); // Simulate payment processing
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <h4>Total Amount: Ksh {total.toFixed(2)}</h4>
      
      <form onSubmit={handlePayment}>
        <div>
          <label>Name on Card:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Card Number:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input type="text" required placeholder="MM/YY" />
        </div>
        <div>
          <label>CVV:</label>
          <input type="text" required />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
