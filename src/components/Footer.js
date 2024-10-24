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
            <table style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td>100% Secured Payment Methods</td>
                        <td>Island Wide Delivery</td>
                        <td>365 Days Customer Support</td>
                    </tr>
                </tbody>
            </table>

        <section className='footer-info-blocks' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div className='logo-name'>
                <div className='logo-with-name-only'>
                <img src={ Logo } alt='logo' className='footer-logo'></img>
                <h2>Genuine Pharmacy</h2>
                </div>
                <div className='brief-desc'>
                    <p style={{fontSize:'14px',textAlign:'justify'}}>Genuine Pharmacy offers a convenient online platform for ordering prescription and over-the-counter medicines, medical equipment, and more,
                         with easy prescription uploads, timely delivery, and dedicated customer support</p>
                </div>
                <div className='social-media-links' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <a href='https://www.facebook.com/GenuinePharmacy/' style={{marginRight:'20px',marginLeft:'50px'}}><img width="40" height="40" src="https://img.icons8.com/ios-filled/50/228BE6/facebook-new.png" alt="facebook-new"/></a>
                    <a href='https://www.instagram.com/airmedsbygp/'  style={{marginRight:'20px'}}><img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/228BE6/instagram-new--v1.png" alt="instagram-new--v1"/></a>
                    <a href=''><img width="38" height="38" src="https://img.icons8.com/ios-filled/50/228BE6/whatsapp--v1.png" alt="whatsapp--v1"/></a>
                </div>
            </div>
           
            <div className='links-footer' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <h3 style={{fontSize:'24px'}}><b>Links</b></h3>
                <ul>
                    <li className='link-item'><a href='/Shop'>> Products</a></li>
                    <li className='link-item'><a href='/about'>> About Us</a></li>
                    <li className='link-item'><a href='/contact'>> Contact Us</a></li>
                    <li className='link-item'><a href='/contact'>> Branches</a></li>
                    <li className='link-item'><a href=''>> Terms & Conditions</a></li>
                    <li className='link-item'><a href=''>> Privacy Policy</a></li>
                </ul>
            </div>
            <div className='branches-block'>
            <h3 style={{fontSize:'24px'}}><b>Branches</b></h3>
                <ul>
                    <li className='branch-item'><img width="17" height="17" src="https://img.icons8.com/ios-filled/50/228BE6/marker.png" alt="marker" style={{marginRight:'5px'}}/><a href=''>Kandy</a></li>
                    <li className='branch-item'><img width="17" height="17" src="https://img.icons8.com/ios-filled/50/228BE6/marker.png" alt="marker" style={{marginRight:'5px'}}/><a href=''>Avisawella</a></li>
                    <li className='branch-item'><img width="17" height="17" src="https://img.icons8.com/ios-filled/50/228BE6/marker.png" alt="marker" style={{marginRight:'5px'}}/><a href=''>UdaPussalawa</a></li>
                </ul>
            </div>
            <div className='footer-contact-info' >
            <h3 style={{fontSize:'24px'}}><b>Contact Pharmacy</b></h3>
            <div className='phone-mail-location' style={{display:'flex',flexDirection:'column',alignItems:'baseline',justifyContent:'center'}}>
                <div className='address' style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/228BE6/marker.png" alt="marker"/>
                    <h4><a href='https://www.google.com/maps/place/Genuine+Pharmacy/@7.2885016,80.6322843,15z/data=!4m6!3m5!1s0x3ae368829b6cc3ef:0x6a8da5ebc0a5dbbd!8m2!3d7.2885016!4d80.6322843!16s%2Fg%2F11c807yvq9?entry=ttu'>43/B, Willium Gopallawa Mw, Kandy, Sri Lanka.</a></h4>
                </div>
                <div className='phone'  style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
                <img width="23" height="23" src="https://img.icons8.com/android/24/228BE6/phone.png" alt="phone" style={{marginRight:'10px',marginBottom:'10px'}}/>
                    <h4><a href='tel:0812 202 381' style={{marginTop:'15px'}}>081 2202381</a></h4>
                </div>
                <div className='mail'  style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/228BE6/apple-mail.png" alt="apple-mail"/>
                    <h4><a href='mailto:genuinepharmaceuticals@gmail.com'>genuinepharmaceuticals@gmail.com</a></h4>
                </div>
                </div>
            </div>
            </section>
            <h4 className='cp'>Copyright © 2024 Genuine Pharmacy. All Rights Reserved </h4>
            
        </section>
    );
}

export default Footer;
