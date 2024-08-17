import React, { useState, useEffect } from "react";
import "./Navbar.css";
import searchIcon from "./images/search-icon.png";
import cartIcon from "./images/cart-icon.png";
import HelpModal from "./HelpModal";

const showForm = (formType) => {
  const forms = document.querySelectorAll(".form-container");
  forms.forEach(form => {
    form.style.display = form.classList.contains(formType) ? "flex" : "none";
  });
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user'); 
      setIsLoggedIn(!!user);
    };

    checkAuthStatus();
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Handle logout
      localStorage.removeItem('user'); 
      setIsLoggedIn(false);
      alert("Logged out successfully"); // Alert on successful logout
    } else {
      // Show sign-in form
      showForm('sign-in-form');
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    // Fetch users from JSON server
    try {
      const response = await fetch('https://server-db-json.onrender.com/users');
      const users = await response.json();

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('user', email); 
        setIsLoggedIn(true);
        alert("Sign In successful");
        showForm('none'); 
        setSignInError(""); 
      } else {
        setSignInError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setSignInError("An error occurred. Please try again later.");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if user already exists
    try {
      const response = await fetch('https://server-db-json.onrender.com/users');
      const users = await response.json();

      if (users.some(user => user.email === email)) {
        alert("Email already exists. Please sign in.");
        showForm('sign-in-form');
        return;
      }

      // Add new user
      const postResponse = await fetch('https://server-db-json.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (postResponse.ok) {
        alert("Account created successfully");
        showForm('none'); // Hide all forms
      } else {
        alert("Error creating account");
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  const toggleHelpModal = () => {
    setHelpModalOpen(!isHelpModalOpen);
  };

  return (
    <>
      <div className="shopsphere-header">
        <div className="shopsphere-header-left-section">
          <h2>SHOPSPHERE</h2>
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

          <button className="signup-button" onClick={handleAuthButtonClick}>
            {isLoggedIn ? 'Log Out' : 'Sign In'}
          </button>

          <button className="help-button" onClick={toggleHelpModal}>
            Help
          </button>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-form" style={{ display: 'none' }}>
        <div className="form">
          <form id="signInForm" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <div className="form-group">
              <label htmlFor="userEmail">Email:</label>
              <input type="email" id="userEmail" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="userPassword">Password:</label>
              <input type="password" id="userPassword" name="password" required />
            </div>
            {signInError && <p className="error-message">{signInError}</p>}
            <button type="submit" id="submitButtonIn">Sign In</button>
            <p>Don't have an account? <a href="#" id="switchToSignUp" onClick={() => showForm('sign-up-form')}>Sign Up</a></p>
          </form>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="form-container sign-up-form" style={{ display: 'none' }}>
        <div className="form">
          <form id="signUpForm" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" id="submitButtonUp">Sign Up</button>
            <p>Already have an account? <a href="#" id="switchToSignIn" onClick={() => showForm('sign-in-form')}>Sign In</a></p>
          </form>
        </div>
      </div>

     
      {isHelpModalOpen && (
        <HelpModal onClose={toggleHelpModal} />
      )}
    </>
  );
};

export default Navbar;