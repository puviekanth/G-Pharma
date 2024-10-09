import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './Payment.css';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';

function Payment() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState({});

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Glutanex Tablets - 100g', price: 5000, quantity: 1, image: Product1 },
        { id: 2, name: 'Face Cream', price: 3000, quantity: 1, image: Product2 },
        { id: 3, name: 'My product', price: 2000, quantity: 2, image: Product1 }
    ]);

    const calculateTotalCartCost = () => {
        return (cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0) + 600);
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!name) {
            newErrors.name = 'Please enter your full name';
        }
        if (!contact) {
            newErrors.contact = 'Please enter your contact number';
        }
        if (!address) {
            newErrors.address = 'Please enter your address';
        }
        if (!city) {
            newErrors.city = 'Please enter a valid city name';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Email:', email);
            console.log("Name : ", name);
            console.log("Contact : ", contact);
            console.log("Address", address);
            console.log("City : ", city);
        }
    };

    return (
        <>
            <Navbar />
            <section className='payment-section'>
                <div className='billing-info'>
                    <form onSubmit={handleSubmit} className='billing-form'>
                        <h2 className='billing-name'>Billing Information</h2>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                        <input
                            type="email"
                            className={`mail-input ${errors.email ? 'input-error' : ''}`}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        
                        {errors.name && <div className="error-message">{errors.name}</div>}
                        <input
                            type="text"
                            className={`name-input ${errors.name ? 'input-error' : ''}`}
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        
                        {errors.contact && <div className="error-message">{errors.contact}</div>}
                        <input
                            type="text"
                            className={`contact-input ${errors.contact ? 'input-error' : ''}`}
                            placeholder='Contact'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        
                        {errors.city && <div className="error-message">{errors.city}</div>}
                        <input
                            type="text"
                            className={`city-input ${errors.city ? 'input-error' : ''}`}
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        
                        {errors.address && <div className="error-message">{errors.address}</div>}
                        <input
                            type="text"
                            className={`address-input ${errors.address ? 'input-error' : ''}`}
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        
                    </form>
                </div>
                <div className='order-summary'>
                    <h2>Order Summary</h2>
                    <table className='order-summary-table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity.toLocaleString()}</td>
                                    <td>{calculateSubtotal(item.price, item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><b>Delivery Fee</b></td>
                                <td></td>
                                <td><b>600</b></td>
                            </tr>
                            <tr>
                                <td><b>Total</b></td>
                                <td></td>
                                <td><b>{calculateTotalCartCost()}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='pay-btn' style={{ width: '200px' }} onClick={handleSubmit}><a href=''>Checkout</a></button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Payment;
