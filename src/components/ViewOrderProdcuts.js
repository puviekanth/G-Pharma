import React, { useEffect, useState } from 'react';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png'
import Img1 from './images/img3.jpg';
import Img2 from './images/pexels-n-voitkevich-7526012.jpg';
import Img3 from './images/about1.jpg';
import './ViewOrderProducts.css';
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

    const [ProductnOrderDetails, setProductOrderDetails] = useState([]);

useEffect(() => {
    axios.get('http://127.0.0.1:3000/ProductsOrdersGet')
        .then(response => {
            setProductOrderDetails(response.data); // Now stores an array
        })
        .catch(error => {
            console.log('Server error', error);
        });
}, []);

const handleOrderProcessing = (orderID) => {
    axios.put(`http://127.0.0.1:3000/updateOrderStatus/${orderID}`,{status:'Completed'})
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
          <li>Suppliers</li>
          <li><a href='/products'>Products</a></li>
          <li>Delivery</li>
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
                            <p className='prescription-orders'><a href='/orders'>Prescriptions</a></p>
                        </div>
                        <div className='prod'>
                            <p className='product-orders'><a href='/orders-products'>Products</a></p>
                        </div>
                    </div>
                    <div className='search-order'>
                    <a href='/SearchProducts'> <button  className='btn btn-success mt-3' style={{'marginBottom':'20px'}}>Search ...</button></a>
                    </div>
                    <div className='process-complete'>
                    <div className='new-view' >
                        <a href='/orders'>
                            <p className='new-prescriptions-view'>New</p>
                        </a>
                    </div>
                       <div className='completed-view'>
                       <a href='/completed-orders'><p className='completed-prescriptions-view'>Completed</p></a>
                       </div>
                    </div>
                    <h2 className='topic'>Products Orders</h2>
                    {ProductnOrderDetails.length > 0 ? (
    ProductnOrderDetails.map((order, index) => (
        <div className='order-cont' key={index}>
            <div className='img-details'>
                <div className='images-cont'>
                {/* {Array.isArray(order.prescriptions) && order.prescriptions.length > 0 ? (
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
)} */}

    </div>

                {/* Order details */}
                <div className='admin-Order-details'>
                    <p className='Order-id'>Order ID: {order.orderID}</p>
                    <p className='User-name'>User Name: {order.username}</p>
                    <p className='User-email'>User Email: {order.useremail}</p>
                    <p className='User-contact'>User Contact: {order.userContact}</p>
                    <p className='OrderDelivery-address'>Delivery Address: {order.DeliveryAddress}</p>
                    <p className='OrderDelivery-city'>Delivery City: {order.DeliveryCity}</p>
                    <p className='Order-date'>Date : {order.Date}</p>
                    <thead>
                        <td>Product</td>
                        <td>Quantity</td>
                    </thead>
                    <tbody>
                        {order.cartItems.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>
            <div className='btns'>
                <button className="btn btn-success mt-3" onClick={()=>{handleOrderProcessing(order.orderID)}}>Complete</button>
                
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
