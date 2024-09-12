const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    dob:String,
    address:String,
    contact:Number,
    nic:String,
    token:String,
    
})

const CustomerModel = mongoose.model("customers",CustomerSchema)
module.exports=CustomerModel