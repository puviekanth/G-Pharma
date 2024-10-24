const mongoose = require('mongoose');

const DeliveryPersonSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  contact: String,
  address: String,
  dob: Date,
  nic: String
});

const DeliveryPersonModel = mongoose.model('DeliveryPerson', DeliveryPersonSchema);

module.exports = DeliveryPersonModel;