import React,{useState} from 'react'
import OnlineSupport from './images/icons8-online-support-64.png'
import Email from './images/email.png'
import './SecondNavbar.css'
import Search from './images/icons8-search-50.png'

function SecondNavbar(){
    const [search,setSearch]=useState('');
    return(
        <>
            <section className='second-navbar'>
                <div className='contact-nav2'>
                <div className='online-support'>
                    <img src={OnlineSupport} alt='support' className='online-support-img'/>
                    <a href='tel:0812 202 381' className='phone-no'>081 2202 381</a>
                </div>
                <p>  |  </p>
                <div className='online-email'>
                    <img src={Email} className='email-img' alt='email'/>
                    <a href='mailto:genuinepharmaceuticals@gmail.com' className='email-id'>genuinepharmaceuticals@gmail.com</a>
                </div>
                </div>
                <form className='search-form'>
                    <input type='text' className='search-bar' value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search...'/>
                    <img src={Search} className='search-icon' alt='search'/>
                </form>
            </section>
        </>
    );
}

export default SecondNavbar;