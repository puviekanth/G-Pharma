import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import User from './images/user-profile-icon-vector.jpg';
import Signout from './images/d3d68df429bada9761070b8e905b20e5_t.jpeg';
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
    remainingstock: '' // Add remainingstock to the product state
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
      const res = await axios.get('http://localhost:5000/getproducts');
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
    formData.append('remainingstock', product.remainingstock); // Ensure this is included
    if (imageFile) {
      formData.append('image', imageFile);
    }
  

    try {
      if (editIndex !== null) {
        const productId = product._id;
        await axios.put(`http://localhost:5000/updateproducts/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditIndex(null);
      } else {
        await axios.post('http://localhost:5000/addproducts', formData, {
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
      remainingstock: '' // Reset remainingstock
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
      remainingstock: selectedProduct.remainingstock || '', // Set available stock for editing
    });
    setEditIndex(index);
  };

  const handleDeleteProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:5000/deleteproducts/${productID}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Product Name", "Price", "Category", "Available Stock"];
    const tableRows = [];

    filteredProducts.forEach((product) => {
      const productData = [
        product.name,
        `Rs.${product.price}`,
        product.category,
        product.remainingstock || 0, // Ensure remainingstock is displayed correctly
      ];
      tableRows.push(productData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Product Report", 14, 15);
    doc.save("product_report.pdf");
  };

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
          <li>Suppliers</li>
          <li>Products</li>
          <li>Delivery</li>
          <li>Employee</li>
          <li>Orders</li>
          <li>Delivery Person</li>
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

      <div className="content-adminProduct">
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
            type="number"
            name="remainingstock"
            value={product.remainingstock}
            onChange={handleInputChange}
            className="stock-input-adminProduct"
            placeholder="Available Stock"
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
        
        <hr></hr>

        <h3>Product List</h3>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                <p>Remaining Stock: {prod.remainingstock || 0}</p>
                {prod.image && (
                  <img 
                    src={`http://localhost:5000/${prod.image}`} 
                    alt={prod.name} 
                    width="100" 
                    onClick={() => handleImageClick(`http://localhost:5000/${prod.image}`)} // Open modal on click
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

        {/* Download PDF Report Button */}
        <button onClick={generatePDFReport} style={{ marginTop: '20px' }}>
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default AdminProductPage;
