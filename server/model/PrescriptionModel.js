const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    prescription:[String],
    email:String,
    Username:String,
    Contact:Number,
    PatientName:String,
    PatientAge:Number,
    PatientGender:String,
    Allergy:String,
    DeliveryAddress:String,
    DeliveryCity:String,
    Duration:String
});

const PrescriptionModel = mongoose.model('Prescription-order', PrescriptionSchema);

module.exports = PrescriptionModel;