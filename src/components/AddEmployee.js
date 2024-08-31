
import React from 'react';
import UserIcon from './images/icons8-male-user-32.png'
import SignOut from './images/icons8-sign-out-48.png'

export default function AddEmployee() {
  return (
    <div>
        
        <div className="content-wrapper">
        <div className='with-categories'>
        <div className='categories'>
            <ul>
                <li>Order</li>
                <li>Products</li>
                <li>Supplier</li>
                <li>Employee</li> 
                
            </ul>
            <div className="icon">
                <div className='profile-icon'>
                   <img src={UserIcon} alt='User-Icon' className='User-Icon' />
                </div>
                <div className='signout-icon'>
                    <img src={SignOut} alt='Sign-out' className='SignOut' />
                </div>
            </div>
            
        </div>
        
        </div>
        <div class='employee-form'>
            <h2>Add New Employee</h2>
            <form id='employeeForm'>
                <div class='form-group'>
                    <label for='name'>Name </label>
                    <input type='text' id='name' name='name' required/>
                </div>
                <div class='form-group'>
                    <label for='id'>Employee ID </label>
                    <input type='number' id='id' name='id' required/>
                </div>
                <div class='form-group'>
                    <label for='mail'>Email </label>
                    <input type='email' id='mail' name='mail' required/>
                </div>
                <div class='form-group'>
                    <label for='age'>Age </label>
                    <input type='number' id='age' name='age' required/>
                </div>
                <div class='form-group'>
                    <label for='role'>Role </label>
                    <input type='text' id='role' name='role' required/>
                </div>
                <div class='form-group'>
                    <label for='contact'>Contact</label>
                    <input type='text' id='contact' name='contact' required/>
                </div>
                
                <button type='submit' id='add-btn'>Add Employee</button>
            </form>
        </div>
        </div>
    </div>
  )
}
