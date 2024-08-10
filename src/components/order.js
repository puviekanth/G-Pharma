import React, { useState } from 'react';


function OrderManagement(){
const OrderManagement = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', status: 'Pending' },
        { id: 2, customer: 'Jane Smith', status: 'Processing' },
    ]);

    const updateOrderStatus = (id, newStatus) => {
        setOrders(orders.map(order => (
            order.id === id ? { ...order, status: newStatus } : order
        )));
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', textAlign: 'left' }}>
                    <h3>Order ID: {order.id}</h3>
                    <p>Customer: {order.customer}</p>
                    <p>Order Detais</p>
                      <p>  Add order Details
                    </p>
                    <label>
                        Status:
                        <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            style={{ marginLeft: '10px' }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </label>
                </div>
            ))}
        </div>
    );
};
}

export default OrderManagement;
