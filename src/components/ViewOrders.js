import React from 'react'
import User from './images/icons8-male-user-32.png'
import Signout from './images/icons8-sign-out-48.png'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import './ViewOrders.css'

function ViewOrders(){
    return(
        <>
        <section className='orders'>
            <div className='side-navbar'>
                <ul className='navs'>
                    <li className='admin-items'>Orders</li>
                    <li className='admin-items'>Employees</li>
                    <li className='admin-items'>Products</li>
                    <li className='admin-items'>Suppliers</li>
                    <li className='admin-items'>Delivery Personel</li>
                </ul>
                <div className='signOut-profile'>
                    <a href='/adminprofile'><img src={User} alt='adminprofile' className='profile-icon' /></a>
                    <a href='/Login'><img src={Signout} alt='singout' className='signout-icon' /></a>
                </div>
            </div>
        </section>
        </>
    )
}

export default ViewOrders;