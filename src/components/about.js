
import NavBar from './HomeNavbar'
import Footer from './Footer'
import About1 from './images/about.jpg'
import About2 from './images/about1.jpg'
import About3 from './images/sbout2.webp'
import { useEffect, useState } from 'react'
import './about.css'


function About(){
    const images = [About1, About2,About3];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000); 

        return () => clearInterval(interval);
    }, [images.length]);
    return(
       
        <>
        <NavBar />
        <section className='about-us-section'>
        <div className='with-heading'>
             <h1 className='topic'>About Us</h1>
            <div className='about-us-div'>
                
                <div className='image-container'>
                    <img src={images[currentImage]} className='transition-image'></img>
                </div>
                <div className='about-content'>
                <p>Genuine Pharamcy (Pvt) Ltd., was established in 2001 as a sole Proprietor business entity by our Late founder Mr. J.M.A.R.J.Bandara, We are a chain pharmacy with 3 outlets.<br></br><br></br> Genuine Pharamcy (Pvt) Ltd. has served the nation for Over a Generation, with Prescription Medication, Preparation mixing local Applications, supplying of Wheelchairs, Orthopaedic supports, Home and professional medical Care equipment, Surgical consumable.<br></br>

With present busy schedules and traffic situations to customers, we have established our  “Online Pharmacy” service. Customers can log in to “Union Chemists pharmacy online” Upload the medical Prescription or buy home or  Professional Medical equipment Orthopaedic supports Wheel chairs, from our “Pharmacy Online service”.<br></br><br></br>

Genuine Pharamcy delivery service will send your order through our experience qualified dispenser to your doorstep. Our team is trained on Medicinal Product or prescription Advice and Explanation, Medical Equipment Demonstration and installation.</p>
                </div>
            </div>
            </div>
        </section>
        < Footer />
        </>
    );
}

export default About;

