import React, { useState, useEffect } from "react"; 
import "./Navbar.css";
import searchIcon from "./images/search-icon.png";
import cartIcon from "./images/cart-icon.png";
import HelpModal from "./HelpModal";

const Navbar = ({ cart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState('user'); // Default to 'user'
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

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
        setRole(profileData.role); // Set user role from profile data
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
      setRole('user'); // Reset role on logout
      alert("Logged out successfully");
    } else {
      setShowSignInForm(true);
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

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const selectedRole = event.target.role.value; // Get selected role

    try {
      const response = await fetch('/api/users');
      const users = await response.json();

      if (users.some(user => user.email === email)) {
        alert("Email already exists. Please sign in.");
        setShowSignInForm(true);
        return;
      }

      const postResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: selectedRole }), // Include selected role
      });

      if (postResponse.ok) {
        alert("Account created successfully");
        setShowSignInForm(true);
      } else {
        alert("Error creating account");
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/users/delete', {
        method: 'DELETE',
        credentials: 'include' // Ensure to send cookies if required
      });

      if (response.ok) {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserProfile(null);
        setRole('user'); // Reset role on account deletion
        alert("Sad to see you leave! Account deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(`Error deleting account: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("An error occurred while deleting the account. Please try again later.");
    }
  };

  const toggleHelpModal = () => {
    setHelpModalOpen(!isHelpModalOpen);
  };

  const closeSignInForm = () => setShowSignInForm(false);
  const closeSignUpForm = () => setShowSignUpForm(false);

  return (
    <>
      <div className="shopsphere-header">
        <div className="shopsphere-header-left-section">
          <h2>SHOPSPHERE</h2>
        </div>

        <div className="shopsphere-header-middle-section">
          <form onSubmit={handleSearch}>
            <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} />
            {/* <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearchInputChange} style={{ width: '150px' }} /> */}
            <button className="search-button" type="submit">
              <img className="search-icon" src={searchIcon} alt="Search Icon" />
            </button>
          </form>
        </div>

        <div className="shopsphere-header-right-section">
          <a className="cart-link" href="checkout.html">
            <img className="cart-icon" src={cartIcon} alt="Cart Icon" />
            <div className="cart-quantity">{cart.length}</div>
            <div className="cart-text">Cart</div>
          </a>

          <button className="signup-button" onClick={handleAuthButtonClick}>
            {isLoggedIn ? 'Log Out' : 'Sign In'}
          </button>

          {isLoggedIn && userProfile && (
            <div className="user-profile">
              <span>Welcome, {userProfile.name}!</span>
            </div>
          )}

          {isLoggedIn && role === 'admin' && ( // Check if the user is an admin
            <button className="admin-button">
              Admin Panel
            </button>
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
              <li key={item.id}>{item.item_name}</li>
            ))}
          </ul>
        ) : (
          <p>No items match your search.</p>
        )}
      </div>

      {showSignInForm && (
        <div className="form-container sign-in-form">
          <div className="form">
            <button className="close-button" onClick={closeSignInForm}>X</button> {/* Close button */}
            <form id="signInForm" onSubmit={handleSignIn}>
              <h2>Sign In</h2>
              <div className="form-group">
                <label htmlFor="userEmail">Email:</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="userPassword">Password:</label>
                <input type="password" name="password" required />
              </div>
              {signInError && <p className="error-message">{signInError}</p>}
              <button type="submit">Log In</button>
              <button type="button" onClick={() => { setShowSignInForm(false); setShowSignUpForm(true); }}>Sign Up</button>
            </form>
          </div>
        </div>
      )}

      {showSignUpForm && (
        <div className="form-container sign-up-form">
          <div className="form">
            <button className="close-button" onClick={closeSignUpForm}>X</button> {/* Close button */}
            <form id="signUpForm" onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              <div className="form-group">
                <label htmlFor="userName">Name:</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">Email:</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="userPassword">Password:</label>
                <input type="password" name="password" required />
              </div>
              <div className="form-group">
                <label htmlFor="userRole">Role:</label>
                <select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="user">Regular User</option>
                  <option value="admin">Admin User</option>
                </select>
              </div>
              <button type="submit">Sign Up</button>
              <button type="button" onClick={() => { setShowSignUpForm(false); setShowSignInForm(true); }}>Sign In</button>
            </form>
          </div>
        </div>
      )}

      {isHelpModalOpen && <HelpModal onClose={toggleHelpModal} />}
    </>
  );
};

export default Navbar;
