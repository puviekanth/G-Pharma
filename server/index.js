const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CustomerModel = require('./model/Customer');

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
        console.error("Internal Error", e);
        res.status(500).json({ error: 'Error in creating user' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
