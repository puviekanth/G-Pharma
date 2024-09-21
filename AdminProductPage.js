import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminProductPage.css';

const AdminProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products using Axios
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle adding or updating a product using Axios
  const handleAddProduct = async () => {
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = product;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      try {
        await axios.post('http://localhost:5000/products', product);
        fetchProducts(); // Refresh the product list after adding
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    });
  };

  // Clear the form
  const handleClearForm = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    });
    setEditIndex(null);
  };

  // Handle editing a product
  const handleEditProduct = (index) => {
    setProduct(products[index]);
    setEditIndex(index);
  };

  // Handle deleting a product using Axios
  const handleDeleteProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productID}`);
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>Order</li>
          <li>Products</li>
          <li>Supplier</li>
          <li>Employee</li>
        </ul>
        <div className="icon">
          <div className="profile-icon">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
          <div className="signout-icon">
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
          </div>
        </div>
      </div>

      <div className="content">
        <h2>{editIndex !== null ? 'Update Product' : 'Add Product'}</h2>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />

        <button onClick={handleAddProduct}>
          {editIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
        <button onClick={handleClearForm}>Clear Form</button>

        <div className="product-list">
          <h3>Product List</h3>
          {products.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            products.map((product, index) => (
              <div key={product._id} className="product-item">
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> Rs.{product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Image:</strong> <img src={product.imageUrl} alt={product.name} width="100" /></p>
                <button onClick={() => handleEditProduct(index)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.productID)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
