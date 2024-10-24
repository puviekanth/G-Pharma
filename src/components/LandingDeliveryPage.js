import React, { useState, useEffect } from 'react';
import User from './images/icons8-user-64.png'
import Signout from './images/icons8-sign-out-64.png'
import './LandingDeliveryPage.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DeliveryPerson = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    dob:'',
    nic:''
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Delivery People Report", 14, 10);
    doc.autoTable({
        head: [['Delivery Person Name', 'Contact', 'Email', 'Address']],
        body: data.map(user => [user.name, user.contact, user.email, user.address]),
    });
    doc.save("Delivery_People.pdf");
};

  // Fetch delivery persons from the API fetch('http://localhost:5001/api/delivery-persons') // Update to the new port

  useEffect(() => {
    fetch('http://localhost:3000/api/delivery-persons') // Update to the new port
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data on mount:", data); // Debugging log
      setData(Array.isArray(data) ? data : []);
    })
    .catch(error => console.error('Error fetching delivery persons:', error));
  
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex === null) {
      // Add new entry (POST)
      fetch('http://localhost:3000/api/delivery-persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
        .then(response => response.json())
        .then(() => {
          setData(prevData => [...prevData, newEntry]);
          setNewEntry({ name: '', contact: '', email: '', address: '',dob:'',nic:'' });
          setModalVisible(false);
        })
        .catch(error => console.error('Error adding delivery person:', error));
    } else {
      // Update existing entry (PUT)
      const id = data[editIndex]._id;
      fetch(`http://localhost:3000/api/delivery-persons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      })
        .then(response => response.json())
        .then(() => {
          const updatedData = [...data];
          updatedData[editIndex] = newEntry;
          setData(updatedData);
          setNewEntry({ name: '', contact: '', email: '', address: '',dob:'',nic:'' });
          setModalVisible(false);
          setEditIndex(null);
        })
        .catch(error => console.error('Error updating delivery person:', error));
    }
  };

  const handleCancel = () => {
    setNewEntry({ name: '', contact: '', email: '', address: '',dob:'',nic:'' });
    setModalVisible(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewEntry(data[index]);
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const id = data[index]._id;
    fetch(`http://localhost:3000/api/delivery-persons/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setData(prevData => prevData.filter((_, i) => i !== index));
      })
      .catch(error => console.error('Error deleting delivery person:', error));
  };

  const handleAddNew = () => {
    setNewEntry({ name: '', contact: '', email: '', address: '' ,dob:'',nic:''});
    setModalVisible(true);
    setEditIndex(null);
  };

  return (
    <div className="delivery-person-page">
       <div className="sidebar">
    <ul>
        <li >
            <a href='/suppliers' style={{ padding: '10px 15px' }}>Suppliers</a>
        </li>
        <li>
            <a href='/products' style={{ padding: '10px 15px' }}>Products</a>
        </li>
        <li>
            <a href='/employees' style={{ padding: '10px 15px' }}>Employee</a>
        </li>
        <li>
            <a href='/orders' style={{ padding: '10px 15px' }}>Orders</a>
        </li>
        <li style={{backgroundColor:'#004085' , border:'1px solid #fff'}}>
            <a href='/landing-delivery' style={{color:'#fff', padding: '10px 15px' }}>Delivery Person</a>
        </li>
    </ul>
    <div className="icon" style={{ marginBottom: '8vh' }}>
        <div className="profile-icon">
            <a href='/adminprofile'>
                <img src={User} alt='Admin Profile' className='profile-icon-pro' />
            </a>
        </div>
        <a href='/Login'>
            <img src={Signout} alt='Sign Out' className='signout-icon-pro' style={{marginLeft:'70px',height:'40px',width:'auto'}} />
        </a>
    </div>
</div>
      <div className="content" style={{marginLeft:'20%'}}>
        <h1>Delivery Person</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="add-button" onClick={handleAddNew}>Add New +</button>
        </div>

        <table className="delivery-person-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date Of Birth</th>
              <th>NIC</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.filter(item =>
              (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.contact || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.dob || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.nic || '').toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item, index) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.contact}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.dob}</td>
                <td>{item.nic}</td>
                <td><button className="update-button" onClick={() => handleEdit(index)}>Update</button></td>
                <td><button className="delete-button" onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={generatePDF} style={{ marginTop: '20px' }}>
          Download PDF Report
        </button>

        {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editIndex === null ? 'Add New Entry' : 'Edit Entry'}</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newEntry.name}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="contact"
                placeholder="Phone Number"
                value={newEntry.contact}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newEntry.email}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newEntry.address}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={newEntry.dob}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                value={newEntry.nic}
                onChange={handleInputChange}
                className="form-input"
              />
              <div className="modal-buttons">
                <button className="save-button" onClick={handleSave}>{editIndex === null ? 'Save' : 'Update'}</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPerson;
