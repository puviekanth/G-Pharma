import React from 'react';
import './delivery.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png'

function DeliveryUI() {
  

  

  return (
    <>
    <div className='nav'>
      <div className='header'>
        <a href='/deliveryUI'><img src={Logo} className='logo' alt='logo' /></a>
        <h4 className='brand'>Genuine Pharmacy</h4>
      </div>
     <div className='hamburger'>
     <div className='bar' ></div>
      <div className='bar' ></div>
      <div className='bar' ></div>
     </div>
    </div>
    </>
  );
}

export default DeliveryUI;
