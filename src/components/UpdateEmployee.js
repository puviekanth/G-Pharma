import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingDeliveryPage.css';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png';

function UpdateEmp() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [empID, setEmpID] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/getEmployee/${id}`)
            .then(result => {
                const user = result.data;
                setName(user.name);
                setEmpID(user.empID);
                setEmail(user.email);
                setAge(user.age);
                setRole(user.role);
                setContact(user.contact);
            })
            .catch(err => console.error('Error fetching user:', err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:3000/updateEmployee/${id}`, {
            name,
            empID,
            email,
            age,
            role,
            contact
        })
        .then(() => navigate('/employees'))
        .catch(err => console.error('Error updating user:', err));
    };

    return (
        <div style={{ display: 'flex' }}>
           <div className="sidebar">
    <ul>
        <li >
            <a href='/suppliers' style={{ padding: '10px 15px' }}>Suppliers</a>
        </li>
        <li  >
            <a href='/products' style={{ padding: '10px 15px' }}>Products</a>
        </li>
        <li style={{backgroundColor:'#004085' , border:'1px solid #fff'}}>
            <a href='/employees' style={{ color:'#fff',padding: '10px 15px' }}>Employee</a>
        </li>
        <li>
            <a href='/orders' style={{ padding: '10px 15px' }}>Orders</a>
        </li>
        <li>
            <a href='/landing-delivery' style={{ padding: '10px 15px' }}>Delivery Person</a>
        </li>
    </ul>
    <div className="icon" style={{ marginBottom: '8vh' }}>
        <div className="profile-icon">
            <a href='/adminprofile'>
                <img src={User} alt='Admin Profile' className='profile-icon-pro' />
            </a>
        </div>
        <a href='/Login'>
            <img src={Signout} alt='Sign Out' className='signout-icon-pro' style={{marginLeft:'70px',height:'40px',width:'auto'}} />
        </a>
    </div>
</div>

            <div className='employee-form-update' style={{
                marginLeft: '30%', // Leave space for the sidebar
                padding: '20px', // Add some padding to the form
                width: '80%', // Take the remaining width
            }}>
                <h2>Update Employee</h2>
                <form id='employeeForm' onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Employee ID</label>
                        <input
                            type='number'
                            placeholder='Enter EmpID'
                            className='form-control'
                            value={empID}
                            onChange={(e) => setEmpID(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Age</label>
                        <input
                            type='number'
                            placeholder='Enter Age'
                            className='form-control'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Role</label>
                        <input
                            type='text'
                            placeholder='Enter Role'
                            className='form-control'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Contact</label>
                        <input
                            type='tel'
                            placeholder='Enter Contact'
                            className='form-control'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmp;
