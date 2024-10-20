import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './Payment.css';
import axios from 'axios';

function Payment() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [fetchError, setFetchError] = useState(null); // State for fetch error

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found. Please try logging in again.');
            setFetchError('Please log in to view your billing information.');
            return;
        }

        setLoading(true);
        axios.get('http://127.0.0.1:3000/getbillinginfo', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                setCartItems(res.data);
                console.log('Fetched data successfully');
            } else {
                setFetchError('Unexpected response format.');
            }
        })
        .catch(err => {
            console.log('Could not fetch', err);
            setFetchError('Failed to load billing information.');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const calculateTotalCartCost = () => {
        const deliveryFee = 600;
        const total = cartItems.reduce((total, item) => total + (item.Subtotal || 0), 0);
        return total + deliveryFee;
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

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:3000/email',
            { headers: { Authorization: `Bearer ${token}`}
        })
        .then(res=>{
            setEmail(res.data.email);
            console.log('Email fetched successfully');
        })
        .catch(err=>{
            console.log('No email found',err);
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Submitting the form:', { email, name, contact, address, city , cartItems});
            const token = localStorage.getItem('token');
            const userEmail = JSON.parse(atob(token.split('.')[1])).email;
            
            axios.post('http://127.0.0.1:3000/addbillinginfo',
                {email:userEmail,
                name,
                contact,
                city,
                address,
                cartItems}
            )
            .then(res=>{
                console.log('Data sent successfully',res);
            })
            .catch(err=>{
                console.log('Something went wrong, could not add the billing info',err);
            })
        }
    };

    return (
        <>
            <Navbar />
            <section className='payment-section'>
                <div className='billing-info'>
                    <form onSubmit={handleSubmit} className='billing-form'>
                        <h2 className='billing-name' style={{marginBottom:'20px'}}>Billing Information</h2>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                        <input
                            type="email"
                            className={`mail-input ${errors.email ? 'input-error' : ''}`}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled
                        />
                         {errors.name && <div className="error-message">{errors.name}</div>}
                        <input
                            type="text"
                            className={`name-input-pay ${errors.name ? 'input-error' : ''}`}
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        
                        {errors.contact && <div className="error-message">{errors.contact}</div>}
                        <input
                            type="text"
                            className={`contact-input-pay ${errors.contact ? 'input-error' : ''}`}
                            placeholder='Contact'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        
                        {errors.city && <div className="error-message">{errors.city}</div>}
                        <input
                            type="text"
                            className={`city-input-pay ${errors.city ? 'input-error' : ''}`}
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        
                        {errors.address && <div className="error-message">{errors.address}</div>}
                        <input
                            type="text"
                            className={`address-input-pay ${errors.address ? 'input-error' : ''}`}
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </form>
                </div>
                <div className='order-summary'>
                    <h2>Order Summary</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : fetchError ? (
                        <p className="error-message">{fetchError}</p>
                    ) : (
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
                                    <tr key={item._id}>
                                        <td>{item.ProductName}</td>
                                        <td>{item.ProductQuantity}</td>
                                        <td>{item.Subtotal ? item.Subtotal.toLocaleString() : 'N/A'}</td>
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
                                    <td><b>{calculateTotalCartCost().toLocaleString()}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <button className='pay-btn' style={{ width: '200px' }} onClick={handleSubmit}>
                        Checkout
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Payment;
