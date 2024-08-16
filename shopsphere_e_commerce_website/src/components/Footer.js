import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
        <h4 className='title'>SHOPSPHERE</h4>
          <div className='footer-details'>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul className='links'>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-support">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="/shipping">Shipping & Delivery</a></li>
              <li><a href="/returns">Returns & Refunds</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ShopSphere. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Footer