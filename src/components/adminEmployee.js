import React, { useState, useEffect } from 'react';
import User from './images/icons8-user-64.png'
import Signout from './images/icons8-sign-out-64.png'
import './LandingDeliveryPage.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Emp = () => {
    const[users, setUsers]=useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/getemp')
            .then(result => {
                console.log(result.data); 

                setUsers(result.data);
            })
            .catch(err => console.log(err));
    }, []);


    const handleDelete=(id) =>{
        axios.delete('http://127.0.0.1:3000/deleteEmp/'+id)
        .then(res => {console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="delivery-person-page">
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
      <div className="content" style={{marginLeft:'20%'}}>
        <h1>Employee Management</h1>
        <div className="controls">
          <Link to="/create" className='btn-add'>Add +</Link>
        </div>

        <table className="delivery-person-table">
          <thead>
            <tr>
            <th>Name</th>
                        <th>EmpID</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Role</th>
                        <th>Contact</th>
                        <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
                        users.map((user) =>{
                            return<tr>
                                <td>{user.name}</td>
                                <td>{user.empID}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.role}</td>
                                <td>{user.contact}</td>
                                <td>
                                    <Link to={`/updateEmployee/${user._id}`} className='btn btn-success'>Edit</Link>

                                    <button className='btn btn-danger' onClick={(e)=> handleDelete(user._id)}> Delete</button>
                                </td>
                            </tr>
                        })
                    }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default  Emp;
