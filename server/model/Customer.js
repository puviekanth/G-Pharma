const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  contact: String,
  address: String,
  dob: Date,
  nic: String
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

module.exports = CustomerModel;
