
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
import Instrument from './components/instruments'
import Vetneray from './components/vetneray'
import Skin from './components/skin'
import Sexual from './components/sexual'
import Cart from './components/cart'
import Payment from './components/Payment'
import Individual from './components/individual'

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
        <Route path="/Shop/baby" element={<Beauty />} />
        <Route path="/Shop/multivitamins" element={<Baby />} />
        <Route path="/Shop/machines" element={<Machine />} />
        <Route path="/Shop/instruments" element={<Instrument />} />
        <Route path="/Shop/vetenary" element={<Vetneray />} />
        <Route path="/Shop/skincare" element={<Skin />} />
        <Route path="/Shop/sexual-wellness" element={<Sexual />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Individual" element={<Individual />} />
      </Routes>
    </Router>
  );
}

export default App;
