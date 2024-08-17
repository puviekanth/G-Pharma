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
      </Routes>
    </Router>
  );
}

export default App;
