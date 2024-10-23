import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';
import OnlineSupport from './images/icons8-online-support-64.png'
import Email from './images/email.png'
import Search from './images/icons8-search-50.png'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [search,setSearch]=useState('');

  useEffect(() => {
    const loggedInStatus =()=>{
      const token = localStorage.getItem('token');
      if(!token){
        return false;
      }
      else{
        return true;
      }
    } ;
    setIsLoggedIn(loggedInStatus);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleSignout = () =>{
    localStorage.removeItem('token');
    
  }
return(
<>
  <nav>
    <div className='name-details'>
    <div className="navbar-logo">
          <a href='/Home'><img src={logo} alt="Logo" /></a>
          <a href='/Home'><h2>Genuine Pharmacy</h2></a>
        </div>
        <section className='second-navbar2'>
                <div className='contact-nav2'>
                <div className='online-support'>
                    <img src={OnlineSupport} alt='support' className='online-support-img'/>
                    <a href='tel:0812 202 381' className='phone-no'>081 2202 381</a>
                </div>
                <p>  |  </p>
                <div className='online-email'>
                    <img src={Email} className='email-img' alt='email'/>
                    <a href='mailto:genuinepharmaceuticals@gmail.com' className='email-id'>genuinepharmaceuticals@gmail.com</a>
                </div>
                </div>
                <div className='profile-cart'>
                   <a href='/Profile'><img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/50/228BE6/user.png" alt="user"/></a>
                   <a href='/cart'><img width="35" height="35" src="https://img.icons8.com/glyph-neue/64/228BE6/shopping-cart.png" alt="shopping-cart"/></a>
                </div>
            </section>
    </div>
    
    <div 
className='menu' 
onClick={() => setMenuOpen(!menuOpen)}
>
<span></span>
<span></span>
<span></span>
</div>
<div className='with-nav'>
  <ul id="navbar-links" className={menuOpen ? "open" : ""}>
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
    <a href="/Add-prescription"><button className="prescription">Add Prescription</button></a>
    <a href='/Login'><button className='signout' onClick={handleSignout}>Sign Out</button></a></>
  ) : (
    <><a href="/Login"><button className="prescription" id='loginbtn'>Login</button></a><a href='/signup'><button className='prescription'id='signupbtn'>Sign Up</button></a></>
  )}
</ul>
</div>
   
  </nav>
</>
);
}

export default Navbar;










