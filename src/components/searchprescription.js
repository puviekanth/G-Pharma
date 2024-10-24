import React, {  useState } from 'react';
import searchIcon from './images/icons8-search-50.png';
import './searchprescription.css';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png'
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
             <div className="sidebar">
        <ul>
          <li>Suppliers</li>
          <li><a href='/products'>Products</a></li>
          <li>Employee</li>
          <li><a href='/orders'>Orders</a></li>
          <li><a href='/landing-delivery'>Delivery Person</a></li>
        </ul>
        <div className="icon">
          <div className="profile-icon">
            <a href='/adminprofile'>
              <img src={User} alt='Admin Profile' className='profile-icon-pro' />
            </a>
          </div>
          <a href='/Login'>
            <img src={Signout} alt='Sign Out' className='signout-icon-pro' />
          </a>
        </div>
      </div>

            <div className='prescription-or-product'>
                <div className='prescripton-type-order'>
                    <h5 style={{color:'#fff'}}>Prescription</h5>
                </div>
                <div className='product-type-order'>
                    <h5 style={{color:'#000'}}>Products</h5>
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

            {prescription && Object.keys(prescription).length > 0 ? (
    <div className='orders-cont' style={{marginLeft:'10%'}}>
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
                                className='img1'
                                onClick={() => handleImageClick(imagePath)}
                            />
                        );
                    })
                ) : (
                    <p>No prescription images available</p>
                )}
            </div>

            <div className='pres-details'>
                {prescription._id && <p className='Order-id'>Order ID: {prescription._id}</p>}
                {prescription.Username && <p className='User-name'>User Name: {prescription.Username}</p>}
                {prescription.email && <p className='User-email'>User Email: {prescription.email}</p>}
                {prescription.Contact && <p className='User-contact'>User Contact: {prescription.Contact}</p>}
                {prescription.PatientName && <p className='Patient-name'>Patient Name: {prescription.PatientName}</p>}
                {prescription.PatientAge && <p className='Patient-Age'>Patient Age: {prescription.PatientAge}</p>}
                {prescription.PatientGender && <p className='Patient-gender'>Patient Gender: {prescription.PatientGender}</p>}
                {prescription.PatientAllergy && <p className='Patient-allergy'>Patient Allergies: {prescription.PatientAllergy}</p>}
                {prescription.DeliveryAddress && <p className='OrderDelivery-address'>Delivery Address: {prescription.DeliveryAddress}</p>}
                {prescription.DeliveryCity && <p className='OrderDelivery-city'>Delivery City: {prescription.DeliveryCity}</p>}
                {prescription.Duration && <p className='Order-duration'>Medicine Needed for: {prescription.Duration}</p>}
                {prescription.deliveryStatus && <p className='Order-delivery-status'>Delivery Status: {prescription.deliveryStatus}</p>}
            </div>
        </div>
    </div>
) : (
    <p>No prescription images available or search for a prescription by entering an order ID.</p>
)}



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
