import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';

function Profile() {
    const user = {
        fullName: 'Name',
        email: 'Email Address',
        nic: 'NIC',
        phoneNumber: '+Number',
        address: 'Address',
        city: 'City Name',
        postalCode: 'Postal Code',
        dateOfBirth: 'Date of Birth',
    };

    return (
        <>
            <NavBar />
            <div className='profile-container'>
                <section className='pic'>
                    <img src="" class="rounded" alt="Cinque Terre"></img>
                </section>
                <section className='profile-section'>
                    <h1>Profile</h1>
                    <div className='profile-info'>
                        <div><strong>Name:</strong> {user.fullName}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Date of Birth:</strong> {user.dateOfBirth}</div>
                        <div><strong>Phone Number:</strong> {user.phoneNumber}</div>
                        <div><strong>NIC:</strong> {user.nic}</div>
                    </div>
                   <a href=''><button className='signout-button'>Sign Out</button></a> 
                </section>

                <section className='address-section'>
                    <h1>Address</h1>
                    <div className='address-info'>
                        <div><strong>Address:</strong> {user.address}</div>
                        <div><strong>City:</strong> {user.city}</div>
                        <div><strong>Postal Code:</strong> {user.postalCode}</div>
                    </div>
                    <button className='edit-button'>Edit Details</button>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
