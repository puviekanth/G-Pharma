import React, { useState } from 'react';

function AddPrescription() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [contact,setContact] = useState('');
    const [patientName,setPatientName] = useState('');

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
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Please Select 3 clear images of your prescription before uploading</h3>
                <input
                    type='file'
                    multiple
                    className='prescription-upload'
                    accept='.jpg,.jpeg,.png'
                    onChange={handleFileChange}
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

                <div className='name'>
                    <label>Your Name</label>
                    <input type='text' className='name-input' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                </div>
                <div>
                    <label>Your Contact Number</label>
                    <input type='number' className='contact-input' value={contact} onChange={(e)=>{setContact(e.target.value)}} required/>
                </div>
                <h4 className='Prescription-details'>Prescription Information</h4>
                <div className='patient-name'>
                    <label>Patient Name</label>
                    <input type='text' className='patient-name-input' value={patientName} onChange={(e)=>{setPatientName(e.target.value)}} required />
                </div>

                {/* Display error message if any */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Only show the Submit button if there are no errors */}
                {!errorMessage && (
                    <button type='submit'>Submit</button>
                )}
            </form>
        </>
    );
}

export default AddPrescription;
