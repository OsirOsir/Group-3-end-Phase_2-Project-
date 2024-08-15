import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-about">
            <h4>About Us</h4>
            <p>Your go-to platform for the latest and greatest in fashion, electronics, and home essentials. Shop with confidence and style!</p>
          </div>
          <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-support">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="/shipping">Shipping & Delivery</a></li>
              <li><a href="/returns">Returns & Refunds</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div class="footer-social">
            <h4>Follow Us</h4>
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 ShopSphere. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Footer