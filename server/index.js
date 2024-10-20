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
const {ObjectId} = require('mongodb');
const DeliveryPersonModel = require('./model/DeliveryModel');
const CartModel = require('./model/CartModel');
const CheckoutModel = require('./model/CheckoutModel');
const BillingModel = require('./model/BillingModel');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

        // Store the user details in the appropriate collection
        if (email.endsWith('.admin@genuinepharmacy.com')) {
            // Admin user logic
            const adminUser = await AdminModel.create({
                name,
                password: encryptedPassword,
                email,
                contact,
                address,
                dob,
                nic
            });
            res.status(200).json({ message: 'Admin User Created Successfully', user: adminUser });

        } else if (email.includes('deliverygpharma24@gmail.com')) {
            // Delivery user logic
            const deliveryUser = await DeliveryPersonModel.create({
                name,
                password: encryptedPassword,
                email,
                contact,
                address,
                dob,
                nic
            });

            // Respond with success
            res.status(200).json({ message: 'Delivery User Created Successfully', user: deliveryUser });

        } else {
            // Regular customer logic
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
            res.status(200).json({ message: 'Customer Created Successfully', user: newUser });
        }

    } catch (e) {
        if (e.code === 11000) { // MongoDB error for duplicate key
            // Duplicate email or NIC error
            res.status(400).json({ error: "Email or NIC already exists." });
        } else {
            console.error("An unexpected error occurred.", e);
            res.status(500).json({ error: 'An unexpected error occurred.' });
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
       else if(email.includes('deliverygpharma24@gmail.com')){
        const deliveryperson = await DeliveryPersonModel.findOne({ email: email });
        if (!deliveryperson) {
            return res.status(404).json({ error: 'No User Found, please register.' });
        }

        // Correctly await bcrypt.compare for password comparison
        const isMatch = await bcrypt.compare(password, deliveryperson.password);
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ email: deliveryperson.email }, secretKey, { expiresIn: '1h' });

            // Return token along with success message
            return res.status(200).json({ message: 'Logged in successfully', token: token ,user:deliveryperson });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
       }else{
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
 




 









app.get('/searchprescription', async (req, res) => {
    console.log('Received search request:', req.query); // Log entire query object
    const search = req.query.search;
    
    console.log('Received search print is ', search);
    
    // Validate ObjectId
    if (!ObjectId.isValid(search)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    try {
        const id = new ObjectId(search);
        console.log('ID is ', id);
        
        const prescription = await PrescriptionModel.findOne({ _id: new ObjectId(search) });

        if (!prescription) {
            return res.status(404).json({ error: 'No prescription found' });
        }

        console.log(prescription);  // Log prescription to see it in the console
        return res.status(200).json(prescription);
    } catch (error) {
        console.error('Error occurred:', error); // Log the error to the console
        return res.status(500).json({ error: 'Something went wrong', error });
    }
});


app.get('/getreadyfordelivery',async(req,res)=>{
    try {
        const prescription = await PrescriptionModel.find({deliveryStatus:'Ready For Delivery'});
        console.log(prescription);

    if(!prescription){
        return res.status(500).json({error:'Did not find any prescriptions ready for delivery'});
    }
     const prescriptionData = prescription.map(prescription => ({
            orderID: prescription._id,
            username: prescription.Username,
            userContact: prescription.Contact,
            useremail: prescription.email,
            PatientName: prescription.PatientName,
            DeliveryAddress: prescription.DeliveryAddress,
            DeliveryCity: prescription.DeliveryCity,
        }));

        return res.status(200).json(prescriptionData);
    } catch (error) {
        return res.status(500).json({error:'Backend error',error});
    }
});





const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
  });
  
  // Create a model
  const ProductModel = mongoose.model('Product', productSchema, 'productDbase');
  
  // Define routes
  app.get('/getproducts', async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  });
  
  const Productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/products');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const uploadProducts = multer({ storage: Productstorage });
  
  // Add new product
  app.post('/addproducts', uploadProducts.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;
    const imagePath = req.file ? req.file.path : '';
  
    try {
      const newProduct = new ProductModel({ name, description, price, category, image: imagePath });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  });
  
  // Update existing product
  app.put('/updateproducts/:id', uploadProducts.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const imagePath = req.file ? req.file.path : '';
  
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { name, description, price, category, image: imagePath },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  });
  
  // Delete a product
  app.delete('/deleteproducts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await ProductModel.findByIdAndDelete(id);
      res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  });
  
  // Serve uploaded images
  app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));
  


  
  // Get all delivery persons
  app.get('/api/delivery-persons', (req, res) => {
    DeliveryPersonModel.find()
      .then(persons => res.json(persons))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // Add a new delivery person
  app.post('/api/delivery-persons', (req, res) => {
    const newPerson = new DeliveryPersonModel(req.body);
  
    newPerson.save()
      .then(() => res.json('Delivery person added successfully'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // Update a delivery person by ID
  app.put('/api/delivery-persons/:id', (req, res) => {
    DeliveryPersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(() => res.json('Delivery person updated successfully'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // Delete a delivery person by ID
  app.delete('/api/delivery-persons/:id', (req, res) => {
    DeliveryPersonModel.findByIdAndDelete(req.params.id)
      .then(() => res.json('Delivery person deleted successfully'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //add to cart
  app.post('/addtocart',authenticateJWT,async (req,res)=>{
    const {ProductName,email,ProductPrice,ProductQuantity,Subtotal,Image} = req.body;
   try {
    const newItem = new CartModel({
        ProductName,
        email:req.user.email,
        ProductPrice,
        ProductQuantity,
        Subtotal,
        Image
    });

    await newItem.save();
    return res.status(200).json({message:'Product Added to Cart Successfully'})
   } catch (error) {
    console.log("Something went wrong in the server");
    return res.status(500).json({error:'Something went wrong in the server'})
   }

  })

  //get Cart items
  app.get('/getcartitems',authenticateJWT,async (req,res)=>{
   try {
    const email = req.user.email;
    const items = await CartModel.find({email:email});
    if(!items){
        console.log('No items found in the cart');
        return res.status(500).json({error:'No items in the cart'})
    }
    return res.status(200).json(items);
   } catch (error) {
    return res.status(500).json({error:'Something went wrong in the server side',error})
   }
  });



  // Add checkout
// Add checkout
app.post('/addcheckout', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to see what is being sent
    const { email, cartItems } = req.body;

    if (!email || !cartItems) {
        return res.status(400).json({ message: "Email and cart items are required." });
    }

    try {
        // Check if a checkout already exists for this user
        let existingCheckout = await CheckoutModel.findOne({ email });

        if (existingCheckout) {
            // Update the existing checkout record with new cart items
            existingCheckout.cartItems = cartItems; // Overwrite the existing cart items array with the new one
            await existingCheckout.save();
            res.status(200).json({ message: "Checkout updated successfully.", data: existingCheckout });
        } else {
            // Create a new checkout record
            const newCheckout = new CheckoutModel({
                email,
                cartItems // Save the cartItems array as it is
            });

            await newCheckout.save();
            res.status(200).json({ message: "Checkout processed successfully.", data: newCheckout });
        }
    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});



//get billing info
app.get('/getbillinginfo', authenticateJWT, async (req, res) => {
    try {
        const email = req.user.email;
        if (!email) {
            return res.status(401).json({ error: 'Please log in, no email found.' });
        }

        const userBillingInfo = await CheckoutModel.findOne({ email: email });
        if (!userBillingInfo || !Array.isArray(userBillingInfo.cartItems)) {
            return res.status(404).json({ error: 'No items found in the cart.' });
        }

        return res.status(200).json(userBillingInfo.cartItems);
    } catch (error) {
        return res.status(500).json({ error: 'Server error, please try again later.' });
    }
});

//add billing info to the database
app.post('/addbillinginfo', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email, name, contact, city, address, cartItems } = req.body;

        // Check for required fields
        if (!email || !name || !contact || !city || !address || !cartItems) {
            console.log('Missing fields');
            return res.status(400).json({ error: 'Please provide all required information' });
        }

        // Create a new billing model instance
        const bill = new BillingModel({
            email,
            name,
            contact,
            city,
            address,
            date:Date.now(),
            cartItems,
            status:'New'
        });

        // Save the billing information to the database
        await bill.save();
        return res.status(200).json({ message: 'Successfully added billing info' });

    } catch (error) {
        console.error('Error adding billing info:', error);
        return res.status(500).json({ error: 'Could not add the data from the server side' });
    }
});


//get product orders

app.get('/ProductsOrdersGet', async (req, res) => {
    try {
        const prescriptions = await BillingModel.find({status:'New'}); // Get all prescriptions
        console.log(prescriptions);
        if (!prescriptions.length) {
            return res.status(400).json({ error: 'No Prescriptions found' });
        }

        const prescriptionData = prescriptions.map(prescription => ({
            orderID: prescription._id,
            username: prescription.name,
            userContact: prescription.contact,
            useremail: prescription.email,
            DeliveryAddress: prescription.address,
            DeliveryCity: prescription.city,
            Quantity: prescription.quantity,
            Date : prescription.date,
            cartItems:prescription.cartItems
        }));

        res.status(200).json(prescriptionData);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});


    




  








// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});