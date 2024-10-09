import React, { useState } from 'react'
import searchIcon from './images/icons8-search-50.png'
import './searchprescription.css'



function Searchprescription(){
    const [search,setSearch] = useState('');
    return(
        <>
        <div className='prescription-or-product'>
            <div className='prescripton-type-order'>
                <h4>Prescription</h4>
            </div>
            <div className='product-type-order'>
                <h4>Products</h4>
            </div>
       </div>

       <div className='top-part'>
        <input 
            type='text'
            className='order-search-input'
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            placeholder='Search by order ID...'
            />
            <img src={searchIcon} alt='search' className='searchIcon' />
       </div>
       
       <div className='order-view-cont'>
             
       </div>
        
        </>
    )
}

export default Searchprescription;
