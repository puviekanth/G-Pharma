import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import Navbar from './NavBar';
import Footer from './Footer';
import Phone from './images/telephone.png';
import Location from './images/placeholder.png';
import axios from 'axios'

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    useEffect(() => {
        const contactSection = document.querySelector('.contact-us');
        

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    contactSection.classList.add('in-view');
                }
            },
            {
                threshold: 0.05, // Trigger when 50% of the section is in view
            }
        );

        observer.observe(contactSection);

        return () => {
            observer.unobserve(contactSection);
        };
    }, []);

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
           axios.post('http://127.0.0.1:3000/contact',{name,email,subject,message})
           .then(response =>{
                console.log(response);
                setSuccessMsg(response.data.message);
           })
           .catch(error=>{
            console.log(error);
            setErrorMsg(error.response.data.error);
           })
          
        }
        else{
           setErrorMsg('Invalid Form Submission');
        }
    };

    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    section.classList.add('fade-in');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar />
            <section className='contact-us' ref={sectionRef}>
                <div className='contact-us-div'>
                    <div className='contents'>
                        <h1 className='contact-us-topic'>Contact Us</h1>
                        <h2>Genuine Pharmacy</h2>
                        <div className='with-phone'>
                            <img src={Phone} alt='Phone' className='phone-logo' />
                            <h4 className='contact'>
                                <a href='tel:0812 202 381'>081 2202381</a>
                            </h4>
                        </div>
                        <div className='with-location'>
                            <img src={Location} alt='Location' className='location-logo' />
                            <h4 className='address'>
                                <a href='https://www.google.com/maps/place/Genuine+Pharmacy/@7.2885016,80.6322843,15z/data=!4m6!3m5!1s0x3ae368829b6cc3ef:0x6a8da5ebc0a5dbbd!8m2!3d7.2885016!4d80.6322843!16s%2Fg%2F11c807yvq9?entry=ttu'>
                                    43/B, Willium Gopallawa Mw, Kandy, Sri Lanka.
                                </a>
                            </h4>
                        </div>
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
                    <div className='con-form'>
                        <h2 className='form-topic'>Send Your Message !</h2>
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

                            <textarea
                                type="text"
                                className='message-input'
                                placeholder='Your Message...'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                cols={50}
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
                    <div className='avisawella'>
                        <div className='branch-logo'>
                            <a href='tel:0812 202 381'>
                                <img src={Phone} alt='Phone' className='phone-logo-branch' />
                            </a>
                            <h3>Avisawella Branch</h3>
                            <p>Contact Number: <a href='tel:0812 202 381'>081 1234567</a></p>
                        </div>
                    </div>
                    <div className='udapussullawa'>
                        <div className='branch-logo'>
                            <a href='tel:0812 202 381'>
                                <img src={Phone} alt='Phone' className='phone-logo-branch' />
                            </a>
                            <h3>Udapussallawa Branch</h3>
                            <p>Contact Number: <a href='tel:0812 202 381'>081 1122334</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Contact;
