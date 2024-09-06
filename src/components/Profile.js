import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png'

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
           <section className='profile-section'>
                <div className='img-logout'>
                    <div className='profile-pic'><img src={Logo} alt='profile-pix'></img></div>
                    <button className='sign-out'>Sign Out</button>
                </div>
           </section>
            <Footer />
        </>
    );
}

export default Profile;
