require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CustomerModel = require('./model/Customer');
const { Navigate } = require('react-router');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_PRIVATE_KEY;

const app = express();
app.use(express.json());
app.use(cors());

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
            return res.status(200).json({ message: 'Logged in successfully', token: token });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
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






// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});