import React, { useState } from "react";
import "./SuppliersForm.css";  // Import custom CSS
import axios from "axios";

const UsersForm = ({ addUser }) => {
  const [formData, setFormData] = useState({ id: "", name: "",contact: "",address:"",emai:"",nic:""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const api = process.env.REACT_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${api}/createcustomer`, formData, {
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => {
    alert("Customer Created Successfully")
  })
  .catch(error => {
      console.error('Error:', error.response ? error.response.data : error.message);
  });
  };

  return (
    <div className="popup-form">
      <h1>Users Enter Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Enter ID"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Enter Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nic"
          placeholder="Enter NIC"
          value={formData.nic}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default UsersForm;
