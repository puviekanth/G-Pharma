import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import User from './images/icons8-user-64.png'
import Signout from './images/icons8-sign-out-64.png'


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
            axios.get('http://127.0.0.1:3000/Admin', {
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

        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:3000/updateAdmin', {
            name: userDetails.name,
            contact: userDetails.contact,
            address: userDetails.address,
            email:userDetails.email
        }, {
            headers: { Authorization: `Bearer ${token}` } // Send the token in the headers
        })
        .then(response =>{
            
            console.log('User Updated Successfully',response);
            setIsEditing(false);

           
        })
        .catch(err=>{
            console.log('Something went wrong',err);
        })
        
       
    };

    const handlesignout =() =>{
        localStorage.removeItem('token');
        navigate('/Login');
    }

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete('http://127.0.0.1:3000/deleteAdmin', {
            headers: { Authorization: `Bearer ${token}` },
            data: { email: userDetails.email } // Include email in the `data` field
        })
        .then(response => {
            localStorage.removeItem('token'); // Remove token after successful deletion
            console.log('User Deleted Successfully', response);
            navigate('/Signup'); // Redirect to Signup page after account deletion
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    };
    
    
    

    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>Suppliers</li>
                    <li><a href='/products'>Products</a></li>
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
            <section className="profile-section" style={{marginLeft:'30px'}}>
                <div className="img-details">
                    <div className="img-logout">
                        <div className="profile-pic-div">
                            <img src={Logo} alt="profile-pix" className="profile-pic" />
                        </div>
                        <button className="sign-out" onClick={handlesignout}>Sign Out</button>
                        <button className="delete-btn" onClick={handleDelete} >Delete Account</button>
                    </div>
                    <div className="user-details">
                        <h2>Profile Details</h2>
                        <table className="user-details">
                            <tbody>
                                <tr>

                                    <td>Name</td>
                                    <td> {isEditing ? (
                                            <input className="name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
                                        ) : (
                                            <span>{userDetails.name}</span>
                                        )}
                                        </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        {isEditing ? (
                                            <input type="email" className="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} disabled/>
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
               
            </section>
            <Footer />
        </>
    );
}

export default Profile;
