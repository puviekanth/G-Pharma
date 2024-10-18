const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductQuantity: { type: Number, required: true },
    Subtotal: { type: Number, required: true }
});

const checkoutSchema = new mongoose.Schema({
    email: { type: String, required: true },
    cartItems: [cartItemSchema] // Array of cart item objects
});

const CheckoutModel = mongoose.model('Checkout', checkoutSchema);


module.exports = CheckoutModel;