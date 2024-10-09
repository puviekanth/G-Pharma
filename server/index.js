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
const secretKey = 'anura-gpharma-24/6';
const ContactModel = require('./model/ContactModel');
const AdminModel = require('./model/AdminModel');
const PrescriptionModel = require('./model/PrescriptionModel'); // Your Prescription model
const multer = require('multer');
const path = require('path');
const ProductModel = require('./model/ProductModel')


const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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
mongoose.connect("mongodb://localhost:27017/genuine-new", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Connected to MongoDB database: genuine-new"))
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
        console.log(err);
        return res.status(500).json({ error: 'Server error'});
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
                Duration,
                status:'New',
                deliveryStatus:'Not Ready for Delivery',
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

app.get('/PrescriptionOrdersGet', async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.find({status:'New'}); // Get all prescriptions
        console.log(prescriptions);
        if (!prescriptions.length) {
            return res.status(400).json({ error: 'No Prescriptions found' });
        }

        const prescriptionData = prescriptions.map(prescription => ({
            orderID: prescription._id,
            prescriptions:prescription.prescription,
            username: prescription.Username,
            userContact: prescription.Contact,
            useremail: prescription.email,
            PatientName: prescription.PatientName,
            PatientAge: prescription.PatientAge,
            PatientGender: prescription.PatientGender,
            PatientAllergy: prescription.Allergy,
            DeliveryAddress: prescription.DeliveryAddress,
            DeliveryCity: prescription.DeliveryCity,
            Duration: prescription.Duration,
        }));

        res.status(200).json(prescriptionData);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});


//update status
app.put('/updateOrderStatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status,deliveryStatus } = req.body;

    console.log('Received update request for order ID:', orderId);
    console.log('New status:', status);

    try {
        const order = await PrescriptionModel.findOneAndUpdate(
            { _id: orderId },
            { status: status,deliveryStatus: deliveryStatus },
            { new: true, runValidators: true }
        );

        if (!order) {
            console.error('Order not found:', orderId);
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Updated Order:', order);
        res.status(200).json({ message: 'Updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//get processing orders only
app.get('/PrescriptionOrdersGetProcessing', async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.find({status:'Processing'}); // Get all prescriptions
        console.log(prescriptions);
        if (!prescriptions.length) {
            return res.status(400).json({ error: 'No Prescriptions found' });
        }

        const prescriptionData = prescriptions.map(prescription => ({
            orderID: prescription._id,
            prescriptions:prescription.prescription,
            username: prescription.Username,
            userContact: prescription.Contact,
            useremail: prescription.email,
            PatientName: prescription.PatientName,
            PatientAge: prescription.PatientAge,
            PatientGender: prescription.PatientGender,
            PatientAllergy: prescription.Allergy,
            DeliveryAddress: prescription.DeliveryAddress,
            DeliveryCity: prescription.DeliveryCity,
            Duration: prescription.Duration,
        }));

        res.status(200).json(prescriptionData);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

//get completed orders 
app.get('/PrescriptionOrdersGetCompleted', async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.find({status:'Completed'}); // Get all prescriptions
        console.log(prescriptions);
        if (!prescriptions.length) {
            return res.status(400).json({ error: 'No Prescriptions found' });
        }

        const prescriptionData = prescriptions.map(prescription => ({
            orderID: prescription._id,
            prescriptions:prescription.prescription,
            username: prescription.Username,
            userContact: prescription.Contact,
            useremail: prescription.email,
            PatientName: prescription.PatientName,
            PatientAge: prescription.PatientAge,
            PatientGender: prescription.PatientGender,
            PatientAllergy: prescription.Allergy,
            DeliveryAddress: prescription.DeliveryAddress,
            DeliveryCity: prescription.DeliveryCity,
            Duration: prescription.Duration,
            deliveryStatus:prescription.deliveryStatus,
        }));

        res.status(200).json(prescriptionData);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/deleteOrder/:orderID',async (req,res)=>{
    try {
        const {orderID} = req.params;
    

    const deletedPrescription = await PrescriptionModel.findOneAndDelete({_id:orderID})

    if(!deletedPrescription){
        return res.status(500).json({error:'No Prescription found'})
    }
    return res.status(200).json({message:'Prescription Deleted Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error in Server'})
    }
})
 

//get porducts at admin page
app.get('/getproducts', async (req, res) => {
    try {
      const products = await ProductModel.find();
      console.log(products);
      const productsData = products.map(product =>({
        image:product.image,
        name:product.name,
        description: product.description,
        price:product.price,
        category:product.category
      }))
      res.json(productsData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products',error });
    }
  });


 
const Productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products'); // Save files to 'uploads/products' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append date and file extension to the file name
    }
});

const Productupload = multer({
    storage: Productstorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).single('image'); // Single file upload for the 'image' field

app.post('/addproducts', Productupload, async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        

        const newProduct = new ProductModel({
            image:req.file.path,
            name,
            description,
            price,
            category
             // Store image path in the database
        });

        await newProduct.save();
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product' });
    }
});




//   //delete products
//   app.delete('/deleteproducts/:productID', async (req, res) => {
//     try {
//       const productID = parseInt(req.params.productID, 10);
//       const result = await Product.deleteOne({ productID: productID });
  
//       if (result.deletedCount === 0) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
      
//       res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });







// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});