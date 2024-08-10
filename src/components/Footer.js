import React from 'react';
import './Footer.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png'
import Location from './images/placeholder.png'
import Phone from './images/telephone.png'
import Email from './images/email.png'
import Facebook from './images/icons8-facebook-50 (1).png'
import Instagram from './images/icons8-instagram-50.png'
import Whatsapp from './images/icons8-whatsapp-50 (1).png'

function Footer() {
    return (
        <section className='footer'>
            <table>
                <tbody>
                    <tr>
                        <td>100% Secured Payment Methods</td>
                        <td>Island Wide Delivery</td>
                        <td>365 Days Customer Support</td>
                    </tr>
                </tbody>
            </table>

        <section className='footer-info-blocks'>
            <div className='logo-name'>
                <div className='logo-with-name-only'>
                <img src={ Logo } alt='logo' className='footer-logo'></img>
                <h2>Genuine Pharmacy</h2>
                </div>
                <div className='address'>
                    <img src={ Location } alt='' className='location'></img>
                    <h4><a href='https://www.google.com/maps/place/Genuine+Pharmacy/@7.2885016,80.6322843,15z/data=!4m6!3m5!1s0x3ae368829b6cc3ef:0x6a8da5ebc0a5dbbd!8m2!3d7.2885016!4d80.6322843!16s%2Fg%2F11c807yvq9?entry=ttu'>43/B, Willium Gopallawa Mw, Kandy, Sri Lanka.</a></h4>
                </div>
                <div className='phone'>
                    <img src={ Phone } alt='' className='mobile'></img>
                    <h4><a href='tel:0812 202 381'>081 2202381</a></h4>
                </div>
                <div className='mail'>
                    <img src={ Email } alt='' className='email'></img>
                    <h4><a href='mailto:genuinepharmaceuticals@gmail.com'>genuinepharmaceuticals@gmail.com</a></h4>
                </div>
                <div className='social-media-links'>
                    <a href='https://www.facebook.com/GenuinePharmacy/'><img src={ Facebook} className='fb'></img></a>
                    <a href='https://www.instagram.com/airmedsbygp/'><img src={Instagram} className='insta'></img></a>
                    <a href=''><img src={Whatsapp} className='wtsp'></img></a>
                </div>
            </div>
            <div className='about-block'>
                <h3>About Us</h3>
                <p>Genuine Pharmacy has been dedicated to serving the community with high-quality
                healthcare products. </p>
                <br></br><br></br>
                <h3>Why Us ?</h3>
                <p>Our mission is to deliver life-enhancing products to your
                doorstep, ensuring that your health is our priority.</p>
            </div>
            <div className='links'>
                <h3>Links</h3>
                <ul>
                    <li className='link-item'><a href=''>> Products</a></li>
                    <li className='link-item'><a href=''>> About Us</a></li>
                    <li className='link-item'><a href=''>> Contact Us</a></li>
                    <li className='link-item'><a href=''>> Branches</a></li>
                    <li className='link-item'><a href=''>> Terms & Conditions</a></li>
                    <li className='link-item'><a href=''>> Privacy Policy</a></li>
                </ul>
            </div>
            <div className='branches-block'>
                <h3>Branches</h3>
                <ul>
                    <li className='branch-item'><img src={Location} className='location'></img><a href=''>Kandy</a></li>
                    <li className='branch-item'><img src={Location} className='location'></img><a href=''>Avisawella</a></li>
                    <li className='branch-item'><img src={Location} className='location'></img><a href=''>UdaPussalawa</a></li>
                </ul>
            </div>
            </section>
            <h4 className='cp'>Copyright © 2024 Genuine Pharmacy. All Rights Reserved </h4>
            
        </section>
    );
}

export default Footer;
