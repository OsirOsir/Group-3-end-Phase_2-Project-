import React from "react";
import "./HelpModal.css"; // Ensure you have styles for the modal

const HelpModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Help Information</h2>
        <p>Welcome to ShopSphere, your one-stop shop for all your needs! Here you can find a wide range of products from electronics to clothing. Feel free to browse and add items to your cart.</p>
        <p>If you have any questions, feel free to reach out to our support team via the contact page.</p>
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpModal;
