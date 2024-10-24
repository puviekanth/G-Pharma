import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from './images/Screenshot_2024-08-02_203142-removebg-preview.png';
import OnlineSupport from './images/icons8-online-support-64.png';
import Email from './images/email.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const loggedInStatus = () => {
      const token = localStorage.getItem('token');
      return !!token;
    };
    setIsLoggedIn(loggedInStatus);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleSignout = () => {
    localStorage.removeItem('token');
  };

  return (
    <>
      <nav className='navvvv'>
        <div className='name-details'>
          <div className="navbar-logo" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
            <a href='/Home'><img src={logo} alt="Logo" style={{ marginBottom: '15px' }} /></a>
            <a href='/Home'><h2><b>Genuine Pharmacy</b></h2></a>
          </div>
          <section className='second-navbar2'>
            <div className='contact-nav2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '50px' }}>
              <div className='online-support' style={{marginRight:'10px'}}>
                <img src={OnlineSupport} alt='support' className='online-support-img' style={{ width: '30px', height: 'auto' }} />
                <a href='tel:0812 202 381' className='phone-no' style={{ fontSize: '14px',textDecoration:'none',color:'#000' }}>081 2202 381</a>
              </div>
              <p style={{ marginTop: '10px' }}>  |    </p>
              <div className='online-email' style={{marginLeft:'10px'}}>
                <img src={Email} className='email-img' alt='email' style={{ width: '25px', height: 'auto' }} />
                <a href='mailto:genuinepharmaceuticals@gmail.com' className='email-id' style={{ fontSize: '14px',textDecoration:'none',color:'#000' }}>   genuinepharmaceuticals@gmail.com</a>
              </div>
            </div>
            <div className='profile-cart' style={{ marginLeft: '25px' }}>
              <a href='/Profile'><img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/50/228BE6/user.png" alt="user" style={{ marginRight: '20px' }} /></a>
              <a href='/cart'><img width="35" height="35" src="https://img.icons8.com/glyph-neue/64/228BE6/shopping-cart.png" alt="shopping-cart" /></a>
            </div>
          </section>
        </div>

        <div className='with-nav'>
          <ul id="navbar-links">
            <li className={`navbar-item ${activeLink === '/Home' ? 'active' : ''}`}>
              <a href="/Home">Home</a>
            </li>
            <li className={`navbar-item dropdown ${activeLink.includes('/shop') ? 'active' : ''}`}>
              <a href="/shop" className="dropdown-toggle">Shop ▼</a>
              <ul className="dropdown-menu">
                <li><a href="/Shop/ayurvedic">Ayurvedic Products</a></li>
                <li><a href="/Shop/beaut">Beauty Products</a></li>
                <li><a href="/Shop/supports">Body Supports</a></li>
                <li><a href="/Shop/baby">Baby Care</a></li>
                <li><a href="/Shop/multivitamins">Multivitamins</a></li>
                <li><a href="/Shop/machines">Medical Machines</a></li>
                <li><a href="/Shop/instruments">Medical Instruments</a></li>
                <li><a href="/Shop/vetenary">Veterinary Care</a></li>
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
            {isLoggedIn ? (
              <>
                <a href="/Add-prescription"><button className="btn btn-primary">Add Prescription</button></a>
                <a href='/Login'><button className='btn btn-primary' onClick={handleSignout}>Sign Out</button></a>
              </>
            ) : (
              <>
                <a href="/Login"><button className="prescription" id='loginbtn'>Login</button></a>
                <a href='/signup'><button className='prescription' id='signupbtn'>Sign Up</button></a>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
