import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Screenshot_2024-08-02_203142-removebg-preview.png';
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
    const api = process.env.REACT_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        } else {
            axios.get(`${api}/Profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUserDetails(response.data); 
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
        const token = localStorage.getItem('token');
        axios.post(`${api}/updateProfile`, {
            name: userDetails.name,
            contact: userDetails.contact,
            address: userDetails.address,
            email: userDetails.email
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log('User Updated Successfully', response);
            setIsEditing(false);
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    };

    const handlesignout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`${api}/deleteUser`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { email: userDetails.email }
        })
        .then(response => {
            localStorage.removeItem('token'); 
            console.log('User Deleted Successfully', response);
            navigate('/Signup'); 
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    };

    return (
        <>
            <NavBar />
            <section className="profile-section">
                <div className="img-details">
                    <div className="img-logout" style={{marginLeft:'10vw'}}>
                        <div className="profile-pic-div">
                            <img src={Logo} alt="profile-pic" className="profile-pic" />
                        </div>
                        <div className="action-buttons">
                            <button className="sign-out" onClick={handlesignout}>Sign Out</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
                        </div>
                    </div>
                    <div className="user-details">
                        <h2 style={{textAlign:'center',color:'#004085'}}><b>Profile Details</b></h2>
                        <table className="user-details">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{isEditing ? (
                                        <input className="name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
                                    ) : (
                                        <span>{userDetails.name}</span>
                                    )}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{isEditing ? (
                                        <input type="email" className="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} disabled />
                                    ) : (
                                        <span>{userDetails.email}</span>
                                    )}</td>
                                </tr>
                                <tr>
                                    <td>Contact</td>
                                    <td>{isEditing ? (
                                        <input type="number" className="contact" value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} />
                                    ) : (
                                        <span>{userDetails.contact}</span>
                                    )}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{isEditing ? (
                                        <textarea className="address" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} />
                                    ) : (
                                        <span>{userDetails.address}</span>
                                    )}</td>
                                </tr>
                                <tr>
                                    <td>NIC Number</td>
                                    <td><input className="nic" type="text" value={userDetails.nic} disabled /></td>
                                </tr>
                                <tr>
                                    {isEditing ? (
                                        <td colSpan="2"><button onClick={handleSave}  style={{width:'150px'}} className="btn-save">Save</button></td>
                                    ) : (
                                        <td colSpan="2"><button onClick={() => setIsEditing(true)} className="btn-edit" style={{width:'150px'}}>Edit</button></td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="order-summary-all">
                    <h2>Recent Orders</h2>
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
