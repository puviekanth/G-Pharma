const mongoose = require('mongoose');

// Define the customer schema
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: String,
    address: String,
    contact: Number,
    nic: String,
    token: String,
});

// Create the model and explicitly set the collection name to 'customers'
const CustomerModel = mongoose.model('Customer', CustomerSchema, 'customers');

module.exports = CustomerModel;
