import React,{useState} from 'react'
import OnlineSupport from './images/icons8-online-support-64.png'
import Email from './images/email.png'
import './SecondNavbar.css'
import Search from './images/icons8-search-50.png'

function SecondNavbar(){
    const [search,setSearch]=useState('');
    return(
        <>
            <section className='second-navbar' style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'20px'}}>
              
                <form className='search-form' >
                    <input type='text' className='search-bar' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...'/>
                    <img src={Search} className='search-icon' alt='search'/>
                </form>
            </section>
        </>
    );
}

export default SecondNavbar;