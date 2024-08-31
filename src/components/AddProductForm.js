import React, { useState } from 'react';
import './AddProductForm.css'; 
import UserIcon from './images/icons8-male-user-32.png'
import SignOut from './images/icons8-sign-out-48.png'


        <div className="content-wrapper">
        <div className='with-categories'>
        <div className='categories'>
            <ul>
                <li>Order</li>
                <li>Products</li>
                <li>Supplier</li>
                <li>Employee</li> 
            </ul>
            <div className="icon">
                <div className='profile-icon'>
                    <img src={UserIcon} alt='User-Icon' className='User-Icon' />
                </div>
                <div className='signout-icon'>
                    <img src={SignOut} alt='SignOut' className='SignOut' />
                </div>
            </div>
            </div>
            </div>
            </div>
          
          
        

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
   
    console.log('Product submitted:', product);
    
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
            <label htmlFor="imageUrl">Image URL:</label>
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
