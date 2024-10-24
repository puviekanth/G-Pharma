const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
    id:Number,
    name:String,
    contact:String,
    address:String,
    email:String,
    nic:String,
    company:String
})

const SupplierModel = mongoose.model("supplier",SupplierSchema)
module.exports=SupplierModel

