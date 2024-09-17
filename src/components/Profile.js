import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import { useNavigate } from 'react-router';
import axios from 'axios';


function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        nic: ''
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        } else {
            axios.get('http://127.0.0.1:3000/Profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserDetails(response.data); // Set the user details correctly
                })
                .catch(error => {
                    if (error.response && error.response.status === 500) {
                        navigate('/Login');
                    } else {
                        console.log('Failed to fetch user details', error);
                        
                    }
                });
        }
    }, [navigate]);

    const handleSave = () => {
        setIsEditing(false);
       
    };
    


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
                                    <td><input type="text" className="name" value={userDetails.name} disabled /></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        {isEditing ? (
                                            <input type="email" className="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                                        ) : (
                                            <span>{userDetails.email}</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Contact</td>
                                    <td>
                                        {isEditing ? (
                                            <input type="number" className="contact" value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} />
                                        ) : (
                                            <span>{userDetails.contact}</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        {isEditing ? (
                                            <textarea className="address" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} />
                                        ) : (
                                            <span>{userDetails.address}</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>NIC Number</td>
                                    <td><input className="nic" type="text" value={userDetails.nic} disabled /></td>
                                </tr>
                               
                                <tr>
                                    {isEditing ? (
                                        <td colSpan="2"><button onClick={handleSave} className="btn-save">Save</button></td>
                                    ) : (
                                        <td colSpan="2"><button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button></td>
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
