import React, { useState } from 'react'
import Navbar from './NavBar'
import Footer from './Footer'
import Logo from './images/Screenshot 2024-08-02 203142.png'
import './Login.css'

function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email : ',email);
        console.log('Password : ',password)
    };
    return(
        <>
        <Navbar/>
        <div className='login-container'>
            <div className='withLOGO'>
                <img src={Logo} alt='logo' className='logo'/>
                <div className='company-name'>
                    <h1>G E N U I N E</h1>
                    <h2>P h a r m a c y</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2 className='login-name'>Login</h2>

                <input type='email' className='Email-input' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type='password' className='Password-input' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit' className='Login-Button'><a href='/Home'>Login</a></button>
                <p><a href='/SignUp'>Don't have an account? SignUp</a></p>
            </form>
        </div>

        <Footer/>
        </>
    );
}

export default Login;