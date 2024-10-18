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

const Navbar = ({ cart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Modify
  const [searchResults, setSearchResults] = useState([]); // Modify

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

  // Modify
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const response = await fetch(`/api/search_items?q=${searchTerm}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
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




  const addToCart = async (item_id, quantity = 1) => {
    const user_id = 1; // Replace with actual user ID

    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, item_id, quantity }),
      });

      if (response.ok) {
        alert("Item added to cart");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Function to view cart
  const viewCart = async () => {
    const user_id = 1; // Replace with actual user ID

    try {
      const response = await fetch(`/api/cart/${user_id}`);
      const data = await response.json();
      console.log(data); // Handle displaying cart items as needed
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Function to update cart item
  const updateCartItem = async (cart_id, item_id, quantity) => {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_id, item_id, quantity }),
      });

      if (response.ok) {
        alert("Cart updated");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Function to delete item from cart
  const deleteFromCart = async (cart_id, item_id) => {
    try {
      const response = await fetch('/api/cart/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_id, item_id }),
      });

      if (response.ok) {
        alert("Item deleted from cart");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  const toggleHelpModal = () => {
    setHelpModalOpen(!isHelpModalOpen);
  };

  const checkout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user ? user.id : null; // Retrieve user ID from local storage
  
    if (!user_id) {
      alert("You need to be logged in to proceed to checkout.");
      return;
    }
  
    try {
      const response = await fetch(`/api/cart/checkout/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert("Checkout successful!");
        // Redirect to a confirmation page or update the UI
      } else {
        const data = await response.json();
        alert(data.message || "Checkout failed.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again later.");
    }
  };
  return (
    <>
      <div className="shopsphere-header">
        <div className="shopsphere-header-left-section">
          <h2>SHOPSPHERE</h2>
        </div>

        <div className="shopsphere-header-middle-section"> {/* Modify */}
          <form onSubmit={handleSearch}>
            <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} />

            <button className="search-button" type="submit">
              <img className="search-icon" src={searchIcon} alt="Search Icon" />
            </button>
          </form>

        </div>

        <div className="shopsphere-header-right-section">
          <a className="cart-link" href="#" onClick={viewCart}> {/* View Cart Link */}
            <img className="cart-icon" src={cartIcon} alt="Cart Icon" />
            <div className="cart-quantity">{cart.length}</div>
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

      {/* Display search results */}
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map(item => (
                <li key={item.id}>
                    {item.item_name}
                    <button onClick={() => addToCart(item.id, 1)}>Add to Cart</button> {/* Add to Cart Button */}
                </li>
            ))}
          </ul>
        ) : (
          <p>No items match your search.</p>
        )}
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