import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png';
import { useNavigate } from 'react-router';
import axios from 'axios';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png';

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
        axios.post('http://127.0.0.1:3000/updateAdmin', {
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
    }

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete('http://127.0.0.1:3000/deleteAdmin', {
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
            <div className="sidebar">
        <ul>
        <li><a href='/suppliers'>Suppliers</a></li>
          <li><a href='/products'>Products</a></li>
          <li><a href='/employees'>Employee</a></li>
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
            <section style={{ marginLeft: '280px', padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ marginRight: '20px' }}>
                        <img src={Logo} alt="profile-pix" style={{ width: '100px', borderRadius: '50%' }} />
                    </div>
                    <div>
                        <button onClick={handlesignout} style={{
                            backgroundColor: '#ff4d4d',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}>Sign Out</button>
                        <button onClick={handleDelete} style={{
                            backgroundColor: '#ff4d4d',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>Delete Account</button>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginBottom: '20px' }}>Profile Details</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Name</td>
                                <td>
                                    {isEditing ? (
                                        <input value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    ) : (
                                        <span>{userDetails.name}</span>
                                    )}
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Email</td>
                                <td>
                                    {isEditing ? (
                                        <input type="email" value={userDetails.email} disabled style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    ) : (
                                        <span>{userDetails.email}</span>
                                    )}
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Contact</td>
                                <td>
                                    {isEditing ? (
                                        <input type="number" value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    ) : (
                                        <span>{userDetails.contact}</span>
                                    )}
                                </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '10px 0', fontWeight: 'bold' }}>Address</td>
                                <td>
                                    {isEditing ? (
                                        <textarea value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    ) : (
                                        <span>{userDetails.address}</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 0', fontWeight: 'bold' }}>NIC Number</td>
                                <td>
                                    <input type="text" value={userDetails.nic} disabled style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' }}>
                                    {isEditing ? (
                                        <button onClick={handleSave} style={{
                                            backgroundColor: '#4caf50',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginRight: '10px'
                                        }}>Save Changes</button>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} style={{
                                            backgroundColor: '#008cba',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}>Edit Profile</button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default Profile;
