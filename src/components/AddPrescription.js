import React, { useEffect, useState } from 'react';
import './AddPrescription.css'
import Prescription from './images/prescription.jpg'
import Navbar from './NavBar'
import Footer from './Footer'
import axios from 'axios';

function AddPrescription() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [contact,setContact] = useState('');
    const [patientName,setPatientName] = useState('');
    const [patientAge,setPatientAge] = useState('');
    
    const [delivery,setDelivery] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [duration,setDuration] = useState('');
    const [GenderselectedOption,setGenderSelectedOption] = useState('');
    const [AllergyselectedOpion,setAllergySelectedOption] = useState('');
    const[successMSG,setSuccessMSG] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }
        axios.get('http://127.0.0.1:3000/email', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setEmail(response.data.email);
            setSuccessMSG(response.data.message);
        })
        .catch(err => {
            console.log('Failed to retrieve the email.', err);
        });
    }, []); // Empty array ensures the effect runs only once after initial render.
    

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

        // Check if more than 3 files are selected
        if (files.length > 3) {
            setErrorMessage('You can only upload up to 3 images.');
            setSelectedImages([]);
            return;
        }

        // Check if the files are of valid types
        const invalidFiles = files.filter(file => !validExtensions.includes(file.type));
        if (invalidFiles.length > 0) {
            setErrorMessage('Only JPG, JPEG, and PNG files are allowed.');
            setSelectedImages([]);
            return;
        }

        // Clear error and update the selected images
        setErrorMessage('');
        setSelectedImages(files);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        const formData = new FormData();
        selectedImages.forEach((file) => {
            formData.append('prescription', file);
        });
        formData.append('Username', name);
        formData.append('email', email);
        formData.append('Contact', contact);
        formData.append('PatientName', patientName);
        formData.append('PatientAge', patientAge);
        formData.append('PatientGender', GenderselectedOption);
        formData.append('Allergy', AllergyselectedOpion);
        formData.append('DeliveryAddress', delivery);
        formData.append('DeliveryCity', city);
        formData.append('Duration', duration);

        try {
            const response =  axios.post('http://127.0.0.1:3000/addPrescription', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to submit prescription:', error.response.data);
        }
    };

    return (
        <>
        <Navbar/>
        <section className='presc'>
       
            <form onSubmit={handleSubmit} className='prescription-form'>
                
                <h3 style={{fontSize:'18px'}}>Please Select 3 clear images of your prescription before uploading</h3>
                <input
                    type='file'
                    multiple
                    className='prescription-upload'
                    accept='.jpg,.jpeg,.png'
                    onChange={handleFileChange}
                    style={{border:'2px dashed #004085',padding:'10px'}}
                />

                {/* Display selected images */}
                <div className="image-preview">
                    {selectedImages.length > 0 && selectedImages.map((image, index) => (
                        <img 
                            key={index} 
                            src={URL.createObjectURL(image)} 
                            alt={`Prescription Preview ${index + 1}`} 
                            width="100px" 
                            height="100px"
                            style={{ margin: '10px' }}
                        />
                    ))}
                </div>

               <h2 style={{marginTop:'20px'}}>Personal Information</h2>
               <div className='email'>
                        <p style={{fontSize:'16px'}}>As part of security, your email will be recorded</p>
                        <input className='email-input' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} disabled />
                    </div>
               
                <div className='name-contact'>
                <div className='name'>
                    <p style={{fontSize:'16px'}} >Your Name</p>
                    <input className='name-input' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} required />
                </div>
                <div className='contact'>
                        <p>Your Contact Number</p>
                        <input className='contact-input' type='number' value={contact} onChange={(e)=>{setContact(e.target.value)}} required />
                    </div>
                </div>
                <h2 style={{marginTop:'20px'}}>Prescription Information</h2>
                <div className='patient-info'>
                    <div className='patient-name'>
                        <p>Patient Name</p>
                        <input className='patient-name-input' type='text' value={patientName} onChange={(e)=>{setPatientName(e.target.value)}} required />
                    </div>
                    <div className='patient-age'>
                        <p>Patient Age</p>
                        <input className='patient-age-input' type='number' value={patientAge} onChange={(e)=>{setPatientAge(e.target.value)}} required />
                    </div>
                    
                </div>
                
                 <div className='gender'>
                    <p style={{marginTop:'20px'}}>Patient Gender</p>
                    <input className='gender-input' type='radio' name='gender' value='Male' onChange={(e)=>{setGenderSelectedOption(e.target.value)}} /><label>Male</label>
                    <input className='gender-input' type='radio' name='gender' value='Female' onChange={(e)=>{setGenderSelectedOption(e.target.value)}} /><label>Female</label>
                </div>
                <div className='allergy'>
                    <p>Any Allergy to Medicine</p>
                    <input className='allergy-input' type='radio' name='allergy' value='Yes' onChange={(e)=>{setAllergySelectedOption(e.target.value)}}/><label>Yes</label>
                    <input className='allergy-input' type='radio' name='allergy' value='No' onChange={(e)=>{setAllergySelectedOption(e.target.value)}} /><label>No</label>
                </div>
                <h2 style={{marginTop:'20px'}}>Delivery Information</h2>
                <div className='delivery-info'>
                <div className='delivery-address' style={{marginTop:'20px'}}>
                    <p>Your Delivery Address</p>
                    <input className='delivery-address-input' type='text' value={delivery} onChange={(e)=>{setDelivery(e.target.value)}} required />
                </div>
                <div className='delivery-city' style={{marginTop:'20px'}}>
                    <p>Delivery City</p>
                    <input className='delivery-city-input' type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} required />
                </div>
                </div>
                <div className='duration' style={{marginTop:'20px'}}>
                    <p>The Duration Medicine Needed for </p>
                    <input type='text' className='duration-input' value={duration} onChange={(e)=>{setDuration(e.target.value)}} required />
                </div>

                    
               
                
                {!errorMessage && ( 
                   
                    <button type='submit' className='upload-btn' style={{width:'200px',backgroundColor:'#004085',color:'#fff'}}>Upload</button>
                )}
            </form>

            <section className='disclaimer'>
            <h2>Simply Upload Your Prescription</h2>
                <img src={Prescription} className='prescription-img' alt='' />
                
                <ul className='ul'>
                    <li>You can upload up to 3 photos.</li>
                    <li>Please upload a full, clear photo of your prescription.</li>
                    <li>Please double check your mobile phone number before submitting the prescription. One of our pharmacists will contact you to confirm your order.</li>
                    <li>Your prescription must be a valid prescription from a registered medical practitioner.</li>
                </ul>
            </section>
            </section>
            <Footer />
        </>
    );
}

export default AddPrescription;
