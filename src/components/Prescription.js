import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import './Prescription.css';

function Prescription() {
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [error, setError] = useState(''); 
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [allergy, setAllergy] = useState('');
  const [textAllergy, setTextAllergy] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [duration, setDuration] = useState('');

  const handleOptionChange = (event) => {
    setAllergy(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      setError("You can only upload a maximum of 5 images.");
      setSelectedImgs([]); // Clear the selected files
    } else {
      setError(''); // Clear error message if valid
      setSelectedImgs(files); // Update the state with the selected files
    }
  };

  const handleSelectChange = (event) => {
    setDuration(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Files to upload:", selectedImgs);
  };

  return (
    <>
      <Navbar />
      <section className="uploads">
        <div className="form-div">
          <form className="upload-form" onSubmit={handleSubmit}>
            <label className='lbl'>You can upload up to 5 pictures. Please upload clear images of the whole prescription.

Partial Prescription images will not be processed.</label>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <input
              type="file"
              className="add-pics"
              accept=".jpg,.png,.jpeg"
              multiple
              onChange={handleFileChange}
              required
            />
            <div className="image-preview">
              {selectedImgs.map((img, index) => (
                <div key={index} className="image-container">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview ${index}`}
                    className="image-preview-item"
                  />
                </div>
              ))}
            </div>
            <div className='name-email'>
              <div className='sets'>
              <label>Enter Your Name</label>
              <input type="text" className="name-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
            <div className='sets'>
              <label>Enter Your Email</label>
              <input type='email' className='email-input' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            <div className='contact-duration'>
              <div className='sets'>
                <label>Enter your Contant</label>
                <input type='text' className='contact-input' value={contact} onChange={(e) => setContact(e.target.value)} required /> 
              </div>
            </div>
            <div className='sets'>
                <label>Number of Days you want the medicine for</label>
                <select value={duration} onChange={handleSelectChange} className='duration-input' required>
                  <option value="" disabled>Select an Option</option>
                  <option value="3 days">3 Days</option>
                  <option vakue="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="3 weeks">3 weeks</option>
                  <option value="1 month">1 month</option>
                  <option vlaue="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                </select>
              </div>
            <div className='address-field'>
            <label>Enter Your Delivery Address</label>
            <input type='text' value={address} onChange={(e)=>{setAddress(e.target.value)}} className='address-input' required/>
            </div>
            <div className='radio-buttons'>
              <label>Do you have any allergies</label>
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={allergy === 'Yes'}
                  onChange={handleOptionChange}
                  className='rdio-btn'
                />
              Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={allergy === 'No'}
                  onChange={handleOptionChange}
                  required
                  className='rdio-btn'
                />
              No
              </label>
            </div>
            <div className='allergy-text'>
              <label>Note down all the allergies if you have any.</label>
              <textarea type='text' className='allery-input' value={allergy} onChange={(e)=>{setAllergy(e.target.value)}} placeholder='Yes, enter your allergies' cols={40}/>
            </div>
          </form>
        </div>

        <div className="disclaimer">
          <ul>
            <li><b>You can upload up to 5 photos.</b></li>
            <li><b>Please upload a full, clear photo of your prescription.</b></li>
            <li><b>If you have specific instructions or specific/preferable brands, please mention in the ‘Notes’ section.</b></li>
            <li><b>Please double-check your mobile phone number before submitting the prescription. One of our pharmacists will contact you to confirm your order.</b></li>
            <li><b>Your prescription must be a valid prescription from a registered medical practitioner.</b></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Prescription;
