import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './cart.css';
import Cancel from './images/icons8-cancel-30.png';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            console.log("No token found please try logging in again.");
            return;
        }
        axios.get('http://127.0.0.1:3000/getcartitems', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log(res.data);
            setCartItems(res.data);
            console.log('Fetched Successfully');
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

    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemSubtotal = item.ProductPrice * item.ProductQuantity;
            return total + itemSubtotal;
        }, 0);
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
    
        // Prepare the data to send to the checkout endpoint
        const checkoutItems = cartItems.map(item => ({
            ProductName: item.ProductName,
            ProductQuantity: item.ProductQuantity,
            Subtotal: item.ProductPrice * item.ProductQuantity
        }));
    
        // Send a POST request with checkout data
        axios.post('http://127.0.0.1:3000/addcheckout', { 
            email: userEmail,
            cartItems: checkoutItems // Sending as an array of objects
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            console.log('Checkout data sent successfully:', response.data);
            // Optionally, navigate to a success page or show a success message
        })
        .catch(err => {
            console.log('Error during checkout:', err);
        });
    };
    
    

    return (
        <>
            <Navbar />
            <section className='cart-section'>
                <div className='cart-div'>
                    <table style={{ display: 'block', width: '700px' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th style={{ marginRight: '20px' }}>Product</th>
                                <th style={{ marginRight: '20px' }}>Price (Rs.)</th>
                                <th style={{ marginRight: '20px' }}>Quantity</th>
                                <th style={{ marginRight: '20px' }}>Subtotal (Rs.)</th>
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
                                                src={item.Image ? `http://localhost:3000/${item.Image.replace(/\\/g, '/')}` : 'path/to/placeholder.png'} 
                                                alt={item.ProductName} 
                                                className='cart-pro-img' 
                                            />
                                        </td>
                                        <td>
                                            <a href=''>{item.ProductName}</a>
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
                                    <td colSpan="6">No items in the cart.</td>
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
                    <button className='pay-btn' onClick={handleCheckout}><a href='/Payment'>Proceed to Checkout</a></button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Cart;
