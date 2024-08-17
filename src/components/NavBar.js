import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // If using react-router for routing
import './NavBar.css';
import logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Assuming you have a way to check login status, like checking localStorage or a global state
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    // Set the active link based on the current path
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <h2>Genuine Pharmacy</h2>
      </div>
      <ul className="navbar-links">
        <li className={`navbar-item ${activeLink === '/Home' ? 'active' : ''}`}>
          <a href="/Home">Home</a>
        </li>
        <li className={`navbar-item dropdown ${activeLink.includes('/shop') ? 'active' : ''}`}>
          <a href="/shop" className="dropdown-toggle">Shop</a>
          <ul className="dropdown-menu">
          <li><a href="/Shop/ayurvedic">Ayurvedic Products</a></li>
            <li><a href="/Shop/beaut">Beauty Products</a></li>
            <li><a href="/Shop/supports">Body Supports</a></li>
            <li><a href="/Shop/baby">Baby Care</a></li>
            <li><a href="/Shop/multivitamins">Multivitamins</a></li>
            <li><a href="/Shop/machines">Medical Machines</a></li>
            <li><a href="/Shop/instruments">Medical Instruments</a></li>
            <li><a href="/Shop/vetenary">Veternary Care</a></li>
            <li><a href="/Shop/skincare">Skincare Products</a></li>
            <li><a href="/Shop/sexual-wellness">Sexual Wellness</a></li>
          </ul>
        </li>
        <li className={`navbar-item ${activeLink === '/About' ? 'active' : ''}`}>
          <a href="/About">About Us</a>
        </li>
        <li className={`navbar-item ${activeLink === '/Contact' ? 'active' : ''}`}>
          <a href="/Contact">Contact Us</a>
        </li>
        <li className={`navbar-item ${activeLink === '/Profile' ? 'active' : ''}`}>
          <a href="/Profile">Profile</a></li>
        <li className={`navbar-item ${activeLink === '/cart' ? 'active' : ''}`}>
          <a href="/cart">Cart</a></li>
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
