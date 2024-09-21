import React, { useEffect, useState } from 'react';
import './adminStyle.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    orderDate: '',
    status: 'Pending',
    prescriptions: [
      {
        prescriptionId: '',
        medicationName: '',
        dosage: '',
        quantity: 1,
        pricePerUnit: 0,
        totalAmount: 0
      }
    ],
    address: ''
  });

  useEffect(() => {
    // Fetch orders from backend
    fetch('http://localhost:5000/orders')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        // Initialize statusMap with current statuses
        const initialStatusMap = {};
        data.forEach(order => {
          initialStatusMap[order.orderId] = order.status;
        });
        setStatusMap(initialStatusMap);
      })
      .catch(error => setError(error));
  }, []);

  function deleteOrder(orderId) {
    fetch(`http://localhost:5000/orders/${orderId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data.message); 
      window.location.href = window.location.href;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5000/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setStatusMap(prevMap => ({ ...prevMap, [orderId]: newStatus }));
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
  };

  const handleCreateOrder = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setOrders([...orders, data]);
      setShowModal(false); // Hide the modal after submission
      setNewOrder({
        customerName: '',
        customerEmail: '',
        orderDate: '',
        status: 'Pending',
        prescriptions: [
          {
            prescriptionId: '',
            medicationName: '',
            dosage: '',
            quantity: 1,
            pricePerUnit: 0,
            totalAmount: 0
          }
        ],
        address: ''
      }); // Reset form
    })
    .catch(error => {
      console.error('Error creating order:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePrescriptionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrescriptions = newOrder.prescriptions.map((prescription, i) => 
      index === i ? { ...prescription, [name]: value } : prescription
    );
    setNewOrder({ ...newOrder, prescriptions: updatedPrescriptions });
  };

  const addPrescription = () => {
    setNewOrder(prevState => ({
      ...prevState,
      prescriptions: [
        ...prevState.prescriptions,
        { prescriptionId: '', medicationName: '', dosage: '', quantity: 1, pricePerUnit: 0, totalAmount: 0 }
      ]
    }));
  };

  const removePrescription = (index) => {
    const updatedPrescriptions = newOrder.prescriptions.filter((_, i) => i !== index);
    setNewOrder({ ...newOrder, prescriptions: updatedPrescriptions });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <button className="create-order-btn" onClick={handleCreateOrder}>Create Order</button>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.orderId} className="order-item">
              <h2>Order ID: {order.orderId}</h2>
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Customer Email:</strong> {order.customerEmail}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Status: </strong><input 
         type="text"
         value={statusMap[order.orderId] || ''}
         onChange={e => handleStatusChange(order.orderId, e.target.value)}
        /></p>
              <h3>Prescriptions:</h3>
              <ul className="prescription-list">
                {order.prescriptions.map((prescription, index) => (
                  <li key={prescription.prescriptionId} className="prescription-item">
                    <p><strong>Medication Name:</strong> {prescription.medicationName}</p>
                    <p><strong>Dosage:</strong> {[prescription.dosage]}</p> 
                    <p><strong>Quantity:</strong> {[prescription.quantity]}</p> 
                  </li>
                ))}
              </ul>
              <p><strong>Address: </strong>{order.address}</p>
              <button className="delete-order-btn" onClick={() => deleteOrder(order.orderId)}>Delete Order</button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Customer Email</label>
                <input 
                  type="email"
                  name="customerEmail"
                  value={newOrder.customerEmail}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Order Date</label>
                <input 
                  type="date"
                  name="orderDate"
                  value={newOrder.orderDate}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text"
                  name="address"
                  value={newOrder.address}
                  onChange={handleChange}
                  required 
                />
              </div>
              {/* Prescription Fields */}
              <div className="form-group">
                <label>Prescriptions</label>
                {newOrder.prescriptions.map((prescription, index) => (
                  <div key={index} className="prescription-item">
                    <input 
                      type="text"
                      name="prescriptionId"
                      value={prescription.prescriptionId}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Prescription ID"
                      required 
                    />
                    <input 
                      type="text"
                      name="medicationName"
                      value={prescription.medicationName}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Medication Name"
                      required 
                    />
                    <input 
                      type="text"
                      name="dosage"
                      value={prescription.dosage}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Dosage"
                      required 
                    />
                    <input 
                      type="number"
                      name="quantity"
                      value={prescription.quantity}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Quantity"
                      required 
                    />
                    <input 
                      type="number"
                      name="pricePerUnit"
                      value={prescription.pricePerUnit}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Price Per Unit"
                      required 
                    />
                    <input 
                      type="number"
                      name="totalAmount"
                      value={prescription.totalAmount}
                      onChange={(e) => handlePrescriptionChange(index, e)}
                      placeholder="Total Amount"
                      required 
                    />
                    <button type="button" className="remove-btn" onClick={() => removePrescription(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" className="add-prescription-btn" onClick={addPrescription}>Add Prescription</button>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;