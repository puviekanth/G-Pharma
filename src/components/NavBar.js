import React from 'react';
import './NavBar.css'
import logo from './images/bg log.png'




function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" /><h2>Genuine Pharmacy</h2>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/about">Shop</a></li>
        <li className="navbar-item"><a href="/services">About Us</a></li>
        <li className="navbar-item"><a href="/contact">Contact Us</a></li>
        <li className="navbar-item" ><a href="/profile">Profile</a></li>
        <li className="navbar-item"><a href="/cart">Cart</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
