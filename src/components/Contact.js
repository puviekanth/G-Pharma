import React, { useState } from 'react';
import './Contact.css';
import Navbar from './HomeNavbar';
import Footer from './Footer';

function Contact(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Define errors state

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
            // Handle form submission logic here
            console.log('Email:', email);
            console.log('Full Name:', name);
            console.log('Subject:', subject);
            console.log('Message:', message);
        }
    };

    return (
        
        <>
            <Navbar />
            <section className='contact-us'>
                <div className='contact-us-div'>
                <div className='contents'>
                    <h1 className='contact-us-topic'>Contact Us</h1>
                    <h2>Genuine Pharmacy</h2><br></br>
                    <h4 className='contact'>081 2202381</h4>
                    <h4>43/B William Gopallawa Mawatha, Kandy 20000</h4>
                    <div className='map-container'>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15830.3211175174!2d80.6322843!3d7.2885016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368829b6cc3ef%3A0x6a8da5ebc0a5dbbd!2sGenuine%20Pharmacy!5e0!3m2!1sen!2slk!4v1723483175250!5m2!1sen!2slk" 
                            width="600" 
                            height="450" 
                            style={{ border: "0" }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className='contact-form'>
                    <input
                        type="text"
                        className='name-input'
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}

                    <input
                        type="email"
                        className='email-input'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <input
                        type="text"
                        className='subject-input'
                        placeholder='Subject'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                    {errors.subject && <p className="error-message">{errors.subject}</p>}

                    <input
                        type="text"
                        className='message-input'
                        placeholder='Your Message...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        requireds
                    />
                    {errors.message && <p className="error-message">{errors.message}</p>}

                    <button type="submit" className='send-button'>Send</button>
                </form>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Contact;
