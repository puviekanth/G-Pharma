const { string } = require('joi');
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:String,
    name: String,
    description: String,
    price: Number,
    category: String,
    
  });
  
  // Create a model
  const Product = mongoose.model('Product', productSchema, 'productDB');

  module.exports = Product