import React, { useState, useEffect } from 'react';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png';
import './LandingDeliveryPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Emp = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [empID, setEmpID] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const api = process.env.REACT_URL;

    useEffect(() => {
        axios.get(`${api}`)
            .then(result => {
                console.log(result.data);
                setUsers(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    

    // Basic validation logic
    const validate = () => {
        let errors = {};
        if (!name.trim()) errors.name = "Name is required";
        if (!empID.trim()) errors.empID = "Employee ID is required";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!age) {
            errors.age = "Age is required";
        } else if (isNaN(age) || age <= 0) {
            errors.age = "Enter a valid age";
        }
        if (!role.trim()) errors.role = "Role is required";
        if (!contact.trim()) {
            errors.contact = "Contact number is required";
        } else if (!/^\d{10}$/.test(contact)) {
            errors.contact = "Contact number must be 10 digits";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post(`${api}/createEmp`, { name, empID, email, age, role, contact })
                .then(result => {
                    console.log(result);
                    setUsers([...users, result.data]); // Assuming response returns the created employee
                    navigate('/employee');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="delivery-person-page">
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
            <div className="content" style={{ marginLeft: '20%' }}>
                <h1>Employee Management</h1>
                <div className="controls">
                    <Link to="/create" className='btn-add'>Add +</Link>
                </div>

                {/* Employee Creation Form */}
                <div className='employee-form'>
                    <h2>Add New Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="">Name </label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange={(e) => setName(e.target.value)} />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Employee ID </label>
                            <input type='text' placeholder='Enter EmpID' className='form-control'
                                onChange={(e) => setEmpID(e.target.value)} />
                            {errors.empID && <span className="error">{errors.empID}</span>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Email </label>
                            <input type='email' placeholder='Enter Email' className='form-control'
                                onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Age </label>
                            <input type='number' placeholder='Enter Age' className='form-control'
                                onChange={(e) => setAge(e.target.value)} />
                            {errors.age && <span className="error">{errors.age}</span>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Role </label>
                            <input type='text' placeholder='Enter Role' className='form-control'
                                onChange={(e) => setRole(e.target.value)} />
                            {errors.role && <span className="error">{errors.role}</span>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Contact</label>
                            <input type='tel' placeholder='Enter Contact' className='form-control'
                                onChange={(e) => setContact(e.target.value)} />
                            {errors.contact && <span className="error">{errors.contact}</span>}
                        </div>

                        <button className='btn btn-success'>Add Employee</button>
                    </form>
                </div>

               
            </div>
        </div>
    );
};

export default Emp;