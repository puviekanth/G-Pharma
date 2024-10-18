import React, { useEffect, useState } from 'react';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png'
import Img1 from './images/img3.jpg';
import Img2 from './images/pexels-n-voitkevich-7526012.jpg';
import Img3 from './images/about1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
 import './adminPrescriptionProcessing.css';
import axios from 'axios';

function CompletedOrders() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const [prescriptionOrderDetails, setPrescriptionOrderDetails] = useState([]);

useEffect(() => {
    axios.get('http://127.0.0.1:3000/PrescriptionOrdersGetCompleted')
        .then(response => {
            setPrescriptionOrderDetails(response.data); // Now stores an array
        })
        .catch(error => {
            console.log('Server error', error);
        });
}, []);




    return (
        <>
            <section className='orders'>
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

                <section className='interface'>
                    <div className='products-prescription-nav'>
                        <div className='prescrip'>
                            <p className='prescription-orders'><a href='#'>Prescriptions</a></p>
                        </div>
                        <div className='prod'>
                            <p className='product-orders'><a href='#'>Products</a></p>
                        </div>
                    </div>
                    <div className='search-order'>
                       <a href='/SearchPrescription'> <button  className='btn btn-success mt-3'>Search ...</button></a>
                    </div>
                    <div className='process-complete'>
                        <div className='new' style={{backgroundColor:'#f1f1f1',border:'1px solid #004085'}}>
                        <a href='/orders' style={{textDecoration:'none',color:'#000'}}><p className='new-prescriptions'>New</p></a>
                        </div>
                       <div className='processing' style={{backgroundColor:'#f1f1f1',border:'1px solid #004085'}} >
                       <a href='/prescripion-processing'  style={{textDecoration:'none',color:'#000'}}><p className='processing-prescriptions' style={{color:'#000'}}>Processing</p></a>
                       </div>
                       <div className='completed' style={{ backgroundColor: '#004085' }}>
                       <a href='/completed-orders'><p className='completed-prescriptions'>Completed</p></a>
                       </div>
                    </div>
                    <h2 className='topic'>Prescription Orders</h2>
                    {prescriptionOrderDetails.length > 0 ? (
    prescriptionOrderDetails.map((order, index) => (
        <div className='order-cont' key={index}>
            <div className='img-details'>
                <div className='images-cont'>
                {Array.isArray(order.prescriptions) && order.prescriptions.length > 0 ? (
    order.prescriptions.map((image, index) => {
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

                {/* Order details */}
                <div className='admin-Order-details'>
                    <p className='Order-id'>Order ID: {order.orderID}</p>
                    <p className='User-name'>User Name: {order.username}</p>
                    <p className='User-email'>User Email: {order.useremail}</p>
                    <p className='User-contact'>User Contact: {order.userContact}</p>
                    <p className='Patient-name'>Patient Name: {order.PatientName}</p>
                    <p className='Patient-Age'>Patient Age: {order.PatientAge}</p>
                    <p className='Patient-gender'>Patient Gender: {order.PatientGender}</p>
                    <p className='Patient-allergy'>Patient Allergies: {order.PatientAllergy}</p>
                    <p className='OrderDelivery-address'>Delivery Address: {order.DeliveryAddress}</p>
                    <p className='OrderDelivery-city'>Delivery City: {order.DeliveryCity}</p>
                    <p className='Order-duration'>Medicine Needed for: {order.Duration}</p>
                    <p className='Order-delivery-Status'>Delivery Status : {order.deliveryStatus}</p>
                </div>
            </div>
        </div>
    ))
) : (
    <p>No Prescription Orders Found</p>
)}

    </section>
            </section>
            {selectedImage && (
                <div className='modal'>
                    <span className='close-modal' onClick={closeModal}>&times;</span>
                    <img className='modal-content' src={selectedImage} alt="enlarged" />
                </div>
            )}
           
        </>
    );
}

export default CompletedOrders;
