
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import About from './components/about';
import Contact from './components/Contact'
import Profile from './components/Profile'
import Shop from './components/Shop'
import Ayurvedic from './components/ayurvedic'
import Beauty from './components/beauty'
import Baby from './components/baby'
import Machine from './components/machines'
import Multi from './components/multivitamins'
import Instrument from './components/instruments'
import Vetneray from './components/vetneray'
import Skin from './components/skin'
import Sexual from './components/sexual'
import Cart from './components/cart'
import Payment from './components/Payment'
import Individual from './components/individual'
import Orders from './components/ViewOrders'
import Prescription from './components/AddPrescription'
import ProcessingPrescription from './components/adminPrescriptionProcessing'
import CompletedPrescriptions from './components/adminCompletedPrescription'
import ProductsPage from './components/AdminProductPage'
import SearchOrderPage from './components/searchprescription'
import DeliveryUI from './components/deliveryUI'
import ReadyforDelivery from './components/ReadyDeliveryOrders';
import AdminPRofile from './components/adminProfile'
import LandingDelivery from './components/LandingDeliveryPage'
import ViewOrderProducts from './components/ViewOrderProdcuts'
import Employee from './components/adminEmployee'
import AddEmp from './components/addEmployee'
import UpdateEmp from './components/UpdateEmployee'
import Suppliers from './components/SupplierManage'
import Medi from './components/Medicine'
import Supports from './components/support'
import ProductDetailPage from './components/ProductDetails'
import CompletedProducts from './components/completed-product-orders'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from the root path to /Home */}
        <Route path="/" element={<Navigate to="/Home" />} />
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shop/ayurvedic" element={<Ayurvedic />} />
        <Route path="/Shop/beauty" element={<Beauty />} />
        <Route path="/Shop/baby" element={<Baby />} />
        <Route path='/Shop/supports' element={<Supports />} />
        <Route path="/Shop/multivitamins" element={< Multi/>} />
        <Route path="/Shop/machines" element={<Machine />} />
        <Route path="/Shop/instruments" element={<Instrument />} />
        <Route path="/Shop/vetenary" element={<Vetneray />} />
        <Route path="/Shop/skincare" element={<Skin />} />
        <Route path="/Shop/sexual-wellness" element={<Sexual />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Individual" element={<Individual />} />
        <Route path="/Add-prescription" element={<Prescription />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/prescription-processing' element={<ProcessingPrescription />} />
        <Route path='//completed-orders' element={<CompletedPrescriptions/>} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/SearchPrescription' element={<SearchOrderPage />}  />
        <Route path='/deliveryUI/home' element={<DeliveryUI />} />
        <Route path='/readyfordelivery' element={<ReadyforDelivery />} />
        <Route path='/adminprofile' element={<AdminPRofile />} />
        <Route path='/landing-delivery' element={<LandingDelivery />} />
        <Route path='/orders-products' element={<ViewOrderProducts />} />
        <Route path='/employees' element={<Employee />} />
        <Route path='/create' element={<AddEmp />} />
        <Route path='/updateEmployee/:id' element={<UpdateEmp />} />
        <Route path='/suppliers' element={<Suppliers />} />
        <Route path='/Shop/medi' element={<Medi />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/completed-orders-products' element={<CompletedProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
