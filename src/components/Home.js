import React from 'react';
import Slider from 'react-slick';
import Logo from './images/Screenshot 2024-08-02 203142.png';
import Promo1 from './images/Hedone-1924.jpg';
import Promo2 from './images/Baby_Carelink_l.jpg';
import Promo3 from './images/Diabetasol_LL.jpg';
import NavBar from './NavBar';
 import './Home.css';
import AboutLogo from './images/about.jpg'
import { useEffect } from 'react'
import NewArrivals from './NewArrivals' 
import { Link } from 'react-router-dom';

import Footer from './Footer.js'

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };



    useEffect(() => {
        const aboutSection = document.querySelector('.about-section-home');
        const aboutPic = document.querySelector('.about-pic-home');
        const aboutButton = document.querySelector('.about-readmore-home');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('in-view');
                }
            },
            {
                threshold: 0.25, // Trigger when 50% of the section is in view
            }
        );

        observer.observe(aboutSection);

        return () => {
            observer.unobserve(aboutSection);
        };
    }, []);



    return (
        <>
            <NavBar />
            <section className='body'style={{maxWidth:'100%'}} >
            <section className='banner' style={{display:'flex',flexDirection:'column',alignItems:'baseline',justifyContent:'center',marginLeft:'20px',width:'93vw'
            }}>
                <div className='with-logo'>
                    <h1 style={{width:'34vw'}}>YOUR HEALTH,<br></br>YOUR WEALTH.</h1>
                </div>
                <h3 className='small-phrase'>Delivering all your life enhancers to your doorstep</h3>
                <a href='/shop'><button className='btn btn-primary' style={{width:'150px',borderRadius:'8px'}}>Shop</button></a>
            </section>

            <section className='about-section-home'>
            <div className='about-with-img-home'>
                        <img src={ AboutLogo } alt='about' className='about-pic-home'></img>
                    
                <div className='about-content-home'>
                <h1 className='about-home' style={{color:'#004085',marginBottom:'30px'}}><b>About Us</b></h1>
                <h4 className='content-home' style={{color:'#000',fontSize:'16px'}}>At Genuine Pharmacy, we are dedicated to providing high-quality healthcare products to our community. Our mission centers around the belief that your health is our top priority. We strive to enhance the lives of our customers by ensuring access to essential healthcare products that meet their needs.

Embracing Modern Convenience with Our Online Pharmacy Service

In today’s fast-paced world, we understand that busy schedules and traffic congestion can make it challenging for customers to visit a pharmacy. To address these concerns and improve accessibility, we have established our Online Pharmacy service.

This innovative platform allows customers to order products and manage their healthcare needs from the comfort of their homes.
<br /><br />
Key Features of Our Online Pharmacy Service:
<br /><br />
<b>User-Friendly Online Platform</b>: Our website provides a seamless shopping experience for ordering medication and exploring healthcare products.<br /><br />
<b>Easy Prescription Upload:</b> Customers can conveniently upload their medical prescriptions directly, ensuring accurate and prompt processing.<br /><br />
<b>Wide Range of Products:</b> We offer both prescription and over-the-counter medicines to cater to various health conditions.<br /><br />
<b>Medical Equipment</b>: Our online store includes orthopaedic supports and wheelchairs for improved mobility and recovery.<br /><br />
<b>Timely Delivery</b>: We ensure that your orders are delivered safely to your doorstep.<br /><br />
<b>Customer Support:</b> Our knowledgeable team is always ready to assist you with any inquiries or concerns.</h4>
                <a href='/About'><button className='about-readmore-home'>Read more ></button></a>
            </div>
            </div>
            </section>

            <section className='promo'>
                <Slider {...settings}>
                    <div>
                        <img src={Promo1} alt='Promo1' className='promo-image' />
                    </div>
                    <div>
                        <img src={Promo2} alt='Promo2' className='promo-image' />
                    </div>
                    <div>
                        <img src={Promo3} alt='Promo2' className='promo-image' />
                    </div>
                    {/* Add more slides as needed */}
                </Slider>
            </section>
            </section>
            
           

            < NewArrivals />
            < Footer />
            
           
        </>
    );
}

export default Home;
