import React, { useState, useEffect } from 'react';
import User from './images/icons8-user-64.png'
import Signout from './images/icons8-sign-out-64.png'
import './LandingDeliveryPage.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Emp = () => {
    const[users, setUsers]=useState([])
    const navigate = useNavigate();

    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("Employee Report", 14, 10);
      doc.autoTable({
          head: [['Name', 'EmpID', 'Role', 'Age']],
          body: users.map(user => [user.name, user.empID, user.role, user.age]),
      });
      doc.save("employee_report.pdf");
  };


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
      <div className="content" style={{marginLeft:'20%'}}>
        <h1>Employee Management</h1>
        <div className="controls">
        <a href='/create'><button className='btn btn-primary' style={{borderRadius:'5px'}}>Add +</button></a>
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
                                    <Link to={`/updateEmployee/${user._id}`} className='btn btn-success' style={{borderRadius:'5px',marginRight:'10px'}}>Edit</Link>

                                    <button className='btn btn-danger' onClick={(e)=> handleDelete(user._id)}  style={{borderRadius:'5px'}}> Delete</button>
                                </td>
                            </tr>
                        })
                    }
          </tbody>
        </table>
        <div className="button-container">
            <button className='btn-gen' onClick={generatePDF} style={{marginTop:'20px'}}>Generate Report</button>
        </div>

      </div>
    </div>
  );
};

export default  Emp;
