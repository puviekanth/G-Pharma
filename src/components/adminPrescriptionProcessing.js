import React, { useEffect, useState } from 'react';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png';
import './adminPrescriptionProcessing.css';
import Img1 from './images/img3.jpg';
import Img2 from './images/pexels-n-voitkevich-7526012.jpg';
import Img3 from './images/about1.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ViewOrders() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const [prescriptionOrderDetails, setPrescriptionOrderDetails] = useState([]);

useEffect(() => {
    axios.get('http://127.0.0.1:3000/PrescriptionOrdersGetProcessing')
        .then(response => {
            setPrescriptionOrderDetails(response.data); // Now stores an array
        })
        .catch(error => {
            console.log('Server error', error);
        });
}, []);

const handleOrderProcessing = (orderID) => {
    axios.put(`http://127.0.0.1:3000/updateOrderStatus/${orderID}`,{status:'Completed',deliveryStatus:'Ready For Delivery'})
    .then(response =>{
        console.log(response);
    })
    .catch(error =>{
        console.log(error);
    })
}


    return (
        <>
            <section className='orders'>
            <div className="sidebar">
    <ul>
        <li >
            <a href='/suppliers' style={{ padding: '10px 15px' }}>Suppliers</a>
        </li>
        <li  >
            <a href='/products' style={{ padding: '10px 15px' }}>Products</a>
        </li>
        <li>
            <a href='/employees' style={{ padding: '10px 15px' }}>Employee</a>
        </li>
        <li  style={{backgroundColor:'#004085' , border:'1px solid #fff'}}>
            <a href='/orders' style={{ color:'#fff',padding: '10px 15px' }}>Orders</a>
        </li>
        <li>
            <a href='/landing-delivery' style={{ padding: '10px 15px' }}>Delivery Person</a>
        </li>
    </ul>
    <div className="icon" style={{ marginBottom: '8vh' }}>
        <div className="profile-icon">
            <a href='/adminprofile'>
                <img src={User} alt='Admin Profile' className='profile-icon-pro' />
            </a>
        </div>
        <a href='/Login'>
            <img src={Signout} alt='Sign Out' className='signout-icon-pro' style={{marginLeft:'70px',height:'40px',width:'auto'}} />
        </a>
    </div>
</div>

                <section className='interface'>
                    <div className='products-prescription-nav'>
                        <div className='prescrip'>
                        <p className='prescription-orders' style={{backgroundColor:'#004085',padding:'20px'}}><a href='/orders' style={{color:'#fff'}}>Prescriptions</a></p>
                        </div>
                        <div className='prod'>
                            <p className='product-orders' style={{backgroundColor:'#f1f1f1'}}><a href='/orders-products' style={{color:'#000'}}>Products</a></p>
                        </div>
                    </div>
                    <div className='search-order'>
                    <a href='/SearchPrescription'> <button  className='btn btn-success mt-3'>Search ...</button></a>
                    </div>
                    <div className='process-complete'>
                        <div className='new-process'>
                        <a href='/orders' style={{color:'#000'}}><p className='new-prescriptions'>New</p></a>
                        </div>
                       <div className='processing' >
                       <a href='/prescripion-processing'><p className='processing-prescriptions'>Processing</p></a>
                       </div>
                       <div className='completed'>
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
                <div className='admin-Order-details' style={{display:'flex',flexDirection:'column',alignItems:'baseline',justifyContent:'center'}}>
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
                </div>
            </div>
            <div className='btns'>
                <button className="btn btn-success mt-3" onClick={()=>{handleOrderProcessing(order.orderID)}}>Complete Order</button>
                <button className='btn btn-danger mt-3'>Delete Order</button>
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

export default ViewOrders;
