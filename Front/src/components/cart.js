import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './cart.css';
import Cancel from './images/icons8-cancel-30.png';
import axios from 'axios';
import { Navigate } from 'react-router';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const api = process.env.REACT_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found, please try logging in again.");
            return;
        }
        axios.get(`${api}/getcartitems`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setCartItems(res.data);
        })
        .catch(err => {
            console.log('Could not fetch the data', err);
        });
    }, []);

    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].ProductQuantity = newQuantity;
        setCartItems(updatedCartItems);
    };

    const calculateSubtotal = (price, quantity) => price * quantity;

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item.ProductPrice, item.ProductQuantity), 0);
    };

    const calculateTotalCartCost = () => {
        const deliveryFee = 600;
        return calculateTotal() + deliveryFee;
    };

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, please try logging in again');
            return;
        }
        
        const userEmail = JSON.parse(atob(token.split('.')[1])).email;
        const checkoutItems = cartItems.map(item => ({
            ProductName: item.ProductName,
            ProductQuantity: item.ProductQuantity,
            Subtotal: calculateSubtotal(item.ProductPrice, item.ProductQuantity)
        }));
    
        axios.post(`${api}/addcheckout`, { 
            email: userEmail,
            cartItems: checkoutItems 
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            console.log('Checkout data sent successfully:', response.data);
            Navigate('/Payment');
        })
        .catch(err => {
            console.log('Error during checkout:', err);
        });
    };

    return (
        <>
            <Navbar />
            <section className='cart-section' style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                <div className='cart-div'>
                    <table style={{display:'block'}}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price (Rs.)</th>
                                <th>Quantity</th>
                                <th>Subtotal (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody className='cart-products'>
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={Cancel} alt='Remove' className='cancel' onClick={() => handleRemoveItem(index)} />
                                        </td>
                                        <td>
                                            <img 
                                                src={item.Image ? `${api}/${item.Image.replace(/\\/g, '/')}` : 'path/to/placeholder.png'} 
                                                alt={item.ProductName} 
                                                className='cart-pro-img' 
                                            />
                                        </td>
                                        <td>
                                            <a href={`/product/${item._id}`}>{item.ProductName}</a>
                                        </td>
                                        <td>
                                            {item.ProductPrice ? item.ProductPrice.toLocaleString() : 'N/A'}
                                        </td>
                                        <td>
                                            <input 
                                                type='number' 
                                                className='quantity-input' 
                                                min={1} 
                                                value={item.ProductQuantity || 1} 
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            {item.ProductPrice && item.ProductQuantity 
                                                ? calculateSubtotal(item.ProductPrice, item.ProductQuantity).toLocaleString() 
                                                : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No items in the cart.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='total'>
                    <h3>Cart Totals</h3>
                    <table className='sub-table'>
                        <tbody>
                            <tr>
                                <td><b>Subtotal</b></td>
                                <td>{calculateTotal().toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td><b>Delivery Fee</b></td>
                                <td>600</td>
                            </tr>
                            <tr>
                                <td><b>Total</b></td>
                                <td>{calculateTotalCartCost().toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <a href='/Payment' style={{textDecoration:'none'}}><button className='pay-btn' onClick={handleCheckout}>Proceed to Checkout</button></a>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Cart;
