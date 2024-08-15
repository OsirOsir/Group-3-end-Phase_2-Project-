import React, { useState, useEffect } from "react";
import FlashSaleItem from "./FlashSaleItem";

function FlashSale({ flashSaleItems, cart, onAddToCart, onRemoveFromCart }) {
  const currentTimeLeft = () => {
    const resetTime = new Date();
    resetTime.setHours(24, 0, 0, 0);

    const currentTime = new Date();

    const difference = resetTime - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 24,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(currentTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(currentTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-header">
        <h2>Flash Sale</h2>
        <p>Ends in:</p>
        <div className="timer">
          {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours} hrs :{" "}
          {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes} mins :{" "}
          {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds} secs
        </div>
      </div>

      <div className="flash-sale-items">
        {flashSaleItems.map((item) => (
          <FlashSaleItem key={item.id} item={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(item)} />
        ))}
      </div>
    </div>
  );
}

export default FlashSale;
