import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import About from './components/about';
import Contact from './components/Contact'

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
      </Routes>
    </Router>
  );
}

export default App;
