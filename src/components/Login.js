import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Logo from './images/Screenshot 2024-08-02 203142.png';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:3000/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/Home');
                } else {
                    setErrorMessage('Incorrect email or password. Try again.'); // Set error message
                }
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('Something went wrong. Please try again.'); // Handle server error
            });
    };

    return (
        <>
            <Navbar />
            <div className='login-container'>
                <div className='withLOGO'>
                    <img src={Logo} alt='logo' className='logo' />
                    <div className='company-name'>
                        <h1>G E N U I N E</h1>
                        <h2>P h a r m a c y</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='login-form'>
                    <h2 className='login-name'>Login</h2>

                    <input 
                        type='email' 
                        className='Email-input' 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type='password' 
                        className='Password-input' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type='submit' className='Login-Button'>Login</button>
                    
                    {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Conditionally render error message */}
                    
                    <p><a href='/SignUp'>Don't have an account? Sign Up</a></p>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;