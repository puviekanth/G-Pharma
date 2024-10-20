const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductQuantity: { type: Number, required: true },
    Subtotal: { type: Number, required: true }
});

const BillingSchema = new mongoose.Schema({
 
 
  email: String,
  name: String,
  contact: String,
  city:String,
  address: String,
  date:Date,
cartItems:[cartItemSchema],
status:String
});

const BillingModel = mongoose.model('billing', BillingSchema);

module.exports = BillingModel;