// src/App.js
import React from 'react';
import './App.css';
import OrderManagement from './order';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Pharmacy Order Management</h1>
            </header>
            <main>
                <OrderManagement />
            </main>
        </div>
    );
}

export default App;
