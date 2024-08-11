import React from 'react';

const Profile = () => {
    // Example user data
    const user = {
        fullName: 'namr',
        email: 'ADdress',
        nic: 'nic',
        phoneNumber: '+num',
        address: 'add',
        dateOfBirth: 'dob',
    };

    return (
        <div className="container">
        <h2 className="heading">Profile Information</h2>
        <div className="info">
            <label className="label">Full Name:</label>
            <span className="value">{user.fullName}</span>
        </div>
        <div className="info">
            <label className="label">Email:</label>
            <span className="value">{user.email}</span>
        </div>
        <div className="info">
            <label className="label">NIC:</label>
            <span className="value">{user.nic}</span>
        </div>
        <div className="info">
            <label className="label">Phone Number:</label>
            <span className="value">{user.phoneNumber}</span>
        </div>
        <div className="info">
            <label className="label">Address:</label>
            <span className="value">{user.address}</span>
        </div>
        <div className="info">
            <label className="label">Date of Birth:</label>
            <span className="value">{user.dateOfBirth}</span>
        </div>
    </div>
);
    
};

export default Profile;