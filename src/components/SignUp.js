import React, { useState } from 'react';
import './SignUp.css';
import logoImage from './images/Screenshot 2024-08-02 203142.png';
import Navbar from './NavBar';
import Footer from './Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(){
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [nic, setNic] = useState('');

  const [errors, setErrors] = useState({});
  const Navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicRegex = /^[0-9]{9}[Vv]$/; // Assuming NIC format is 9 digits followed by 'V' or 'v'

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!name) {
      newErrors.name = 'Please enter your full name';
    }
    if (!password) {
      newErrors.password = 'Please enter a password';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!contact) {
      newErrors.contact = 'Please enter your contact number';
    }
    if (!address) {
      newErrors.address = 'Please enter your address';
    }
    if (!dob) {
      newErrors.dob = 'Please enter your date of birth';
    }
    if (!nic || !nicRegex.test(nic)) {
      newErrors.nic = 'Please enter a valid NIC';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://127.0.0.1:3000/signup',{name,email,password,address,dob,nic,contact})
      .then(result => {console.log(result)
        Navigate('/Login')
      })
      .catch(err=>console.log(err))
    }
  };

  return (
    <>
      <Navbar />
      <div className='login-container'>
        <div className='withLOGO'>
          <img src={logoImage} alt='Company Logo' className='logo' />
          <div className='company-name'>
            <h1 className='genuine'>G E N U I N E</h1>
            <h2 className='pharmacy'>P h a r m a c y</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <h2 className='login-name'>Register</h2>

          <input
            type="email"
            className='email-input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="text"
            className='name-input'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="password"
            className='password-input'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            className='confirmPassword-input'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <input
            type="text"
            className='contact-input'
            placeholder='Contact'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          {errors.contact && <p className="error">{errors.contact}</p>}

          <input
            type="text"
            className='address-input'
            placeholder='Address'
            value={address}s
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <input
            type="date"
            className='dob-input'
            placeholder='Date of Birth'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {errors.dob && <p className="error">{errors.dob}</p>}

          <input
            type="text"
            className='nic-input'
            placeholder='NIC'
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
          {errors.nic && <p className="error">{errors.nic}</p>}

          <button type="submit" className='login-button'>Register</button>
          <p>Already registered? <a href='/Login'>Login</a></p>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default SignUp;
