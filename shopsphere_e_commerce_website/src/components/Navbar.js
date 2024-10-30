import React, { useState, useEffect } from "react"; 
import "./Navbar.css";
import searchIcon from "./images/search-icon.png";
import cartIcon from "./images/cart-icon.png";
import HelpModal from "./HelpModal";

const Navbar = ({ cart, setCart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState('user');
  const [showSignInForm, setShowSignInForm] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
      if (user) {
        fetchUserProfile(user);
      }
    };
    checkAuthStatus();
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`/api/profile?email=${email}`);
      if (response.ok) {
        const profileData = await response.json();
        setUserProfile(profileData);
        setRole(profileData.role);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserProfile(null);
      setRole('user');
      alert("Logged out successfully");
    } else {
      setShowSignInForm(true);  // Show sign-in form
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;

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
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', user.email);
        setIsLoggedIn(true);
        fetchUserProfile(user.email);
        alert("Sign In successful");
        setShowSignInForm(false);
        setSignInError("");
      } else {
        setSignInError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setSignInError("An error occurred. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch('/api/delete_account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userProfile.email }),
        });

        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUserProfile(null);
          setRole('user');
        } else {
          alert("Failed to delete account. Please try again later.");
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert("An error occurred while trying to delete your account.");
      }
    }
  };

  const toggleHelpModal = () => {
    setHelpModalOpen(!isHelpModalOpen);
  };

  const addToCart = (itemId, quantity) => {
    const newCart = [...cart, { id: itemId, quantity }];
    setCart(newCart);
  };

  const viewCart = () => {
    alert("Viewing cart");
  };

  return (
    <>
      <div className="shopsphere-header">
        <div className="shopsphere-header-left-section">
          <h2>SHOPSPHERE</h2>
        </div>

        <div className="shopsphere-header-middle-section">
          <form onSubmit={handleSearch}>
            <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} />
            <button className="search-button" type="submit">
              <img className="search-icon" src={searchIcon} alt="Search Icon" />
            </button>
          </form>
        </div>

        <div className="shopsphere-header-right-section">
          <button className="cart-link" onClick={viewCart}>
            <img className="cart-icon" src={cartIcon} alt="Cart Icon" />
            <div className="cart-quantity">{cart.length}</div>
            <div className="cart-text">Cart</div>
          </button>

          <button className="signup-button" onClick={handleAuthButtonClick}>
            {isLoggedIn ? 'Log Out' : 'Sign In'}
          </button>

          {isLoggedIn && userProfile && (
            <div className="user-profile">
              <span>Welcome, {userProfile.name}!</span>
            </div>
          )}

          {isLoggedIn && role === 'admin' && (
            <button className="admin-button">Admin Panel</button>
          )}

          {isLoggedIn && (
            <button className="delete-account-button" onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white' }}>
              Delete Account
            </button>
          )}

          <button className="help-button" onClick={toggleHelpModal}>
            Help
          </button>
        </div>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map(item => (
              <li key={item.id}>
                {item.item_name}
                <button onClick={() => addToCart(item.id, 1)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items match your search.</p>
        )}
      </div>

      {/* Conditional rendering for sign-in form */}
      {showSignInForm && (
        <div className="sign-in-modal">
          <form onSubmit={handleSignIn}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
            {signInError && <p className="error">{signInError}</p>}
            <button type="button" onClick={() => setShowSignInForm(false)}>Close</button>
          </form>
        </div>
      )}

      {/* Conditional rendering for help modal */}
      {isHelpModalOpen && <HelpModal onClose={toggleHelpModal} />}
    </>
  );
};

export default Navbar;
