const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CustomerModel = require('./model/Customer');
const NewsletterModel = require('./model/Newsletter')


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/customers")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

    app.post('/newsletter', (req, res) => {
        NewsletterModel.create(req.body)
            .then(customers => res.json(customers))
            .catch(err => res.json(err));
    });
    
    

    app.post('/login',(req,res)=>{
        const {email,password} = req.body;
        CustomerModel.findOne({email:email})
        .then(user=>{
            if(user){
                if(user.password===password){
                    res.json("Success")
                }
                else{
                    res.json("Incorrect Password")
                }
            }else{
                res.json("Record doesnt exist")
            }
        })
    });
app.post('/signup', (req, res) => {
    CustomerModel.create(req.body)
        .then(customers => res.json(customers))
        .catch(err => res.json(err));
});







app.listen(3000, () => {
    console.log("server is running on port 3000.");
});