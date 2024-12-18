import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Logo from './images/Screenshot_2024-08-02_203142-removebg-preview.png';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const api = process.env.REACT_URL;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${api}/login`, { email, password })
            .then(response => {
                localStorage.setItem('token',response.data.token)
                console.log(response);
                if(response.data.user.email.endsWith('.admin@genuinepharmacy.com')){
                    navigate('/orders');
                }
                else if(response.data.user.email.includes('deliverygpharma24@gmail.com')){
                    navigate('/deliveryUI/home');
                }
                else{
                    navigate('/Home');
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error); 
                } else {
                    setErrorMessage('Something went wrong. Please try again.');
                }
                navigate('/Login');
            });
    }
    
    return (
        <>
            <Navbar />
            <div className='login-container'>
                <div className='withLOGO' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <img src={Logo} alt='logo' className='logo' style={{marginLeft:'5px'}} />
                    <div className='company-name'>
                        <h1><b>G E N U I N E</b></h1>
                        <h2><b>P h a r m a c y</b></h2>
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
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                    <button type='submit' className='Login-Button'>Login</button>
                    
                    
                    
                    <p><a href='/SignUp'>Don't have an account? Sign Up</a></p>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;