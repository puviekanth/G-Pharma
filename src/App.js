// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import Order from './components/order'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Order" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
