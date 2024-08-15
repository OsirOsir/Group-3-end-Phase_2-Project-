import React from "react";
import "./Navbar.css";

import searchIcon from "./images/search-icon.png";
import cartIcon from "./images/cart-icon.png";


function Navbar() {
  return (
    <div className="shopsphere-header">
      <div className="shopsphere-header-left-section">
        <p>Shopsphere</p>
      </div>

      <div className="shopsphere-header-middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={searchIcon} alt="Search Icon" />
        </button>
      </div>

      <div className="shopsphere-header-right-section">
        <a className="cart-link" href="checkout.html">
          <img className="cart-icon" src={cartIcon} alt="Cart Icon" />
          <div className="cart-quantity">0</div>
          <div className="cart-text">Cart</div>
        </a>
        
        <a className="signup-link" href="signup.html">
          <button className="signup-button">Sign Up</button>
        </a>
        <a className="help-link" href="help.html">
          <button className="help-button">
            {/* <img className="help-icon" src={helpIcon} alt="Help Icon" /> */}
            Help
          </button>
        </a>
        
      </div>
    </div>
  );
}

export default Navbar;
