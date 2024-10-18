import React,{useState,useRef,useEffect} from 'react'
import Profile from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png'
import Logo from './images/Screenshot_2024-08-02_203142-removebg-preview.png';
import Telephone from './images/icon-phone-blue.png'
import Location from './images/icon-location-blue.png'
import Mail from './images/icon-mail-blue.png'
import Insta from './images/blue-insta-icon.png'
import FB from './images/icons8-facebook-50.png'
import WTSP from './images/icons8-whatsapp-50.png'
import axios from 'axios';


function ReadyforDelivery(){
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState('No 14, Lady Torrington Road Kandy');
    const [contact, setContact] = useState('0751122334');
    const menuRef = useRef(null);
    const [prescriptions,setPrescriptions]=useState([]);
    const phonenumber = '+94763322825';
    const message = 'Hello, I would like to inquire about...';
    const whatsappUrl = `https://wa.me/${phonenumber}?text=${encodeURIComponent(message)}`;


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const generateMapLink = (deliveryaddr) => {
        return `https://www.google.com/maps?q=${encodeURIComponent(deliveryaddr)}`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(()=>{
        axios.get('http://127.0.0.1:3000/getreadyfordelivery')
        .then(res=>{
            setPrescriptions(res.data);
            console.log('Successfully fetched');
            
        })
        .catch(err=>{
            console.log('There was an error executing this code',err);
        })

    },[]);
    return(
        <>
         <div className="hamburger-menu" ref={menuRef}>
                <div className='brand'>
                    <img src={Logo} alt='Logo' className='logo'/>
                    <h4><a href='/deliveryUI/home'>Genuine Pharmacy</a></h4>
                </div>
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
                <nav className={`menu-nav ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <a href="/deliveryUI/home">Home</a>
                        </li>
                        <li>
                            <a href="#current-orders">View Current Orders</a>
                        </li>
                        <li>
                            <a href="#ready-orders">View Ready Orders</a>
                        </li>
                        <li>
                            <a href='#contact-us'>Contact Us</a>
                        </li>
                    </ul>
                    <div className='profile-signout'>
                        <img src={Profile} alt='Profile' className='profile-icon' />
                        <img src={Signout} alt='Signout' className='signout-icon' />
                    </div>
                </nav>
            </div>
            {prescriptions.length>0?(
                prescriptions.map((order,index)=>(
                    <section className='ongoing-orders' key={index}>
                    <h4 style={{'color':'#fff'}}>Ready for Delivery</h4>
                    <div className='order-details-delivery'>
                    <p style={{'fontSize':'16px'}}><b>{order.orderID}</b></p>
                        <p><b>Customer Name : </b>{order.username}</p>
                        <p><b>Patient Name : </b> {order.PatientName}</p>
                        <p><b>Delivery Address : </b> <a href={generateMapLink(order.DeliveryAddress)} target="_blank" rel="noopener noreferrer">{order.DeliveryAddress}</a></p>
                        <p><b>Customer Contact : </b> <a href={`tel:${order.userContact}`} >{order.userContact}</a></p>
                        <p><b>Customer Email : </b> {order.useremail}</p>
                        <div className='btns'>
                            <button className='btn btn-success' style={{'fontSize':'12px', 'width':'200px'}}>Start To Deliver</button>
                            <button className='btn btn-danger' style={{'fontSize':'12px', 'width':'200px'}}>Not Interested </button>
                        </div>
                    </div>
                </section>
                ))
            ):(
                <p style={{'textAlign':'center'}}>Currently no orders, please stay updated.</p>
            )}
           



            <section className='footer-delivery'>
               <div className='upper-footer'>
               <div className='logo-and-name-delivery'>
                    <img src={Logo} alt='logo' className='footer-logo-new' />
                    <h4>Genuine Pharmacy</h4>
                </div>
                <div className='telephone'>
                    <img src={Telephone} alt='telephone' className='phone-icon-blue' />
                    <p><a href='tel:0812 202 381'>081 2202381</a></p>
                </div>
                <div className='address-f'>
                    <img src={Location} alt='location' className='location-icon-blue' />
                    <p><a href='https://www.google.com/maps/place/Genuine+Pharmacy/@7.2885016,80.6322843,15z/data=!4m6!3m5!1s0x3ae368829b6cc3ef:0x6a8da5ebc0a5dbbd!8m2!3d7.2885016!4d80.6322843!16s%2Fg%2F11c807yvq9?entry=ttu'>43/B, Willium Gopallawa Mw, Kandy, Sri Lanka.</a></p>
                </div>
                <div className='mail'>
                    <img src={Mail} alt='mail' className='mail-icon-blue' />
                    <p><a href='mailto:genuinepharmaceuticals@gmail.com'>genuinepharmaceuticals@gmail.com</a></p>
                </div>
               </div>
               <div className='branch-and-links'>
                    <div className='links-footer'>
                        <p style={{'fontSize':'14px'}}><b>Links</b></p>
                        <div className='div-links'>
                            <p>View Ongoing Orders</p>
                            <p>View Ready Orders</p>
                            <p>Privacy Policy</p>
                            <p>Contact Us</p>
                        </div>
                    </div>
                    <div className='branch-footer'>
                        <p style={{'fontSize':'14px'}}><b>Branches</b></p>
                        <div className='div-branches'>
                            <p>Kandy</p>
                            <p>UdaPussalawa</p>
                            <p>Avisawella</p>
                        </div>

                    </div>
               </div>
               <div className='connect-via'>
                <p style={{'fontSize':'16px'}}>Connect with us :</p>
                <div className='link-connect'>
                <a href='https://www.facebook.com/GenuinePharmacy/'><img src={ FB} className='link-img' /></a>
                    <a href='https://www.instagram.com/airmedsbygp/'><img src={Insta} className='link-img' /></a>
                    <a href={whatsappUrl}><img src={WTSP} className='link-img' target="_blank" rel="noopener noreferrer" /></a>

                </div>
               </div>
               <div className='copy-rights' style={{'backgroundColor':'#fff','padding':'5px','marginTop':'20px'}}>
                 <p style={{'fontSize':'12px'}} >Copyrights © 2024 Genuine Pharmacy. All Rights Reserved </p>
               </div>
            </section>
        </>
    );
}

export default ReadyforDelivery;