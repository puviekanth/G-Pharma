// src/components/Login.js

import React, { useState } from 'react';
import './Login.css'
import logoImage from './images/Screenshot 2024-08-02 203142.png';

import NavBar from './NavBar';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  

  return (
    <><NavBar /><div className='login-container'>
      <div className='withLOGO'>
        <img src={logoImage} alt='Company Logo' className='logo' />
        <div className='company-name'>
          <h1 className='genuine'>G E N U I N E</h1>
          <h2 className='pharmacy'>P h a r m a c y</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-name'>Login</h2>

        <input
          type="email"
          className='email-input'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />

        <input
          type="password"
          className='password-input'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button type="submit" className='login-button'><a href='/Home'>Login</a></button>
        <p>
          <a href='/SignUp'>Don't have an account? SignUp</a>
        </p>
      </form>
    </div></>
  );
}

export default Login;
