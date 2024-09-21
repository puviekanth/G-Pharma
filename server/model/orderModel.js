const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    orderId: Number,
    customerName: String,
    customerEmail: String,
    orderDate: String,
    status: String,
    prescriptions: [
      {
        prescriptionId: String,
        medicationName: String,
        dosage: String,
        quantity: Number,
        pricePerUnit: Number,
        totalAmount: Number
      }
    ],
    address: String
  });

  const Order = mongoose.model('order',orderSchema);
module.exports=Order;
