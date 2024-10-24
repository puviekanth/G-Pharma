const mongoose=require('mongoose')

const EmployeeSchema =new mongoose.Schema({
    name:String,
    empID:String,
    email:String,
    age:Number,
    role:String,
    contact:Number
})

const EmployeeModel =mongoose.model("employee", EmployeeSchema,'employees')

module.exports=EmployeeModel;