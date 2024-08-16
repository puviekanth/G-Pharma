import React, { useState, useEffect } from 'react';
import './NavBar.css';
import logo from './images/logo_new.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Assuming you have a way to check login status, like checking localStorage or a global state
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <h2>Genuine Pharmacy</h2>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/Home">Home</a></li>
        <li className="navbar-item dropdown">
          <a href="/shop" className="dropdown-toggle">Shop</a>
          <ul className="dropdown-menu">
            <li><a href="/shop/medicine">Medicine</a></li>
            <li><a href="/shop/beauty-products">Beauty Products</a></li>
            <li><a href="/shop/ayurvedic-products">Ayurvedic Products</a></li>
            <li><a href="/shop/baby-care">Baby Care</a></li>
            <li><a href="/shop/personal-care">Personal Care</a></li>
            <li><a href="/shop/vetenary-care">Veternary Care</a></li>
            <li><a href="/shop/sexual-wellness">Sexual Wellness</a></li>
          </ul>
        </li>
        <li className="navbar-item"><a href="/About">About Us</a></li>
        <li className="navbar-item"><a href="/Contact">Contact Us</a></li>
        <li className="navbar-item"><a href="/profile">Profile</a></li>
        <li className="navbar-item"><a href="/cart">Cart</a></li>
        <li className="navButton">
          {isLoggedIn ? (
            <a href="/add-prescription"><button className="prescription">Add Prescription</button></a>
          ) : (
            <a href="/Login"><button className="prescription">Login</button></a>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
