import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './images/user-black.png';
import Signout from './images/signout-black.png';
import './adminProductPage.css';

const AdminProductPage = () => {
  const [product, setProduct] = useState({
    image:'',
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null); // State to hold one image
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle file input change for image (only one image)
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle adding or updating a product using Axios
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('image', imageFile);

    try {
      if (editIndex !== null) {
        // Update existing product
        await axios.put(`http://127.0.0.1:3000/dproducts/${products[editIndex]._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditIndex(null);
      } else {
        // Add a new product
        await axios.post('http://127.0.0.1:3000/addproducts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    //   fetchProducts(); // Refresh the product list after adding/updating
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }

    // Clear the form
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setImageFile(null); // Clear the image file
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  const fetchProducts = async()=>{
    axios.get('http://127.0.0.1:3000/getproducts')
    .then(res=>{
        setProducts(res.data)
    })
    .catch(err=>{
        console.log('Could not fetch',err);
    })
  }

  const handleClearForm = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setImageFile(null); // Clear the image file input
    setEditIndex(null);
  };

  const handleEditProduct = (index) => {
    setProduct(products[index]);
    setEditIndex(index);
  };

  const handleDeleteProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:3000/deleteproducts/${productID}`);
    //   fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container-adminProduct">
      <div className="sidebar">
        <ul>
          <li>Order</li>
          <li>Products</li>
          <li>Supplier</li>
          <li>Employee</li>
        </ul>
        <div className="icon">
          <div className="profile-icon">
            <a href='/adminprofile'><img src={User} alt='adminprofile' className='profile-icon-pro' /></a>
          </div>
          <a href='/Login'><img src={Signout} alt='signout' className='signout-icon-pro' /></a>
        </div>
      </div>

      <div className="content-adminProduct">
        <h2>{editIndex !== null ? 'Update Product' : 'Add Product'}</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className='name-input-adminProduct'
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Description"
            className='desc-input-adminProduct'
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Price"
            className='price-input-adminProduct'
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            placeholder="Category"
            className='cat-input-adminProduct'
          />

          {/* File Input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='file-input-adminProduct'
          />

          <button type="submit">
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={handleClearForm}>Clear Form</button>
        </form>

        <div className="product-list">
  <h3>Product List</h3>
  {products.length === 0 ? (
    <p>No products added yet.</p>
  ) : (
    products.map((product, index) => {
      // Declare variables outside JSX
      const imageUrl = product.image.replace(/\\/g, '/'); // Replaces all backslashes with forward slashes

      return (
        <div key={product._id} className="product-item">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> Rs.{product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>

          {/* Only display image if there's an imageUrl */}
          {product.image && (
            <img
              src={`http://localhost:3000/${imageUrl}`}
              alt={product.name}
              width="100"
            />
          )}

          <button onClick={() => handleEditProduct(index)}>Edit</button>
          <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
        </div>
      );
    })
  )}
</div>


      </div>
    </div>
  );
};

export default AdminProductPage;
