require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CustomerModel = require('./model/Customer');
const { Navigate } = require('react-router');
const jwt = require('jsonwebtoken');
const NewsletterModel = require('./model/Newsletter');
const secretKey = process.env.JWT_PRIVATE_KEY;
const ContactModel = require('./model/ContactModel');
const AdminModel = require('./model/AdminModel');
const PrescriptionModel = require('./model/PrescriptionModel'); // Your Prescription model
const multer = require('multer');
const path = require('path');
const Order = require('./model/orderModel');

const app = express();
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/prescription'); // Save files to 'uploads/prescriptions' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append date and file extension to the file name
    }
});

// Upload middleware to accept 3 files at most
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).array('prescription', 3); 

// Connect to MongoDB with the genuine-pharmacy database
mongoose.connect("mongodb://localhost:27017/genuine-pharmacy", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Connected to MongoDB database: genuine-pharmacy"))
    .catch(err => console.error("Failed to connect to MongoDB", err));


//protected routes
const authenticateJWT = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]; //extract token from the headers
    if(!token){
       return res.status(500).json({error:'No token found, please try logging in again.'});
        
    }
    jwt.verify(token,secretKey, (err,decoded)=>{
        if(err){
            return res.status(500).json({error:'Invalid token'});
        }
        req.user = decoded; //saving the decoded email to the req.user
        next();
    });
}

// Sign up route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, contact, dob, address, nic } = req.body;

        // Hash the password
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        // Store the user details in the customers collection
       if(email.endsWith('.admin@genuinepharmacy.com')){
        const adminUser = await AdminModel.create({
            name,
            password: encryptedPassword,
            email,
            contact,
            address,
            dob,
            nic
        });
        res.status(200).json({ message: 'User Created Successfully', user: adminUser });
       }
       else{
        const newUser = await CustomerModel.create({
            name,
            password: encryptedPassword,
            email,
            contact,
            address,
            dob,
            nic
        });

        // Respond with success
        res.status(200).json({ message: 'User Created Successfully', user: newUser });
       }
    } catch (e) {
        if (e.code === 11000) { // MongoDB error for duplicate key
            // Duplicate email or NIC error
            res.status(400).json({ error: "Email or NIC already exists." });
        } else {
            console.error("Email or NIC already exists.", e);
            res.status(500).json({ error: 'Email or NIC Already exists.' });
        }
    }
});

//login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if(email.endsWith('.admin@genuinepharmacy.com')){
            const admin = await AdminModel.findOne({email:email});
            if(!admin){
                return res.status(404).json({error:'No admin Found'});
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign({ email: admin.email }, secretKey, { expiresIn: '1h' });
    
                // Return token along with success message
                return res.status(200).json({ message: 'Logged in successfully', token: token ,user:admin });
            } else {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

        }
       else{
        const user = await CustomerModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'No User Found, please register.' });
        }

        // Correctly await bcrypt.compare for password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

            // Return token along with success message
            return res.status(200).json({ message: 'Logged in successfully', token: token ,user:user });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
       }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});



//Profile route
app.get('/Profile',authenticateJWT, async (req,res)=>{
    try {
        const email = req.user.email;
        const currentUser = await CustomerModel.findOne({email:email});
        if(!currentUser){
            return res.status(500).json({error:'No Record Exists'});
        }
       return res.status(201).json({
            name:currentUser.name,
            email:currentUser.email,
            contact:currentUser.contact,
            address : currentUser.address,
            nic : currentUser.nic
        });
    } catch (error) {
        return res.status(500).json({error:'Failed to retrieve user data'});
    }
})


//profile update route
app.post('/updateProfile', authenticateJWT, async (req, res) => {
    try {
        const email = req.user.email; 
        const { name, contact, address } = req.body;
        const updatedUser = await CustomerModel.findOneAndUpdate(
            { email: email },  
            { name, contact, address },
            { new: true }  
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User Not Found' });
        }
        return res.status(200).json({ message: 'User Updated Successfully', updatedUser });
    } catch (error) {
        console.log('Error updating profile', error);
        return res.status(500).json({ error: 'Failed to update profile' });
    }
});

//delete user
app.delete('/deleteUser', authenticateJWT, async (req, res) => {
    try {
        const email = req.user.email; // Extracted from the JWT token
        const deleteUser = await CustomerModel.findOneAndDelete({ email });

        if (!deleteUser) {
            return res.status(500).json({ error: 'No user found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log('Failed to delete user', error);
        return res.status(500).json({ error: 'Failed to delete user.' });
    }
});


//newsletter route
app.post('/newsletter', async (req, res) => {
    try {
        const { email } = req.body; // Extract email from req.body

        if (!email) {
            return res.status(400).json({ error: 'Email is required' }); // Validate the presence of email
        }

        const news = await NewsletterModel.create({ email });

        if (!news) {
            return res.status(500).json({ error: 'Could not subscribe to newsletter' });
        }

        return res.status(200).json({ message: 'Successfully subscribed to the newsletter' });
    } catch (error) {
        console.log('Failed to subscribe:', error);
        return res.status(500).json({ error: 'Failed to subscribe' });
    }
});


//contact route
app.post('/contact',  async (req,res)=>{
   try {
    const {name,email,subject,message} = req.body;
    if(!name || !email|| !subject || !message){
        return res.status(401).json({error:'Please provide valid details.'})
    }

    const contact = await ContactModel.create({
        name,email,subject,message
    });

    if(!contact){
        return res.status(401).json({error:'Could create and upload the contact form'})
    }

    return res.status(201).json({message:'Response Sent Successfully'});
   } catch (error) {
    console.log(error);
    res.status(401).json({error:'Server error'});
   }
})


//add prescription route
app.post('/addPrescription', authenticateJWT, (req, res) => {
    
    // Use multer middleware for file upload
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        }

        try {
            // Extract the data from the form submission
            const { email, Username, Contact, PatientName, PatientAge, PatientGender, Allergy, DeliveryAddress, DeliveryCity, Duration } = req.body;

            // Create a new Prescription document
            const newPrescription = new PrescriptionModel({
                prescription: req.files.map(file => file.path), // Store paths of uploaded images
                email,
                Username,
                Contact,
                PatientName,
                PatientAge,
                PatientGender,
                Allergy,
                DeliveryAddress,
                DeliveryCity,
                Duration
            });

            // Save the prescription to the database
            await newPrescription.save();
            res.status(201).json({ message: 'Prescription submitted successfully', prescription: newPrescription,email:email });
        } catch (error) {
            res.status(500).json({ error: 'Error saving prescription: ' + error.message });
        }
    });
});

//get the email in the add prescription page
app.get('/email',authenticateJWT,async (req,res)=>{
    try {
        const email = req.user.email
    const user = await CustomerModel.findOne({email});
    if(!user){
        return res.status(500).json({error:'No User Found.'})
    }
    res.status(200).json({message:'USer found successfully',email:email});
    } catch (error) {
        return res.status(500).json({error:'Server Error'})
    }
})



// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});