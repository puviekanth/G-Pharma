
import React,{useState} from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './Profile.css';
import Logo from './images/Blue_and_White_Flat_Illustrative_Health_Products_Logo-removebg-preview.png'
import Product1 from './images/Glutanex-Tablets-100.jpeg';
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import Cancel from './images/icons8-cancel-30.png';

function Profile() {
    const user = {
        fullName: 'Name',
        email: 'Email Address',
        nic: 'NIC',
        phoneNumber: '+Number',
        address: 'Address',
        city: 'City Name',
        postalCode: 'Postal Code',
        dateOfBirth: 'Date of Birth',
    };
    const [name,setName] = useState('Joe Root');
    const [email,setEmail]=useState('joe@gmail.com');
    const [contact,setContact]=useState('0759999991');
    const [address,setAddress] = useState('No 34/9 Main Street Colombo 07');
    const [nic,setNIC] = useState('123456789V');
    const [isEditing,setIsEditing] = useState(false);

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }
    const handleContactChange = (e) =>{
        setContact(e.target.value);
    }
    const handleAddressChange = (e) =>{
        setAddress(e.target.value);
    }

    const handleSave = ()=>{
        setIsEditing(false);
        
    }



    return (
        <>
            <NavBar />
           <section className='profile-section'>
            <div className='img-details'>
                <div className='img-logout'>
                    <div className='profile-pic-div'><img src={Logo} alt='profile-pix' className='profile-pic' ></img></div>
                    <button className='sign-out'>Sign Out</button>
                    <button className='delete-btn'>Delete Account</button>
                </div>
                <div className='user-details'>
                   <h2>Profile Details</h2>
                   <table className='user-details'>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' className='name' value={name}  disabled/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            {isEditing ? (
                                <td><input type='email' className='email' onChange={handleEmailChange} value={email}/></td>
                             ) :(
                                <td>{email}</td>
                             )
                            }
                        </tr>
                        <tr>
                            <td>Contact</td>
                            {isEditing ?
                            (
                                <td><input type='number' className='contact' onChange={handleContactChange} value={contact}/></td>
                            ) : (
                                <td>{contact}</td>
                            )
                            }
                        </tr>
                        <tr>
                            <td>Address</td>
                            {isEditing ? 
                            (
                                <td><textarea  className='address' type='text' onChange={handleAddressChange} value={address}/></td>
                            ) : (
                                <td>{address}</td>
                            )}
                        </tr>
                        <tr>
                            <td>NIC Number</td>
                            <td><input className='nic' type='text' value={nic} disabled /></td>
                        </tr>
                        <tr>
                            {isEditing ? (
                                <button onClick={handleSave} className='btn-save'>Save</button>
                                 ) : (
                                <button onClick={() => setIsEditing(true)} className='btn-edit'>Edit</button>
                        )}</tr>
                    </tbody>
                   </table>
                </div>
             </div>
            <div className='order-Summary-all'>
                <h2>Recent Orders</h2>
               <div className='individual-orders'>
                <h3> Order : RE123451#112</h3>
                <table>
                <tbody className='cart-products'>
                                <tr>
                                    <td><img src={Product1} className='order-img' /></td>
                                    <td>Glutanex Tablets - 100g</td>
                                    <td>5000 LKR</td>
                                    <td>1</td>
                                    <td>5000 LKR</td>
                                </tr>
                                <tr>
                                    <td><img src={Product2} className='order-img' /></td>
                                    <td>Face Cream</td>
                                    <td>3000 LKR</td>
                                    <td>2</td>
                                    <td>6000 LKR</td>
                                </tr>
                         
                        </tbody>
                </table>
               </div>
               <div className='individual-orders'>
                <h3> Order : RE14785451#112</h3>
                <table>
                <tbody className='cart-products'>
                                <tr>
                                    <td><img src={Product1} className='order-img' /></td>
                                    <td>Glutanex Tablets - 100g</td>
                                    <td>5000 LKR</td>
                                    <td>1</td>
                                    <td>5000 LKR</td>
                                </tr>
                                <tr>
                                    <td><img src={Product2} className='order-img' /></td>
                                    <td>Face Cream</td>
                                    <td>3000 LKR</td>
                                    <td>2</td>
                                    <td>6000 LKR</td>
                                </tr>
                         
                        </tbody>
                </table>
               </div>
               <button className='view-orders'>View Previous Orders</button>
            </div>
            
           </section>
            <Footer />
        </>
    );
}

export default Profile;
