import React from 'react';
import './NavBar.css'
import logo from './images/logo_new.png'




function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" /><h2>Genuine Pharmacy</h2>
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
        <li className="navbar-item" ><a href="/profile">Profile</a></li>
        <li className="navbar-item"><a href="/cart">Cart</a></li>
        <li className='navButton'><a href="/Login"><button className='prescription'>Add Prescription</button></a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
