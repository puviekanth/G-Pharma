const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  contact: String,
  address: String,
  dob: Date,
  nic: String
});

const AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;