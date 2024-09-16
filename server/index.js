const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CustomerModel = require('./model/Customer');
const { Navigate } = require('react-router');

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
            return res.status(200).json({ message: 'Logged in successfully' });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});



// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});