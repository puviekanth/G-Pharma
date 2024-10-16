const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,',
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

// Create a model
const ProductModel = mongoose.model('Product', productSchema, 'productDbase');

// Define routes
app.get('/getproducts', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

const Productstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: Productstorage });

// Add new product
app.post('/addproducts', upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;
  const imagePath = req.file ? req.file.path : '';

  try {
    const newProduct = new ProductModel({ name, description, price, category, image: imagePath });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Update existing product
app.put('/updateproducts/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const imagePath = req.file ? req.file.path : '';

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { name, description, price, category, image: imagePath },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete a product
app.delete('/deleteproducts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(204).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
