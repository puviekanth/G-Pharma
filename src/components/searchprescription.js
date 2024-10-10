import React, { useEffect, useState } from 'react';
import searchIcon from './images/icons8-search-50.png';
import './searchprescription.css';
import User from './images/user-black.png';
import Signout from './images/signout-black.png';
import Pres1 from './images/Rossmax-1.jpg';
import Pres2 from './images/Littman-1.jpg';
import Pres3 from './images/Multy-1.jpg';
import axios from 'axios';

function Searchprescription() {
    const [prescription,setPrescription] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search initiated for:', search);
        axios.get(`http://127.0.0.1:3000/searchprescription?search=${search}`)
        .then(res => {
            console.log(res.data);
            setPrescription(res.data);
        })
        .catch(err => {
            console.log('Could not search', err);
        });
    };
    

    return (
        <>
            <div className='side-navbar'>
                <ul className='navs'>
                    <li className='admin-items'>Orders</li>
                    <li className='admin-items'>Employees</li>
                    <li className='admin-items'><a href='/products'>Products</a></li>
                    <li className='admin-items'>Suppliers</li>
                    <li className='admin-items'>Delivery Personnel</li>
                </ul>
                <div className='signOut-profile'>
                    <a href='/adminprofile'><img src={User} alt='adminprofile' className='profile-icon' /></a>
                    <a href='/Login'><img src={Signout} alt='signout' className='signout-icon' /></a>
                </div>
            </div>

            <div className='prescription-or-product'>
                <div className='prescripton-type-order'>
                    <h4>Prescription</h4>
                </div>
                <div className='product-type-order'>
                    <h4>Products</h4>
                </div>
            </div>

            <div className='top-part'>
                <input 
                    type='text'
                    className='order-search-input'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by order ID...'
                />
                <img 
                    src={searchIcon} 
                    alt='search' 
                    className='searchIcon' 
                    onClick={handleSearch} 
                />
            </div>

            <div className='orders-cont'>
                <div className='img-details'>
                    <div className='img-cont'>
                    {Array.isArray(prescription.prescriptions) && prescription.prescriptions.length > 0 ? (
    prescription.prescriptions.map((image, index) => {
        const imagePath = `http://localhost:3000/${image.replace(/\\/g, '/')}`;
        return (
            <img
                key={index}
                src={imagePath}
                alt={`Prescription ${index + 1}`}
                className="img1"
                onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/fallback-image.png'; }} // Optional fallback
                onClick={() => handleImageClick(imagePath)} // Wrap in an arrow function
            />
        );
    })
) : (
    <p>No prescription images available</p>
)}

                    </div>
                    <div className='pres-details'>
                    <p className='Order-id'>Order ID: {prescription._id}</p>
                    <p className='User-name'>User Name: {prescription.Username}</p>
                    <p className='User-email'>User Email: {prescription.email}</p>
                    <p className='User-contact'>User Contact: {prescription.Contact}</p>
                    <p className='Patient-name'>Patient Name: {prescription.PatientName}</p>
                    <p className='Patient-Age'>Patient Age: {prescription.PatientAge}</p>
                    <p className='Patient-gender'>Patient Gender: {prescription.PatientGender}</p>
                    <p className='Patient-allergy'>Patient Allergies: {prescription.PatientAllergy}</p>
                    <p className='OrderDelivery-address'>Delivery Address: {prescription.DeliveryAddress}</p>
                    <p className='OrderDelivery-city'>Delivery City:{prescription.DeliveryCity}</p>
                    <p className='Order-duration'>Medicine Needed for: {prescription.Duration}</p>
                    <p className='Order-delivery-status'>Delivery Status: {prescription.deliveryStatus}</p>
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className='modal'>
                    <span className='close-modal' onClick={closeModal}>&times;</span>
                    <img className='modal-content' src={selectedImage} alt="enlarged" />
                </div>
            )}
        </>
    );
}

export default Searchprescription;
