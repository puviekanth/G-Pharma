import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './images/icons8-user-64.png';
import Signout from './images/icons8-sign-out-64.png';
import ImageModal from './ImageModal'; // Import the modal
import './AdminProductPage.css';

const AdminProductPage = () => {
  const [product, setProduct] = useState({
    _id: '',
    image: '',
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3000/getproducts');
      setProducts(res.data);
    } catch (err) {
      console.error('Could not fetch products', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editIndex !== null) {
        const productId = product._id;
        await axios.put(`http://127.0.0.1:3000/updateproducts/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditIndex(null);
      } else {
        await axios.post('http://127.0.0.1:3000/addproducts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchProducts();
      handleClearForm();
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleClearForm = () => {
    setProduct({
      _id: '',
      image: '',
      name: '',
      description: '',
      price: '',
      category: '',
    });
    setImageFile(null);
    setEditIndex(null);
  };

  const handleEditProduct = (index) => {
    const selectedProduct = products[index];
    setProduct({
      _id: selectedProduct._id,
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      category: selectedProduct.category,
    });
    setEditIndex(index);
  };

  const handleDeleteProduct = async (productID) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/deleteproducts/${productID}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <div className="container-adminProduct">
      <div className="sidebar">
        <ul>
        <li><a href='/suppliers'>Suppliers</a></li>
          <li><a href='/products'>Products</a></li>
          <li><a href='/employees'>Employee</a></li>
          <li><a href='/orders'>Orders</a></li>
          <li><a href='/landing-delivery'>Delivery Person</a></li>
        </ul>
        <div className="icon">
          <div className="profile-icon">
            <a href='/adminprofile'>
              <img src={User} alt='Admin Profile' className='profile-icon-pro' />
            </a>
          </div>
          <a href='/Login'>
            <img src={Signout} alt='Sign Out' className='signout-icon-pro' />
          </a>
        </div>
      </div>

      <div className="content-adminProduct" style={{marginLeft:'20%'}}>
        <h2>{editIndex !== null ? 'Update Product' : 'Add Products'}</h2>
        
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="name-input-adminProduct"
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="desc-input-adminProduct"
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="price-input-adminProduct"
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="cat-input-adminProduct"
            placeholder="Category"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input-adminProduct"
          />
          <button type="submit">Save Product</button>
          <p></p><p></p>
        </form>
        
      

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <h3>Product List</h3>

        <div className="product-list">
        
          {filteredProducts.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            filteredProducts.map((prod, index) => (
              <div key={prod._id} className="product-item">
                <h3>{prod.name}</h3>
                <p>{prod.description}</p>
                <p>Price: Rs.{prod.price}</p>
                <p>Category: {prod.category}</p>
                {prod.image && (
                  <img 
                    src={`http://localhost:3000/${prod.image}`} 
                    alt={prod.name} 
                    width="100" 
                    onClick={() => handleImageClick(`http://localhost:3000/${prod.image}`)} // Open modal on click
                    style={{ cursor: 'pointer' }} // Change cursor to pointer
                  />
                )}
                <button onClick={() => handleEditProduct(index)}>Edit</button>
                <button onClick={() => handleDeleteProduct(prod._id)}>Delete</button>
              </div>
            ))
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal imageUrl={selectedImage} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
};

export default AdminProductPage;