import React, { useState, useEffect, useRef } from 'react';
import './delivery.css'; // Import the corresponding CSS file
import Signout from './images/signout-black.png';
import Profile from './images/user-black.png';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState('No 14, Lady Torrington Road Kandy');
    const [contact, setContact] = useState('0751122334');
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const generateMapLink = () => {
        return `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="hamburger-menu" ref={menuRef}>
                <div className='brand'>
                    <img src={Logo} alt='Logo' className='logo'/>
                    <h4><a href='deliveryUI/home'>Genuine Pharmacy</a></h4>
                </div>
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
                <nav className={`menu-nav ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#current-orders">View Current Orders</a>
                        </li>
                        <li>
                            <a href="#ready-orders">View Ready Orders</a>
                        </li>
                    </ul>
                    <div className='profile-signout'>
                        <img src={Profile} alt='Profile' className='profile-icon' />
                        <img src={Signout} alt='Signout' className='signout-icon' />
                    </div>
                </nav>
            </div>
            <section className='ongoing-orders'>
                <h4 style={{'color':'#fff'}}>Currently Ongoing Orders</h4>
                <div className='order-details-delivery'>
                    <p><b>Order ID : </b> 6570fr54aa23456iyou7</p>
                    <p><b>Customer Name </b>: Jon McNroe</p>
                    <p><b>Patient Name :</b> Dinurakshan</p>
                    <p><b>Delivery Address :</b> <a href={generateMapLink()} target="_blank" rel="noopener noreferrer">{address}</a></p>
                    <p><b>Customer Contact :</b> <a href={`tel:${contact}`} >{contact}</a></p>
                    <p><b>Customer Email</b> :- genuine@gmail.com</p>
                    <div className='btns'>
                        <button className='btn btn-success' style={{'fontSize':'12px', 'width':'200px'}}>Completed Delivery</button>
                        <button className='btn btn-danger' style={{'fontSize':'12px', 'width':'200px'}}>Choose another</button>
                    </div>
                </div>
                <div className='view-more'>
                    <h5 style={{'color':'#fff', 'textDecoration':'underline', 'fontSize':'12px', 'marginTop':'5px'}}>View More</h5>
                </div>
            </section>
        </>
    );
};

export default HamburgerMenu;
