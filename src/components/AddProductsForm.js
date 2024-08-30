// src/components/AddProductForm.js

import React, { useState } from 'react';
import './AddProductForm.css'; // Import your CSS file
import Navbar from './Nav';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to a server
    console.log('Product submitted:', product);
    // Reset the form
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: ''
    });
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URLss:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
