import React, { useState, useEffect } from 'react';
import './Contact.css';
import Navbar from './NavBar';
import Footer from './Footer';
import Phone from './images/telephone.png';
import Location from './images/placeholder.png';
import axios from 'axios';

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!name) {
            newErrors.name = 'Please enter your full name';
        }
        if (!subject) {
            newErrors.subject = 'Please enter a subject';
        }
        if (!message) {
            newErrors.message = 'Please enter your message';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://127.0.0.1:3000/contact', { name, email, subject, message })
                .then(response => {
                    setSuccessMsg(response.data.message);
                })
                .catch(error => {
                    setErrorMsg(error.response.data.error);
                });
        } else {
            setErrorMsg('Invalid Form Submission');
        }
    };

    return (
        <>
            <Navbar />
            <section className='contact-us'>
                <div className='contact-us-div'>
                    <div className='contact-details'>
                        <h1 className='contact-us-topic' style={{color:'#004085',fontSize:'40px'}}>Contact Us</h1>
                        <h2 style={{fontSize:'20px',color:'#000',marginTop:'30px'}}>Genuine Pharmacy</h2>
                        <div className='contact-info'>
                            <div className='contact-item'>
                                <img src={Phone} alt='Phone' className='icon' />
                                <h4 style={{fontSize:'15px'}}>
                                    <a href='tel:0812202381' style={{textDecoration:'none',color:'#000',fontSize:'15px'}}>081 2202381</a>
                                </h4>
                            </div>
                            <div className='contact-item'>
                                <img src={Location} alt='Location' className='icon' />
                                <h4 style={{fontSize:'15px'}}>
                                    <a href='https://www.google.com/maps/place/Genuine+Pharmacy/@7.2885016,80.6322843,15z/data=!4m6!3m5!1s0x3ae368829b6cc3ef:0x6a8da5ebc0a5dbbd!8m2!3d7.2885016!4d80.6322843!16s%2Fg%2F11c807yvq9?entry=ttu' style={{textDecoration:'none',color:'#000',fontSize:'15px'}}>
                                        43/B, Willium Gopallawa Mw, Kandy, Sri Lanka.
                                    </a>
                                </h4>
                            </div>
                        </div>
                        <div className='map-container'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15830.3211175174!2d80.6322843!3d7.2885016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368829b6cc3ef%3A0x6a8da5ebc0a5dbbd!2sGenuine%20Pharmacy!5e0!3m2!1sen!2slk!4v1723483175250!5m2!1sen!2slk"
                                width="100%"
                                height="450"
                                style={{ border: "0" }}
                                allowFullScreen=""
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                    <div className='contact-form'>
                        <h2 className='form-topic'>Send Your Message!</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder='Your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='input-field'
                                required
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}

                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input-field'
                                required
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}

                            <input
                                type="text"
                                placeholder='Subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className='input-field'
                                required
                            />
                            {errors.subject && <p className="error-message">{errors.subject}</p>}

                            <textarea
                                placeholder='Your Message...'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className='textarea-field'
                                required
                            />
                            {errors.message && <p className="error-message">{errors.message}</p>}

                            {errorMsg && <p className='error'>{errorMsg}</p>}
                            {successMsg && <p className='success'>{successMsg}</p>}
                            <button type="submit" className='send-button'>Send</button>
                        </form>
                    </div>
                </div>
            </section>

            <section className='contact-others'>
                <h1>Contact Our Branches</h1>
                <div className='branches'>
                    <div className='branch'>
                        <div className='branch-info'>
                            <a href='tel:08121234567'>
                                <img src={Phone} alt='Phone' className='icon' />
                            </a>
                            <h3>Avisawella Branch</h3>
                            <p>Contact Number: <a href='tel:0811234567'>081 1234567</a></p>
                        </div>
                    </div>
                    <div className='branch'>
                        <div className='branch-info'>
                            <a href='tel:08121122334'>
                                <img src={Phone} alt='Phone' className='icon' />
                            </a>
                            <h3>Udapussallawa Branch</h3>
                            <p>Contact Number: <a href='tel:0811122334'>081 1122334</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Contact;
