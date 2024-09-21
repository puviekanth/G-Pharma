const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Product schema
const productSchema = new mongoose.Schema({
  productID: Number,
  name: String,
  description: String,
  price: Number,
  category: String,
  imageURL: String
});

// Create a model
const Product = mongoose.model('Product', productSchema, 'productDB');

// Define routes

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Delete a product by productID
app.delete('/products/:productID', async (req, res) => {
  try {
    const productID = parseInt(req.params.productID, 10);
    const result = await Product.deleteOne({ productID: productID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
