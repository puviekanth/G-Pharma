import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [nic, setNIC] = useState('');
    const [isEditing, setIsEditing] = useState(false);

   

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleContactChange = (e) => setContact(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleSave = () => setIsEditing(false);

    return (
        <>
            <NavBar />
            <section className="profile-section">
                <div className="img-details">
                    <div className="img-logout">
                        <div className="profile-pic-div">
                            <img src={Logo} alt="profile-pix" className="profile-pic" />
                        </div>
                        <button className="sign-out">Sign Out</button>
                        <button className="delete-btn">Delete Account</button>
                    </div>
                    <div className="user-details">
                        <h2>Profile Details</h2>
                        <table className="user-details">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td><input type="text" className="name" value={name} disabled /></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    {isEditing ? (
                                        <td><input type="email" className="email" onChange={handleEmailChange} value={email} /></td>
                                    ) : (
                                        <td>{email}</td>
                                    )}
                                </tr>
                                <tr>
                                    <td>Contact</td>
                                    {isEditing ? (
                                        <td><input type="number" className="contact" onChange={handleContactChange} value={contact} /></td>
                                    ) : (
                                        <td>{contact}</td>
                                    )}
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    {isEditing ? (
                                        <td><textarea className="address" type="text" onChange={handleAddressChange} value={address} /></td>
                                    ) : (
                                        <td>{address}</td>
                                    )}
                                </tr>
                                <tr>
                                    <td>NIC Number</td>
                                    <td><input className="nic" type="text" value={nic} disabled /></td>
                                </tr>
                                <tr>
                                    {isEditing ? (
                                        <button onClick={handleSave} className="btn-save">Save</button>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="order-Summary-all">
                    <h2>Recent Orders</h2>
                    {/* Orders Section (existing) */}
                    <div className="individual-orders">
                        <h3>Order : RE123451#112</h3>
                        <table>
                            <tbody className="cart-products">
                                <tr>
                                    <td><img src={Product1} className="order-img" alt="Product 1" /></td>
                                    <td>Glutanex Tablets - 100g</td>
                                    <td>5000 LKR</td>
                                    <td>1</td>
                                    <td>5000 LKR</td>
                                </tr>
                                <tr>
                                    <td><img src={Product2} className="order-img" alt="Product 2" /></td>
                                    <td>Face Cream</td>
                                    <td>3000 LKR</td>
                                    <td>2</td>
                                    <td>6000 LKR</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Profile;