import React from 'react';
import Slider from 'react-slick';
import Logo from './images/Screenshot 2024-08-02 203142.png';
import Promo1 from './images/Hedone-1924.jpg';
import Promo2 from './images/Baby_Carelink_l.jpg';
import Promo3 from './images/Diabetasol_LL.jpg';
import NavBar from './HomeNavbar';
import './Home.css';
import AboutLogo from './images/about.jpg'
import { useEffect } from 'react'
import NewArrivals from './NewArrivals' 
import Order from './order.js'
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
        const aboutSection = document.querySelector('.about-section');
        const aboutPic = document.querySelector('.about-pic');
        const aboutButton = document.querySelector('.about-readmore');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('in-view');
                }
            },
            {
                threshold: 0.75, // Trigger when 50% of the section is in view
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
            <section className='banner'>
                <div className='with-logo'>
                    <h1>YOUR HEALTH,<br></br>YOUR WEALTH.</h1>
                </div>
                <h3 className='small-phrase'>Delivering all your life enhancers to your doorstep</h3>
                <button className='shop'>Order</button>
            </section>

            <section className='about-section'>
            <div className='about-with-img'>
                        <img src={ AboutLogo } alt='about' className='about-pic'></img>
                    
                <div className='about-content'>
                <h1 className='about'>About Us</h1>
                <h3 className='content'>Genuine Pharmacy has been dedicated to serving the community with high-quality
                healthcare products. Our mission is to deliver life-enhancing products to your
                doorstep, ensuring that your health is our priority.<br></br>With present busy schedules and traffic situations to customers, we have established our  “Online Pharmacy” service. Customers can log in to “Genuine Pharmacy pharmacy online” Upload the medical Prescription or buy home or  Professional Medical equipment Orthopaedic supports Wheel chairs, from our “Pharmacy Online service”.</h3>
                <button className='about-readmore'>Read More >> </button>
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
           

            < NewArrivals />
            < Footer />
            
           
        </>
    );
}

export default Home;
