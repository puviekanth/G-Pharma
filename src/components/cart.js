import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './cart.css';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import Cancel from './images/icons8-cancel-30.png';

function Cart() {
   
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Glutanex Tablets - 100g', price: 5000, quantity: 1, image: Product1 },
        { id: 2, name: 'Face Cream', price: 3000, quantity: 1, image: Product2 }
    ]);

    
    const handleQuantityChange = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);
    };

    
    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    // Function to remove an item from the cart
    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCartItems);
    };

    // Calculate total for all items
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);
    };

    const calculateTotalCartCost = () => {
        return (cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0)+600);
    }

    return (
        <>
            <Navbar />
            <section className='cart-section'>
                <div className='cart-div'>
                    
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Product</th>
                                <th>Price (Rs.)</th>
                                <th>Quantity</th>
                                <th>Subtotal (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody className='cart-products'>
                            {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td><img src={Cancel} alt='Remove' className='cancel' onClick={() => handleRemoveItem(index)} /></td>
                                    <td><img src={item.image} alt={item.name} className='cart-pro-img' /></td>
                                    <td><a href=''>{item.name}</a></td>
                                    <td>{item.price.toLocaleString()}</td>
                                    <td>
                                        <input 
                                            type='number' 
                                            className='quantity-input' 
                                            min={1} 
                                            value={item.quantity} 
                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{calculateSubtotal(item.price, item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                     
                </div>
                <div className='total'>
                        <h3>Cart Totals</h3>
                        <table className='sub-table'>
                            <tbody>
                                <tr>
                                    <td><b>Subtotal</b></td>
                                    <td>{calculateTotal().toString()}</td>
                                </tr>
                                <tr>
                                    <td><b>Delivery Fee</b></td>
                                    <td>600</td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td>{calculateTotalCartCost()}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='pay-btn'><a href='/Payment'>Proceed to Checkout</a></button>
                    </div>
            </section>
            <Footer />
        </>
    );
}

export default Cart;
