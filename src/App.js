import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductForm from './components/AddProductForm';
import './App.css'; // Import global CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <div className='with-categories'>
            <div className='categories'>
              <ul>
                <li>Order</li>
                <li>Products</li>
                <li>Supplier</li>
                <li>Employee</li>
              </ul>
              <div className="icon">
                <div className='profile-icon'>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
                <div className='signout-icon'>
                  <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
           
            <main>
              <Routes>
                <Route path="/add-product" element={<AddProductForm />} />
                <Route path="/" element={
                  <div>
                    <h2>Welcome to the Admin Dashboard</h2>
                    <p><a href="/add-product">Add a New Product</a></p>
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
